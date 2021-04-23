import { createDescendantContext } from "@chakra-ui/descendant"
import {
  useControllableState,
  useIds,
  useUnmountEffect,
} from "@chakra-ui/hooks"
import {
  createContext,
  EventKeyMap,
  mergeRefs,
  PropGetter,
} from "@chakra-ui/react-utils"
import {
  addItem,
  callAllHandlers,
  focus,
  isArray,
  isUndefined,
  normalizeEventKey,
  removeItem,
  warn,
} from "@chakra-ui/utils"
import React, { useCallback, useRef, useState } from "react"

/* -------------------------------------------------------------------------------------------------
 * Create context to track descendants and their indices
 * -----------------------------------------------------------------------------------------------*/

export const [
  AccordionDescendantsProvider,
  useAccordionDescendantsContext,
  useAccordionDescendants,
  useAccordionDescendant,
] = createDescendantContext<HTMLButtonElement>()

/* -------------------------------------------------------------------------------------------------
 * useAccordion - The root react hook that manages all accordion items
 * -----------------------------------------------------------------------------------------------*/

export type ExpandedIndex = number | number[]

export interface UseAccordionProps {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   */
  allowMultiple?: boolean
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   */
  allowToggle?: boolean
  /**
   * The index(es) of the expanded accordion item
   */
  index?: ExpandedIndex
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: ExpandedIndex
  /**
   * The callback invoked when accordion items are expanded or collapsed.
   */
  onChange?(expandedIndex: ExpandedIndex): void
}

/**
 * useAccordion hook provides all the state and focus management logic
 * for accordion items.
 */
export function useAccordion(props: UseAccordionProps) {
  const {
    onChange,
    defaultIndex,
    index: indexProp,
    allowMultiple,
    allowToggle,
    ...htmlProps
  } = props

  // validate the props and `warn` if used incorrectly
  allowMultipleWarning(props)
  allowMultipleAndAllowToggleWarning(props)

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
  useUnmountEffect(() => {
    setFocusedIndex(-1)
  })

  /**
   * Hook that manages the controlled and un-controlled state
   * for the accordion.
   */
  const [index, setIndex] = useControllableState({
    value: indexProp,
    defaultValue() {
      if (allowMultiple) return defaultIndex ?? []
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
      isOpen = isArray(index) ? index.includes(idx) : index === idx
    }

    const onChange = (isOpen: boolean) => {
      if (idx === null) return

      if (allowMultiple && isArray(index)) {
        const nextState = isOpen ? addItem(index, idx) : removeItem(index, idx)
        setIndex(nextState)
      } else if (isOpen) {
        setIndex(idx)
      } else if (allowToggle) {
        setIndex(-1)
      }
    }

    return { isOpen, onChange }
  }

  return {
    index,
    setIndex,
    htmlProps,
    getAccordionItemProps,
    focusedIndex,
    setFocusedIndex,
    descendants,
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

export const [
  AccordionProvider,
  useAccordionContext,
] = createContext<AccordionContext>({
  name: "AccordionContext",
  errorMessage:
    "useAccordionContext: `context` is undefined. Seems you forgot to wrap the accordion components in `<Accordion />`",
})

/* -------------------------------------------------------------------------------------------------
 * Hook for a single accordion item
 * -----------------------------------------------------------------------------------------------*/

export interface UseAccordionItemProps {
  /**
   * If `true`, the accordion item will be disabled.
   */
  isDisabled?: boolean
  /**
   * If `true`, the accordion item will be focusable.
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
  const { isDisabled, isFocusable, id, ...htmlProps } = props
  const { getAccordionItemProps, setFocusedIndex } = useAccordionContext()

  const buttonRef = useRef<HTMLElement>(null)

  /**
   * Generate unique ids for all accordion item components (button and panel)
   */
  const [buttonId, panelId] = useIds(id, `accordion-button`, `accordion-panel`)

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
      const eventKey = normalizeEventKey(event)

      const keyMap: EventKeyMap = {
        ArrowDown: () => {
          const next = descendants.nextEnabled(index)
          if (next) focus(next.node)
        },
        ArrowUp: () => {
          const prev = descendants.prevEnabled(index)
          if (prev) focus(prev.node)
        },
        Home: () => {
          const first = descendants.firstEnabled()
          if (first) focus(first.node)
        },
        End: () => {
          const last = descendants.lastEnabled()
          if (last) focus(last.node)
        },
      }

      const action = keyMap[eventKey]

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

  const getButtonProps: PropGetter<HTMLButtonElement> = useCallback(
    (props = {}, ref = null) => ({
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
    }),
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

  const getPanelProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      role: "region",
      id: panelId,
      "aria-labelledby": buttonId,
      hidden: !isOpen,
    }),
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
  const index = props.index || props.defaultIndex
  const condition =
    !isUndefined(index) && !isArray(index) && props.allowMultiple

  warn({
    condition: !!condition,
    message: `If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof index},`,
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
