import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import { useControllableState, useFocusEffect, useIds } from "@chakra-ui/hooks"
import {
  addItem,
  callAllHandlers,
  createContext,
  EventKeyMap,
  getNextIndex,
  getPrevIndex,
  isArray,
  mergeRefs,
  normalizeEventKey,
  PropGetter,
  removeItem,
} from "@chakra-ui/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import * as warn from "./warning"

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
  onChange?: (expandedIndex: ExpandedIndex) => void
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
  warn.allowMultiple(props)
  warn.allowMultipleAndAllowToggle(props)

  /**
   * Think of this as the register to each accordion item.
   * We used to manage focus between accordion item buttons.
   *
   * Every accordion item, registers their button refs in this context
   */
  const domContext = useDescendants()

  /**
   * This state is used to track the index focused accordion
   * button when click on the button, tab on the button, or
   * use the down/up arrow to navigate.
   */
  const [focusedIndex, setFocusedIndex] = useState(-1)

  /**
   * Reset focused index when accordion unmounts
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
    defaultValue: () => {
      if (allowMultiple) {
        return defaultIndex ?? []
      } else {
        return defaultIndex ?? -1
      }
    },
    onChange,
    propsMap: {
      value: "index",
      defaultValue: "defaultIndex",
    },
  })

  /**
   * Gets the `isOpen` and `onChange` props for a child accordion item based on
   * the child's index.
   *
   * @param idx {number} The index of the child accordion item
   */
  const getItemProps = (idx: number) => {
    const isOpen = isArray(index) ? index.includes(idx) : index === idx
    const onChange = (isOpen: boolean) => {
      if (allowMultiple && isArray(index)) {
        const nextState = isOpen ? addItem(index, idx) : removeItem(index, idx)
        setIndex(nextState)
      } else {
        if (isOpen) {
          setIndex(idx)
        } else if (allowToggle) {
          setIndex(-1)
        }
      }
    }

    return { isOpen, onChange }
  }

  return {
    htmlProps,
    getItemProps,
    focusedIndex,
    setFocusedIndex,
    domContext,
  }
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

interface AccordionContext extends Omit<UseAccordionReturn, "htmlProps"> {
  reduceMotion: boolean
}

const [AccordionProvider, useAccordionContext] = createContext<
  AccordionContext
>({
  name: "AccordionContext",
  errorMessage:
    "useAccordionContext: `context` is undefined. Seems you forgot to wrap the accordion components in `<Accordion />`",
})

export { AccordionProvider, useAccordionContext }

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
 * for an accordion item and it's children
 */
export function useAccordionItem(props: UseAccordionItemProps) {
  const { isDisabled, isFocusable, id, ...htmlProps } = props

  const {
    getItemProps,
    domContext,
    focusedIndex,
    setFocusedIndex,
  } = useAccordionContext()
  const { descendants } = domContext

  const buttonRef = useRef<HTMLElement>(null)

  /**
   * Generate unique ids for all accordion item components (button and panel)
   */
  const [buttonId, panelId] = useIds(id, `accordion-button`, `accordion-panel`)

  warn.focusableNotDisabled(props)

  /**
   * Think of this as a way to register this accordion item
   * with it's parent `useAccordion`
   */
  const index = useDescendant({
    element: buttonRef.current,
    context: domContext,
    disabled: isDisabled,
    focusable: isFocusable,
  })

  const { isOpen, onChange } = getItemProps(index)

  const onOpen = () => {
    onChange?.(true)
  }

  const onClose = () => {
    onChange?.(false)
  }

  const shouldFocus = index === focusedIndex

  /**
   * Autofocus the accordion button when
   * the active index matched the accordion item's index
   */
  useFocusEffect(buttonRef, { shouldFocus })

  /**
   * Toggle the visibility of the accordion item
   */
  const onClick = useCallback(() => {
    onChange?.(!isOpen)
    setFocusedIndex(index)
  }, [index, isOpen, onChange, setFocusedIndex])

  /**
   * Manage keyboard navigation between accordion items.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = normalizeEventKey(event)

      const keyMap: EventKeyMap = {
        ArrowDown: () => {
          const nextIndex = getNextIndex(index, descendants.length)
          const nextAccordion = descendants[nextIndex]
          nextAccordion?.element?.focus()
        },
        ArrowUp: () => {
          const prevIndex = getPrevIndex(index, descendants.length)
          const prevAccordion = descendants[prevIndex]
          prevAccordion?.element?.focus()
        },
        Home: () => {
          const firstAccordion = descendants[0]
          firstAccordion?.element?.focus()
        },
        End: () => {
          const lastAccordion = descendants[descendants.length - 1]
          lastAccordion?.element?.focus()
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
  const onFocus = useCallback(() => setFocusedIndex(index), [
    index,
    setFocusedIndex,
  ])

  const getButtonProps: PropGetter<HTMLButtonElement> = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(buttonRef, ref),
      id: buttonId,
      disabled: !!isDisabled,
      "aria-expanded": !!isOpen,
      "aria-controls": panelId,
      onClick: callAllHandlers(props.onClick, onClick),
      onFocus: callAllHandlers(props.onFocus, onFocus),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    }),
    [buttonId, isDisabled, isOpen, onClick, onFocus, onKeyDown, panelId],
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
