import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import { useControllableState, useFocusEffect, useIds } from "@chakra-ui/hooks"
import {
  addItem,
  callAllHandlers,
  createOnKeyDown,
  Dict,
  getNextIndex,
  getPrevIndex,
  getValidChildren,
  isArray,
  mergeRefs,
  removeItem,
  __DEV__,
  createContext,
} from "@chakra-ui/utils"
import React, { Ref, ReactNode, useCallback, cloneElement, useRef } from "react"
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
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: ReactNode
}

/**
 * useAccordion hook provides all the state and focus management logic
 * for accordion items.
 *
 * It is consumed by the `Accordion` component
 */
export function useAccordion(props: UseAccordionProps) {
  const {
    onChange,
    defaultIndex,
    index: indexProp,
    allowMultiple,
    allowToggle,
    children,
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
  const [focusedIndex, setFocusedIndex] = React.useState(-1)

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
   * Filter out invalid children (null, false), in the case
   * of conditional rendering
   */
  const validChildren = getValidChildren(children)

  /**
   * Clone the accordion items and pass them the `onChange`
   * and `isOpen`
   */
  const _children = validChildren.map((child, idx) => {
    const isExpanded = isArray(index) ? index.includes(idx) : index === idx

    return cloneElement(child, {
      isOpen: isExpanded,
      onChange: (isOpen: boolean) => {
        if (allowMultiple && isArray(index)) {
          const nextState = isOpen
            ? addItem(index, idx)
            : removeItem(index, idx)
          setIndex(nextState)
        } else {
          if (isOpen) {
            setIndex(idx)
          } else if (allowToggle) {
            setIndex(-1)
          }
        }
      },
    })
  })

  return {
    children: _children,
    htmlProps,
    focusedIndex,
    setFocusedIndex,
    domContext,
  }
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

type AccordionContext = Omit<UseAccordionReturn, "children" | "htmlProps"> & {
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
   * If `true`, expands the accordion in the controlled mode.
   */
  isOpen?: boolean
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
  /**
   * The callback fired when the accordion is expanded/collapsed.
   */
  onChange?: (isOpen: boolean) => void
}

/**
 * useAccordionItem
 *
 * React hook that provides the open/close functionality
 * for an accordion item and it's children
 */
export function useAccordionItem(props: UseAccordionItemProps) {
  const { isDisabled, isFocusable, onChange, isOpen, id, ...htmlProps } = props

  const { domContext, focusedIndex, setFocusedIndex } = useAccordionContext()

  const onOpen = () => onChange?.(true)
  const onClose = () => onChange?.(false)

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

  const { descendants } = domContext

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
   * `createOnKeyDown` makes it easy to write actions
   * for each event key
   */
  const onKeyDown = createOnKeyDown({
    keyMap: {
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
    },
  })

  /**
   * Since each accordion item's button still remains tabbable, let's
   * update the focusedIndex when it receives focus
   */
  const onFocus = useCallback(() => setFocusedIndex(index), [
    index,
    setFocusedIndex,
  ])

  const getButtonProps = useCallback(
    (props: Dict = {}, ref: Ref<any> = null) => ({
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

  const getPanelProps = useCallback(
    (props: Dict = {}, ref: Ref<any> = null) => ({
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
