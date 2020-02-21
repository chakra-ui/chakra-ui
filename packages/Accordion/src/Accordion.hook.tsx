import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import {
  useControllableProp,
  useDisclosure,
  useFocusEffect,
  useIds,
} from "@chakra-ui/hooks"
import {
  createOnKeyDown,
  getNextIndex,
  getPrevIndex,
  isArray,
  cleanChildren,
  addItem,
  removeItem,
  mergeRefs,
  callAllHandlers,
} from "@chakra-ui/utils"
import * as React from "react"
import * as Warning from "./Accordion.warning"

const __DEV__ = process.env.NODE_ENV !== "production"

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
  onChange?: (expandedIndex?: ExpandedIndex | null) => void
  /**
   * The content of the accordion. Must be `AccordionItem`
   */
  children: React.ReactNode
}

export function useAccordion(props: AccordionHookProps) {
  const {
    onChange,
    defaultIndex,
    index: indexProp,
    allowMultiple,
    allowToggle,
    ...htmlProps
  } = props

  const [indexState, setIndex] = React.useState<ExpandedIndex>(() => {
    if (allowMultiple) {
      return defaultIndex ?? []
    } else {
      return defaultIndex ?? -1
    }
  })

  const descendantsContext = useDescendants()

  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  const [isControlled, index] = useControllableProp(indexProp, indexState)

  const updateIndex = React.useCallback(
    (indexes: ExpandedIndex) => {
      if (!isControlled) setIndex(indexes)
      if (onChange) onChange(indexes)
    },
    [isControlled, onChange],
  )

  const validChildren = cleanChildren(props.children)

  const children = validChildren.map((child, childIndex) => {
    const isExpanded = isArray(index)
      ? index.includes(childIndex)
      : index === childIndex

    type AccordionElement = React.ReactElement<{
      isOpen: boolean
      onChange(isOpen: boolean): void
    }>

    return React.cloneElement(child as AccordionElement, {
      isOpen: isExpanded,
      onChange: (nextIsOpen: boolean) => {
        if (allowMultiple && isArray(index)) {
          const nextState = nextIsOpen
            ? addItem(index, childIndex)
            : removeItem(index, childIndex)
          updateIndex(nextState)
        } else {
          if (nextIsOpen) {
            updateIndex(childIndex)
          } else if (allowToggle) {
            updateIndex(-1)
          }
        }
      },
    })
  })

  if (__DEV__) {
    Warning.allowMultiple(props)
    Warning.allowMultipleAndAllowToggle(props)
    Warning.controlledAndNoChange(props)
    Warning.controlledSwitching("Accordion", isControlled, indexProp)
  }

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
   * If `true`, expands the accordion by on initial mount.
   */
  defaultIsOpen?: boolean
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

export function useAccordionItem(props: AccordionItemHookProps) {
  const {
    isDisabled,
    isFocusable,
    onChange,
    context,
    isOpen: isOpenProp,
    defaultIsOpen,
    ...htmlProps
  } = props
  const { descendantsContext, focusedIndex, setFocusedIndex } = context

  // hook to manage open/close states
  const { isControlled, onToggle, isOpen, onOpen, onClose } = useDisclosure(
    props,
  )

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  // generate some ids
  const [buttonId, panelId] = useIds(`accordion-header`, `accordion-panel`)

  // warn for incorrect usage
  if (__DEV__) {
    Warning.controlledSwitching("AccordionItem", isControlled, isOpenProp)
    Warning.focusableNotDisabled(props)
  }

  // hook to register this accordion item for focus management
  const { index, descendants } = useDescendant({
    element: buttonRef.current,
    context: descendantsContext,
    disabled: isDisabled,
    focusable: isFocusable,
  })

  const isFocused = index === focusedIndex

  // focus the accordion button if it's highlighted
  useFocusEffect(buttonRef, { shouldFocus: isFocused })

  // toggle the visibility of the accordion item
  const onClick = React.useCallback(() => {
    if (!isControlled) onToggle()
    if (onChange) onChange(!isOpen)
    setFocusedIndex(index)
  }, [isControlled, onToggle, onChange, isOpen, setFocusedIndex, index])

  // manage keyboard navigation between accordion items
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

  // Since each accordion item's button still remains tabbable, let's
  // update the focusManager when it receives focus
  const onFocus = React.useCallback(() => {
    setFocusedIndex(index)
  }, [index, setFocusedIndex])

  type ButtonProps = {
    ref?: React.Ref<any>
    onFocus?: React.FocusEventHandler
    onKeyDown?: React.KeyboardEventHandler
    onClick?: React.MouseEventHandler
  }

  const getButtonProps = (props: ButtonProps) => ({
    ...props,
    ref: mergeRefs(buttonRef, props.ref),
    id: buttonId,
    disabled: isDisabled,
    "aria-expanded": isOpen,
    "aria-controls": panelId,
    onClick: callAllHandlers(props.onClick, onClick),
    onFocus: callAllHandlers(props.onFocus, onFocus),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  })

  const getPanelProps = (props: {}) => ({
    ...props,
    role: "region",
    id: panelId,
    "aria-labelledby": buttonId,
    hidden: !isOpen,
  })

  return {
    // prop getters
    getButtonProps,
    getPanelProps,
    // state
    isOpen,
    isDisabled,
    isFocusable,
    // actions
    onOpen,
    onClose,
    // other props (useful if you need to spread  other props to root component)
    htmlProps,
  }
}

export type AccordionItemHookReturn = ReturnType<typeof useAccordionItem>
