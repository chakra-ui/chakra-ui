import { useControllableState } from "@chakra-ui/hooks/use-controllable-state"
import { mergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { callAllHandlers, warn } from "@chakra-ui/utils"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import {
  useAccordionContext,
  useAccordionDescendant,
  useAccordionDescendants,
} from "./accordion-context"

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
   * The index(es) of the expanded accordion item
   */
  index?: number | number[]
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: number | number[]
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?(expandedIndex: number | number[]): void
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
    defaultIndex,
    index: indexProp,
    multiple,
    collapsible,
  } = props

  // validate the props and `warn` if used incorrectly
  multipleWarning(props)
  multipleAndcollapsibleWarning(props)

  /**
   * Think of this as the register to each accordion item.
   * We used to manage focus between accordion item buttons.
   *
   * Every accordion item, registers their button refs in this context
   */
  const descendants = useAccordionDescendants()

  /**
   * This state is used to track the index focused accordion
   * button when click on the button, tab on the button, or
   * use the down/up arrow to navigate.
   */
  const [focusedIndex, setFocusedIndex] = useState(-1)

  /**
   * Reset focused index when accordion unmounts
   * or descendants change
   */
  useEffect(() => {
    return () => {
      setFocusedIndex(-1)
    }
  }, [])

  /**
   * Hook that manages the controlled and un-controlled state
   * for the accordion.
   */
  const [index, setIndex] = useControllableState({
    value: indexProp,
    defaultValue() {
      if (multiple) return defaultIndex ?? []
      return defaultIndex ?? -1
    },
    onChange,
  })

  /**
   * Gets the `isOpen` and `onChange` props for a child accordion item based on
   * the child's index.
   *
   * @param idx {number} The index of the child accordion item
   */
  const getAccordionItemProps = (idx: number | null) => {
    let isOpen = false

    if (idx !== null) {
      isOpen = Array.isArray(index) ? index.includes(idx) : index === idx
    }

    const onChange = (isOpen: boolean) => {
      if (idx === null) return

      if (multiple && Array.isArray(index)) {
        //
        const nextState = isOpen
          ? index.concat(idx)
          : index.filter((i) => i !== idx)

        setIndex(nextState)
        //
      } else if (isOpen) {
        setIndex(idx)
      } else if (collapsible) {
        setIndex(-1)
      }
    }

    return { isOpen, onChange }
  }

  return {
    index,
    setIndex,
    getAccordionItemProps,
    focusedIndex,
    setFocusedIndex,
    descendants,
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
  isDisabled?: boolean
  /**
   * If `true`, the accordion item will be focusable.
   *
   * @default false
   */
  isFocusable?: boolean
  /**
   * A unique id for the accordion item.
   */
  id?: string
}

/**
 * useAccordionItem
 *
 * React hook that provides the open/close functionality
 * for an accordion item and its children
 */
export function useAccordionItem(props: UseAccordionItemProps) {
  const { isDisabled, isFocusable, id } = props
  const { getAccordionItemProps, setFocusedIndex } = useAccordionContext()

  const buttonRef = useRef<HTMLElement>(null)

  /**
   * Generate unique ids for all accordion item components (button and panel)
   */
  const reactId = useId()
  const uid = id ?? reactId

  const buttonId = `accordion-button-${uid}`
  const panelId = `accordion-panel-${uid}`

  focusableNotDisabledWarning(props)

  /**
   * Think of this as a way to register this accordion item
   * with its parent `useAccordion`
   */
  const { register, index, descendants } = useAccordionDescendant({
    disabled: isDisabled && !isFocusable,
  })

  const { isOpen, onChange } = getAccordionItemProps(
    index === -1 ? null : index,
  )

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
    setFocusedIndex(index)
  }, [index, setFocusedIndex, isOpen, onChange])

  /**
   * Manage keyboard navigation between accordion items.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowDown: () => {
          const next = descendants.nextEnabled(index)
          next?.node.focus()
        },
        ArrowUp: () => {
          const prev = descendants.prevEnabled(index)
          prev?.node.focus()
        },
        Home: () => {
          const first = descendants.firstEnabled()
          first?.node.focus()
        },
        End: () => {
          const last = descendants.lastEnabled()
          last?.node.focus()
        },
      }

      const action = keyMap[event.key]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [descendants, index],
  )

  /**
   * Since each accordion item's button still remains tabbable, let's
   * update the focusedIndex when it receives focus
   */
  const onFocus = useCallback(() => {
    setFocusedIndex(index)
  }, [setFocusedIndex, index])

  const getTriggerProps = useCallback(
    function getTriggerProps(
      props: Omit<React.HTMLAttributes<HTMLElement>, "color"> = {},
      ref: React.Ref<HTMLButtonElement> | null = null,
    ): React.ComponentProps<"button"> {
      return {
        ...props,
        type: "button",
        ref: mergeRefs(register, buttonRef, ref),
        id: buttonId,
        disabled: !!isDisabled,
        "aria-expanded": !!isOpen,
        "aria-controls": panelId,
        onClick: callAllHandlers(props.onClick, onClick),
        onFocus: callAllHandlers(props.onFocus, onFocus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      }
    },
    [
      buttonId,
      isDisabled,
      isOpen,
      onClick,
      onFocus,
      onKeyDown,
      panelId,
      register,
    ],
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
    getTriggerProps,
    getContentProps,
  }
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>

/* -------------------------------------------------------------------------------------------------
 * Validate accordion and accordion item props, and emit warnings.
 * -----------------------------------------------------------------------------------------------*/

function multipleWarning(props: UseAccordionProps) {
  const index = props.index || props.defaultIndex
  const condition = index != null && !Array.isArray(index) && props.multiple

  warn({
    condition: !!condition,
    message: `If 'multiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof index},`,
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
