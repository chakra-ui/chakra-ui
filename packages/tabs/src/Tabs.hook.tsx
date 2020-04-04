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
 * @see Docs https://chakra-ui.com/useTabs
 */
export function useTabs(props: TabsHookProps) {
  const {
    defaultIndex,
    onChange,
    index,
    isManual,
    orientation = "horizontal",
  } = props

  /**
   * We use this to keep track of the index of the focused tab.
   *
   * Tabs can be automatically activated, this means selection follows focus.
   * When we navigate with the arrow keys, we move focus and selection to next/prev tab
   *
   * Tabs can also be manually activated, this means selection does not follow focus.
   * When we navigate with the arrow keys, we only move focus NOT selection. The user
   * will need not manually activate the tab using `Enter` or `Space`.
   *
   * This is why we need to keep track of the `focusedIndex` and `selectedIndex`
   */
  const [focusedIndex, setFocusedIndex] = React.useState(defaultIndex ?? 0)

  const [selectedIndex, setSelectedIndex] = useControllableState({
    defaultValue: defaultIndex ?? 0,
    value: index,
    onChange,
    shouldUpdate: (prevIndex, nextIndex) => prevIndex !== nextIndex,
    propsMap: {
      value: "index",
      defaultValue: "defaultIndex",
    },
  })

  /**
   * Sync focused `index` with controlled `selectedIndex` (which is the `props.index`)
   */
  React.useEffect(() => {
    if (!isUndefined(index)) {
      setFocusedIndex(index)
    }
  }, [index])

  /**
   * Think of `useDescendants` as a register for the tab nodes.
   *
   * This manager is used to store only the tab nodes that are not disabled, and focusable.
   * If we have the following code
   *
   * ```jsx
   * <Tab>Tab 1</Tab>
   * <Tab isDisabled>Tab 2</Tab>
   * <Tab>Tab 3</Tab>
   * ```
   *
   * The manager will only hold references to "Tab 1" and "Tab 3", since `Tab 2` is disabled
   */
  const enabledTabsContext = useDescendants()

  /**
   * This manager is used to store all tab nodes whether disabled or not.
   * If we have the following code
   *
   * ```jsx
   * <Tab>Tab 1</Tab>
   * <Tab isDisabled>Tab 2</Tab>
   * <Tab>Tab 3</Tab>
   * ```
   *
   * The manager will only hold references to "Tab 1", "Tab 2" "Tab 3".
   *
   * We need this for correct indexing of tabs in event a tab is disabled
   */
  const allTabsContext = useDescendants()

  /**
   * generate a unique id or use user-provided id for
   * the tabs widget
   */
  const id = useId(props.id, `tabs`)

  return {
    id,
    selectedIndex,
    focusedIndex,
    setSelectedIndex,
    setFocusedIndex,
    isManual,
    orientation,
    enabledTabsContext,
    allTabsContext,
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
    enabledTabsContext,
  } = context

  const count = enabledTabsContext.descendants.length

  /**
   * Function to update the selected tab index
   * @param index the next focused index
   */
  const setIndex = (index: number) => {
    const tab = enabledTabsContext.descendants[index]
    if (tab?.element) {
      tab.element.focus()
      setFocusedIndex(index)
    }
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
    enabledTabsContext,
    allTabsContext,
    selectedIndex,
    setSelectedIndex,
    isManual,
    id,
  } = context

  const ref = React.useRef<HTMLElement>(null)

  /**
   * Think of `useDescendant` as the function that actually registers this tab
   * to the corresponding `manager`, and returns it's index.
   *
   * In this case, it registers the tab only if it's enabled and focusable
   */
  useDescendant({
    disabled: isDisabled,
    focusable: isFocusable,
    context: enabledTabsContext,
    element: ref.current,
  })

  /**
   * In this case, it registers the tab (whether disabled or not)
   */
  useDescendant({
    context: allTabsContext,
    element: ref.current,
  })

  const computedIndex = allTabsContext.descendants.findIndex(
    item => item.element === ref.current,
  )

  const isSelected = computedIndex === selectedIndex

  const onClick = () => {
    setSelectedIndex(computedIndex)
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

  return {
    ...tabbable,
    id: makeTabId(id, computedIndex),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": makeTabPanelId(id, computedIndex),
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
 */
export function useTabPanels<P extends TabPanelsHookProps>(props: P) {
  const { context, ...htmlProps } = props

  const { id, selectedIndex } = context

  const validChildren = getValidChildren(props.children)

  const children = validChildren.map((child, index) =>
    React.cloneElement(child as Child, {
      isSelected: index === selectedIndex,
      id: makeTabPanelId(id, index),
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
  const { isSelected, id, ...htmlProps } = props
  return {
    ...htmlProps,
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
  const { selectedIndex, orientation, allTabsContext } = context

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

    const tab = allTabsContext.descendants[selectedIndex]
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
  }, [selectedIndex, isHorizontal, isVertical, allTabsContext.descendants])

  return {
    position: "absolute",
    transition: hasMeasured ? "all 200ms cubic-bezier(0, 0, 0.2, 1)" : "none",
    ...rect,
  }
}

function makeTabId(id: string, index: number) {
  return `${id}--tab-${index}`
}

function makeTabPanelId(id: string, index: number) {
  return `${id}--tabpanel-${index}`
}
