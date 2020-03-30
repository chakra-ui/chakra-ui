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
} from "@chakra-ui/utils"
import React, { cloneElement, useState, useRef } from "react"
import * as warn from "./Accordion.warning"

export type ExpandedIndex = number | number[]

export interface AccordionHookProps {
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
  onChange?: (expandedIndex?: ExpandedIndex) => void
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: React.ReactNode
}

type AccordionElement = React.ReactElement<{
  isOpen: boolean
  onChange(isOpen: boolean): void
}>

/**
 * useAccordion
 *
 * React hook that provides all the state and focus management logic
 * for accordion items.
 *
 * It is consumed by the `Accordion` component
 */
export function useAccordion(props: AccordionHookProps) {
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
  const descendantsContext = useDescendants()

  /**
   * This state is used to track the index focused accordion
   * button when click on the button, tab on the button, or
   * use the down/up arrow to navigate.
   */
  const [focusedIndex, setFocusedIndex] = useState(-1)

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
  const validChildren = getValidChildren(props.children)

  /**
   * Clone the accordion items and pass them the `onChange`
   * and `isOpen`
   */
  const children = validChildren.map((child, _index) => {
    const isExpanded = isArray(index)
      ? index.includes(_index)
      : index === _index

    return cloneElement(child as AccordionElement, {
      isOpen: isExpanded,
      onChange: (nextIsOpen: boolean) => {
        if (allowMultiple && isArray(index)) {
          const nextState = nextIsOpen
            ? addItem(index, _index)
            : removeItem(index, _index)
          setIndex(nextState)
        } else {
          if (nextIsOpen) {
            setIndex(_index)
          } else if (allowToggle) {
            setIndex(-1)
          }
        }
      },
    })
  })

  return {
    children,
    htmlProps,
    focusedIndex,
    setFocusedIndex,
    descendantsContext,
  }
}

export type AccordionHookReturn = ReturnType<typeof useAccordion>

//////////////////////////////////////////////////////////////////////

interface AccordionItemHookOptions {
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

export type AccordionItemHookProps = AccordionItemHookOptions & {
  context: Omit<AccordionHookReturn, "children" | "htmlProps">
}

/**
 * useAccordionItem
 *
 * React hook that provides the open/close functionality
 * for an accordion item and it's children
 */
export function useAccordionItem(props: AccordionItemHookProps) {
  const {
    isDisabled,
    isFocusable,
    onChange,
    context,
    isOpen,
    id,
    ...htmlProps
  } = props

  const { descendantsContext, focusedIndex, setFocusedIndex } = context

  const onOpen = () => onChange?.(true)
  const onClose = () => onChange?.(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  /**
   * generate unique ids for all accordion item components (button and panel)
   */
  const [buttonId, panelId] = useIds(id, `accordion-button`, `accordion-panel`)

  warn.focusableNotDisabled(props)

  /**
   * Think of this as a way to register this accordion item
   * with it's parent `useAccordion`
   *
   * `index` =  the index of the accordion item
   * `descendants` = the array of all registered accordion item
   */
  const { index, descendants } = useDescendant({
    element: buttonRef.current,
    context: descendantsContext,
    disabled: isDisabled,
    focusable: isFocusable,
  })

  const shouldFocus = index === focusedIndex

  /**
   * Autofocus the accordion button when
   * the active index matched the accordion item's index
   */
  useFocusEffect(buttonRef, { shouldFocus })

  /**
   * Toggle the visibility of the accordion item
   */
  const onClick = () => {
    onChange?.(!isOpen)
    setFocusedIndex(index)
  }

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
  const onFocus = () => setFocusedIndex(index)

  return {
    isOpen,
    isDisabled,
    isFocusable,
    onOpen,
    onClose,
    /**
     * Prop getters
     */
    getButtonProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(buttonRef, props.ref),
      id: buttonId,
      disabled: isDisabled,
      "aria-expanded": isOpen,
      "aria-controls": panelId,
      onClick: callAllHandlers(props.onClick, onClick),
      onFocus: callAllHandlers(props.onFocus, onFocus),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    }),
    getPanelProps: (props: Dict = {}) => ({
      ...props,
      role: "region",
      id: panelId,
      "aria-labelledby": buttonId,
      hidden: !isOpen,
    }),
    getRootProps: (props: Dict = {}) => ({
      ...htmlProps,
      ref: props.ref,
    }),
  }
}

export type AccordionItemHookReturn = ReturnType<typeof useAccordionItem>
