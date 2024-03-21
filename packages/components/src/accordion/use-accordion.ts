import { useControllableState } from "@chakra-ui/hooks/use-controllable-state"
import { mergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { nextById, prevById, queryAll } from "@zag-js/dom-utils"
import { useCallback, useId, useRef, useState } from "react"
import { callAllHandlers, warn } from "@chakra-ui/utils"
import { useAccordionContext } from "./accordion-context"

/* -------------------------------------------------------------------------------------------------
 * useAccordion - The root react hook that manages all accordion items
 * -----------------------------------------------------------------------------------------------*/

export interface UseAccordionProps {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   *
   * @default false
   */
  multiple?: boolean
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   *
   * @default false
   */
  collapsible?: boolean
  /**
   * The id(s) of the expanded accordion item(s)
   */
  value?: string[]
  /**
   * The initial id(s) of the expanded accordion item(s)
   */
  defaultValue?: string[]
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?(value: string[]): void
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
    multiple,
    collapsible,
    id: idProp,
    ...htmlProps
  } = props

  // validate the props and `warn` if used incorrectly
  multipleWarning(props)
  multipleAndcollapsibleWarning(props)

  const reactId = useId()
  const id = `accordion-${idProp ?? reactId}`

  /**
   * This state is used to track the focused accordion
   * button when click on the button, tab on the button, or
   * use the down/up arrow to navigate.
   */
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)

  /**
   * Hook that manages the controlled and un-controlled state
   * for the accordion.
   */
  const [value, setValue] = useControllableState<string[]>({
    value: valueProp,
    defaultValue() {
      return defaultValue ?? []
    },
    onChange,
  })

  /**
   * Gets the `open` and `onChange` props for a child accordion item based on
   * the child's index.
   *
   * @param itemValue {string} The value of the child accordion item
   */
  const getAccordionItemProps = (itemValue: string | null) => {
    let open = false

    if (itemValue) {
      open = value.includes(itemValue)
    }

    const onChange = (open: boolean) => {
      if (itemValue === null) return

      if (multiple) {
        //
        const nextState = open
          ? value.concat(itemValue)
          : value.filter((i) => i !== itemValue)

        setValue(nextState)
      } else if (open) {
        setValue([itemValue])
      } else if (collapsible) {
        setValue([])
      }
    }

    return { open, onChange }
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
 * Hook for a single accordion item
 * -----------------------------------------------------------------------------------------------*/

export interface UseAccordionItemProps {
  /**
   * If `true`, the accordion item will be disabled.
   *
   * @default false
   */
  disabled?: boolean
  /**
   * If `true`, the accordion item will be focusable.
   *
   * @default false
   */
  focusable?: boolean
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

function makeId(type: string, id: string, value: string) {
  return `accordion-${type}-${id}-${value.trim().replace(/\s+/g, "-")}`
}

/**
 * useAccordionItem
 *
 * React hook that provides the open/close functionality
 * for an accordion item and its children
 */
export function useAccordionItem(props: UseAccordionItemProps) {
  const { disabled, focusable, value } = props
  const { getAccordionItemProps, setFocusedId, focusedId, rootRef, id } =
    useAccordionContext()

  /**
   * Generate unique ids for all accordion item components (button and panel)
   */
  const reactId = useId()
  const uid = value || reactId

  const buttonRef = useRef<HTMLElement>(null)

  const buttonId = makeId("button", id, uid)
  const panelId = makeId("panel", id, uid)

  focusableNotDisabledWarning(props)

  const { open, onChange } = getAccordionItemProps(uid)

  warnIfOpenAndDisabled({ open, disabled })

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
    onChange?.(!open)
    setFocusedId(buttonId)
  }, [open, onChange, setFocusedId, buttonId])

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

  const getTriggerProps = useCallback(
    function getTriggerProps(
      props: Omit<React.HTMLAttributes<HTMLElement>, "color"> = {},
      ref: React.Ref<HTMLButtonElement> | null = null,
    ): React.ComponentProps<"button"> {
      return {
        ...props,
        type: "button",
        ref: mergeRefs(buttonRef, ref),
        id: buttonId,
        disabled: !!disabled,
        "aria-expanded": !!open,
        "aria-controls": panelId,
        onClick: callAllHandlers(props.onClick, onClick),
        onFocus: callAllHandlers(props.onFocus, onFocus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      }
    },
    [buttonId, disabled, open, onClick, onFocus, onKeyDown, panelId],
  )

  const getContentProps = useCallback(
    function getContentProps<T>(
      props: Omit<React.HTMLAttributes<T>, "color"> = {},
      ref: React.Ref<T> | null = null,
    ): React.HTMLAttributes<T> & React.RefAttributes<T> {
      return {
        ...props,
        ref,
        role: "region",
        id: panelId,
        "aria-labelledby": buttonId,
        hidden: !open,
      }
    },
    [buttonId, open, panelId],
  )

  return {
    open,
    disabled,
    focusable,
    focused: focusedId === buttonId,
    onOpen,
    onClose,
    getTriggerProps,
    getContentProps,
  }
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>

/* -------------------------------------------------------------------------------------------------
 * Validate accordion and accordion item props, and emit warnings.
 * -----------------------------------------------------------------------------------------------*/

function multipleWarning(props: UseAccordionProps) {
  const value = props.value || props.defaultValue
  const condition = value != null && !Array.isArray(value) && props.multiple

  warn({
    condition: !!condition,
    message: `If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof value},`,
  })
}

function multipleAndcollapsibleWarning(props: UseAccordionProps) {
  warn({
    condition: !!(props.multiple && props.collapsible),
    message: `If 'multiple' is passed, 'collapsible' will be ignored. Either remove 'collapsible' or 'multiple' depending on whether you want multiple accordions visible or not`,
  })
}

function focusableNotDisabledWarning(props: UseAccordionItemProps) {
  warn({
    condition: !!(props.focusable && !props.disabled),
    message: `Using only 'focusable', this prop is reserved for situations where you pass 'disabled' but you still want the element to receive focus (A11y). Either remove it or pass 'disabled' as well.
    `,
  })
}

function warnIfOpenAndDisabled(props: { open: boolean; disabled?: boolean }) {
  warn({
    condition: props.open && !!props.disabled,
    message: "Cannot open a disabled accordion item",
  })
}
