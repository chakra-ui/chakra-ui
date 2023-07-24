import { createContext } from "../shared/context"
import { mergeRefs, useControllableState } from "@chakra-ui/hooks"
import { callAllHandlers, warn } from "@chakra-ui/utils"
import { nextById, prevById, queryAll } from "@zag-js/dom-utils"
import { useCallback, useId, useRef, useState } from "react"

type AccordionValue<T extends boolean | undefined> = T extends undefined
  ? string
  : T extends true
  ? string[]
  : string

/* -------------------------------------------------------------------------------------------------
 * useAccordion - The root react hook that manages all accordion items
 * -----------------------------------------------------------------------------------------------*/

export interface UseAccordionProps<Multiple extends boolean = boolean> {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   *
   * @default false
   */
  allowMultiple?: Multiple
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   *
   * @default false
   */
  allowToggle?: boolean
  /**
   * The index(es) of the expanded accordion item
   */
  value?: AccordionValue<Multiple>
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultValue?: AccordionValue<Multiple>
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?(value: AccordionValue<Multiple>): void
  /**
   * The id of the accordion
   */
  id?: string
}

/**
 * useAccordion hook provides all the state and focus management logic
 * for accordion items.
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export function useAccordion(props: UseAccordionProps) {
  const {
    onChange,
    defaultValue,
    value: valueProp,
    allowMultiple,
    allowToggle,
    id: idProp,
    ...htmlProps
  } = props

  // validate the props and `warn` if used incorrectly
  allowMultipleWarning(props)
  allowMultipleAndAllowToggleWarning(props)

  const reactId = useId()
  const id = `accordion-${idProp ?? reactId}`

  /**
   * This state is used to track the index focused accordion
   * button when click on the button, tab on the button, or
   * use the down/up arrow to navigate.
   */
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)

  /**
   * Hook that manages the controlled and un-controlled state
   * for the accordion.
   */
  const [value, setValue] = useControllableState<string | string[] | null>({
    value: valueProp,
    defaultValue() {
      if (allowMultiple) return defaultValue ?? []
      return defaultValue ?? null
    },
    onChange: onChange as any,
  })

  /**
   * Gets the `isOpen` and `onChange` props for a child accordion item based on
   * the child's index.
   *
   * @param itemValue {string} The value of the child accordion item
   */
  const getAccordionItemProps = (itemValue: string | null) => {
    let isOpen = false

    if (itemValue !== null) {
      isOpen = Array.isArray(value)
        ? value.includes(itemValue)
        : value === itemValue
    }

    const onChange = (isOpen: boolean) => {
      if (itemValue === null) return

      if (allowMultiple && Array.isArray(value)) {
        //
        const nextState = isOpen
          ? value.concat(itemValue)
          : value.filter((i) => i !== itemValue)

        setValue(nextState)
        //
      } else if (isOpen) {
        setValue(itemValue)
      } else if (allowToggle) {
        setValue(null)
      }
    }

    return { isOpen, onChange }
  }

  return {
    value,
    setValue,
    htmlProps,
    getAccordionItemProps,
    focusedId,
    setFocusedId,
    rootRef,
    id,
  }
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

/* -------------------------------------------------------------------------------------------------
 * Create context for the root accordion logic
 * -----------------------------------------------------------------------------------------------*/

interface AccordionContext
  extends Omit<UseAccordionReturn, "htmlProps" | "descendants"> {
  reduceMotion: boolean
}

export const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContext>({
    name: "AccordionContext",
    hookName: "useAccordionContext",
    providerName: "Accordion",
  })

/* -------------------------------------------------------------------------------------------------
 * Hook for a single accordion item
 * -----------------------------------------------------------------------------------------------*/

export interface UseAccordionItemProps {
  /**
   * If `true`, the accordion item will be disabled.
   *
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true`, the accordion item will be focusable.
   *
   * @default false
   */
  isFocusable?: boolean
  /**
   * The unique id of the accordion item.
   */
  id?: string
  /**
   * Unique value the accordion item.
   */
  value?: string
}

function getAllItems(root: HTMLElement | null) {
  return queryAll(root, "[aria-controls]:not([disabled])")
}

function makeId(type: string, id: string, value?: string) {
  return `accordion-${type}-${id}-${value}`
}

/**
 * useAccordionItem
 *
 * React hook that provides the open/close functionality
 * for an accordion item and its children
 */
export function useAccordionItem(props: UseAccordionItemProps) {
  const { isDisabled, isFocusable, value, ...htmlProps } = props
  const { getAccordionItemProps, setFocusedId, rootRef, id } =
    useAccordionContext()

  const reactId = useId()
  const uid = value || reactId

  const buttonRef = useRef<HTMLElement>(null)

  const buttonId = makeId("button", id, uid)
  const panelId = makeId("panel", id, uid)

  focusableNotDisabledWarning(props)

  const { isOpen, onChange } = getAccordionItemProps(uid)

  warnIfOpenAndDisabled({ isOpen, isDisabled })

  const onOpen = () => {
    onChange?.(true)
  }

  const onClose = () => {
    onChange?.(false)
  }

  /**
   * Toggle the visibility of the accordion item
   */
  const onClick = useCallback(() => {
    onChange?.(!isOpen)
    setFocusedId(buttonId)
  }, [isOpen, onChange, setFocusedId, buttonId])

  /**
   * Manage keyboard navigation between accordion items.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowDown: () => {
          const next = nextById(getAllItems(rootRef.current), buttonId, true)
          next?.focus()
        },
        ArrowUp: () => {
          const prev = prevById(getAllItems(rootRef.current), buttonId, true)
          prev?.focus()
        },
        Home: () => {
          const first = getAllItems(rootRef.current)[0]
          first?.focus()
        },
        End: () => {
          const all = getAllItems(rootRef.current)
          const last = all[all.length - 1]
          last?.focus()
        },
      }

      const action = keyMap[event.key]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [buttonId, rootRef],
  )

  /**
   * Since each accordion item's button still remains tabbable, let's
   * update the focusedValue when it receives focus
   */
  const onFocus = useCallback(() => {
    setFocusedId(buttonId)
  }, [setFocusedId, buttonId])

  const getButtonProps = useCallback(
    function getButtonProps(
      props: Omit<React.HTMLAttributes<HTMLElement>, "color"> = {},
      ref: React.Ref<HTMLButtonElement> | null = null,
    ): React.ComponentProps<"button"> {
      return {
        ...props,
        type: "button",
        ref: mergeRefs(buttonRef, ref),
        id: buttonId,
        disabled: !!isDisabled,
        "aria-expanded": !!isOpen,
        "aria-controls": panelId,
        onClick: callAllHandlers(props.onClick, onClick),
        onFocus: callAllHandlers(props.onFocus, onFocus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      }
    },
    [buttonId, isDisabled, isOpen, onClick, onFocus, onKeyDown, panelId],
  )

  const getPanelProps = useCallback(
    function getPanelProps<T>(
      props: Omit<React.HTMLAttributes<T>, "color"> = {},
      ref: React.Ref<T> | null = null,
    ): React.HTMLAttributes<T> & React.RefAttributes<T> {
      return {
        ...props,
        ref,
        role: "region",
        id: panelId,
        "aria-labelledby": buttonId,
        hidden: !isOpen,
      }
    },
    [buttonId, isOpen, panelId],
  )

  return {
    isOpen,
    isDisabled,
    isFocusable,
    onOpen,
    onClose,
    getButtonProps,
    getPanelProps,
    htmlProps,
  }
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>

/* -------------------------------------------------------------------------------------------------
 * Validate accordion and accordion item props, and emit warnings.
 * -----------------------------------------------------------------------------------------------*/

function allowMultipleWarning(props: UseAccordionProps) {
  const value = props.value || props.defaultValue
  const condition =
    value != null && !Array.isArray(value) && props.allowMultiple

  warn({
    condition: !!condition,
    message: `If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof value},`,
  })
}

function allowMultipleAndAllowToggleWarning(props: UseAccordionProps) {
  warn({
    condition: !!(props.allowMultiple && props.allowToggle),
    message: `If 'allowMultiple' is passed, 'allowToggle' will be ignored. Either remove 'allowToggle' or 'allowMultiple' depending on whether you want multiple accordions visible or not`,
  })
}

function focusableNotDisabledWarning(props: UseAccordionItemProps) {
  warn({
    condition: !!(props.isFocusable && !props.isDisabled),
    message: `Using only 'isFocusable', this prop is reserved for situations where you pass 'isDisabled' but you still want the element to receive focus (A11y). Either remove it or pass 'isDisabled' as well.
    `,
  })
}

function warnIfOpenAndDisabled(props: {
  isOpen: boolean
  isDisabled?: boolean
}) {
  warn({
    condition: props.isOpen && !!props.isDisabled,
    message: "Cannot open a disabled accordion item",
  })
}
