import {
  useId,
  useSafeLayoutEffect,
  useControllableState,
} from "@chakra-ui/hooks"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import { TabbableHookProps, useTabbable } from "@chakra-ui/tabbable"
import {
  callAllHandlers,
  createOnKeyDown,
  getValidChildren,
  mergeRefs,
  isUndefined,
  Dict,
} from "@chakra-ui/utils"
import * as React from "react"

export interface TabsHookProps {
  /**
   * The orientation of the tab list.
   */
  orientation?: "vertical" | "horizontal"
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   */
  isManual?: boolean
  /**
   * Callback when the index (controlled or un-controlled) changes.
   */
  onChange?: (index: number) => void
  /**
   * The index of the selected tab (in controlled mode)
   */
  index?: number
  /**
   * The initial index of the selected tab (in uncontrolled mode)
   */
  defaultIndex?: number
  /**
   * The id of the tab
   */
  id?: string
}

/**
 * Tabs hooks that provides all the states, and accessibility
 * helpers to keep all things working properly.
 *
 * It's returned object will be passed unto a Context Provider
 * so all child components can read from it.
 *
 * @see Docs https://chakra-ui.com/tabs
 */
export function useTabs(props: TabsHookProps) {
  const {
    defaultIndex,
    onChange,
    index: indexProp,
    isManual,
    orientation = "horizontal",
  } = props

  const [focusedIndex, setFocusedIndex] = React.useState(defaultIndex || 0)

  const [selectedIndex, setSelectedIndex] = useControllableState({
    defaultValue: defaultIndex ?? 0,
    value: indexProp,
    onChange,
    propsMap: {
      value: "index",
      defaultValue: "defaultIndex",
    },
  })

  const isControlled = !isUndefined(indexProp)

  // sync focused `index` with controlled `index` prop
  React.useEffect(() => {
    if (isControlled && !isUndefined(indexProp)) {
      setFocusedIndex(indexProp)
    }
  }, [isControlled, indexProp])

  // this manager is a register for all enabled tabs
  const manager = useDescendants()

  // this manage is a register for all tabs (whether enabled or not)
  // we need this for manual activated tabs
  const allManager = useDescendants()

  // generate a unique id or use user-provided id
  const id = useId(props.id, `tabs`)

  return {
    id,
    isControlled,
    selectedIndex,
    focusedIndex,
    setSelectedIndex,
    setFocusedIndex,
    isManual,
    orientation,
    manager,
    allManager,
  }
}

export type TabsHookReturn = ReturnType<typeof useTabs>

type Child = React.ReactElement<any>

export interface TabListHookProps {
  children?: React.ReactNode
  onKeyDown?: React.KeyboardEventHandler
  ref?: React.Ref<any>
  context: TabsHookReturn
}

/**
 * Tabs hook to manage multiple tab buttons,
 * and ensures only one tab is selected per time.
 *
 * @param props props object for the tablist
 */
export function useTabList<P extends TabListHookProps>(props: P) {
  const { context, ...htmlProps } = props
  const {
    setFocusedIndex,
    focusedIndex,
    orientation,
    manager,
    allManager,
  } = context

  const count = manager.descendants.length

  // // Function to update the selected tab index
  const setIndex = (index: number) => {
    const tab = manager.descendants[index]
    tab?.element?.focus()
    setFocusedIndex(index)
  }

  // Helper functions for keyboard navigation
  const nextTab = () => {
    const nextIndex = (focusedIndex + 1) % count
    setIndex(nextIndex)
  }

  const prevTab = () => {
    const prevIndex = (focusedIndex - 1 + count) % count
    setIndex(prevIndex)
  }

  const firstTab = () => setIndex(0)

  const lastTab = () => setIndex(count - 1)

  const isHorizontal = orientation === "horizontal"
  const isVertical = orientation === "vertical"

  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowRight: () => isHorizontal && nextTab(),
      ArrowLeft: () => isHorizontal && prevTab(),
      ArrowDown: () => isVertical && nextTab(),
      ArrowUp: () => isVertical && prevTab(),
      Home: () => firstTab(),
      End: () => lastTab(),
    },
  })

  return {
    ...htmlProps,
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

export type TabListHookReturn = ReturnType<typeof useTabList>

export interface TabHookProps extends TabbableHookProps {
  id?: string
  isSelected?: boolean
  panelId?: string
  context: TabsHookReturn
  onFocus?: React.FocusEventHandler
}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useTabbable` to handle this scenario
 *
 * @param props props object for tab button
 */
export function useTab<P extends TabHookProps>(props: P) {
  const { isDisabled, isFocusable, context, ...htmlProps } = props

  const {
    manager,
    allManager,
    selectedIndex,
    setFocusedIndex,
    setSelectedIndex,
    isManual,
    id,
  } = context

  const ref = React.useRef<HTMLElement>(null)

  // register this tab only if it's enabled and focusable
  const { index } = useDescendant({
    disabled: isDisabled,
    focusable: isFocusable,
    context: manager,
    element: ref.current,
  })

  // Manual mode: register this tab in any case
  useDescendant({
    context: allManager,
    element: ref.current,
  })

  const computedIndex = allManager.descendants.findIndex(
    item => item.element === ref.current,
  )

  const isSelected = computedIndex === selectedIndex

  const onClick = () => {
    setFocusedIndex(index)
    setSelectedIndex(index)
  }

  const onFocus = () => {
    const isDisabledButFocusable = isDisabled && isFocusable
    const selectionFollowsFocus = !isManual && !isDisabledButFocusable

    if (selectionFollowsFocus) {
      setSelectedIndex(computedIndex)
    }
  }

  const tabbable = useTabbable({
    ...htmlProps,
    ref: mergeRefs(ref, props.ref),
    isDisabled,
    isFocusable,
    onClick: callAllHandlers(props.onClick, onClick),
  })

  const type: "button" | "submit" | "reset" = "button"

  const panelId = `${id}--tabpanel-${index}`

  return {
    ...tabbable,
    id: `${id}--tab-${index}`,
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": panelId,
    onFocus: callAllHandlers(props.onFocus, onFocus),
  }
}

type TabPanelsHookProps = {
  children?: React.ReactNode
  context: TabsHookReturn
}

/**
 * Tabs hook for managing the visibility of multiple tab panels.
 *
 * Since only one panel can be show at a time, we use `React.cloneElement`
 * to inject `selected` panel to each TabPanel.
 *
 * It returns a cloned version of it's children with
 * all functionality included.
 *
 * @param props props object for the tab panels
 */
export function useTabPanels<P extends TabPanelsHookProps>(props: P) {
  const { context, ...htmlProps } = props

  const { id, selectedIndex } = context

  const validChildren = getValidChildren(props.children)

  const children = validChildren.map((child, index) =>
    React.cloneElement(child as Child, {
      isSelected: index === selectedIndex,
      id: `${id}--tabpanel-${index}`,
    }),
  )

  return { ...htmlProps, children }
}

/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */
export function useTabPanel(props: Dict) {
  const { isSelected, id, ...rest } = props
  return {
    ...rest,
    role: "tabpanel",
    hidden: !isSelected,
    id,
  }
}

/**
 * Tabs hook to show an animated indicators that
 * follows the active tab.
 *
 * The way we do it is by measuring the DOM Rect (or dimensions)
 * of the active tab, and return that as CSS style for
 * the indicator.
 */
export function useTabIndicator(context: TabsHookReturn): React.CSSProperties {
  const { selectedIndex, orientation, manager } = context

  const isHorizontal = orientation === "horizontal"
  const isVertical = orientation === "vertical"

  // Get the clientRect of the selected tab
  const [rect, setRect] = React.useState(() => {
    if (isHorizontal) return { left: 0, width: 0 }
    if (isVertical) return { top: 0, height: 0 }
  })

  const [hasMeasured, setHasMeasured] = React.useState(false)

  // Update the selected tab rect when the selectedIndex changes
  useSafeLayoutEffect(() => {
    if (isUndefined(selectedIndex)) return

    const tab = manager.descendants[selectedIndex]
    const tabRect = tab?.element?.getBoundingClientRect()

    // Horizontal Tab: Calculate width and left distance
    if (isHorizontal && tabRect) {
      const { left, width } = tabRect
      setRect({ left, width })
    }

    // Vertical Tab: Calculate height and top distance
    if (isVertical && tabRect) {
      const { top, height } = tabRect
      setRect({ top, height })
    }

    // Prevent unwanted transition from 0 to measured rect
    // by setting the measured state in the next tick
    const id = requestAnimationFrame(() => {
      setHasMeasured(true)
    })

    return () => {
      cancelAnimationFrame(id)
    }
  }, [selectedIndex, isHorizontal, isVertical, manager.descendants])

  return {
    position: "absolute",
    transition: hasMeasured ? "all 200ms cubic-bezier(0, 0, 0.2, 1)" : "none",
    ...rect,
  }
}
