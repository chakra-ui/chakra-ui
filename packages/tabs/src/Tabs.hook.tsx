import {
  useId,
  useIsomorphicEffect,
  useControllableState,
} from "@chakra-ui/hooks"
import { TabbableHookProps, useTabbable } from "@chakra-ui/tabbable"
import {
  callAllHandlers,
  createHookContext,
  createOnKeyDown,
  getValidChildren,
  mergeRefs,
  isUndefined,
} from "@chakra-ui/utils"
import * as React from "react"

export interface TabsHookProps {
  /**
   * The orientation of the tablist.
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
   * The children of the tabs should be tabpanel and tabpanels.
   */
  children: React.ReactNode
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
 * @param props props for the tabs logic
 */
export function useTabs(props: TabsHookProps) {
  const {
    defaultIndex,
    onChange: onChangeProp,
    index: indexProp,
    isManual,
    orientation = "horizontal",
  } = props

  const [focusedIndex, setFocusedIndex] = React.useState<number>(
    defaultIndex || 0,
  )

  const [selectedIndex, setSelectedIndex] = useControllableState({
    defaultValue: defaultIndex ?? 0,
    value: indexProp,
    onChange: onChangeProp,
    propsMap: {
      value: "index",
      defaultValue: "defaultIndex",
    },
  })

  const isControlled = !isUndefined(indexProp)

  // Reference to all tab nodes, and tablist node
  const tabNodesRef = React.useRef<HTMLElement[]>([])
  const tablistRef = React.useRef<HTMLElement>()

  // sync focus with selection in controlled mode
  React.useEffect(() => {
    if (isControlled && indexProp != undefined) {
      setFocusedIndex(indexProp)
    }
  }, [isControlled, indexProp])

  // generate a unique id or use user-provided id
  const id = useId(props.id, `tabs`)

  return {
    id,
    isControlled,
    selectedIndex,
    focusedIndex,
    onChange: setSelectedIndex,
    onFocus: setFocusedIndex,
    isManual,
    orientation,
    tabNodesRef,
    tablistRef,
  }
}

/**
 * Create a context Provider and consuming hook from `useTabs`
 */
const [TabsProvider, useTabsContext] = createHookContext(useTabs)
export { TabsProvider }

export interface TabHookProps extends TabbableHookProps {
  id?: string
  isSelected?: boolean
  panelId?: string
}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useTabbable` to handle this scenario
 *
 * @param props props object for tab button
 */
export function useTab(props: TabHookProps) {
  const { isSelected, id, panelId, ...rest } = props

  const tabProps = useTabbable(rest)

  const type: "button" | "submit" | "reset" = "button"

  return {
    ...tabProps,
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": panelId,
  }
}

export interface TabListHookProps {
  children?: React.ReactNode
  onKeyDown?: React.KeyboardEventHandler
  ref?: React.Ref<any>
}

/**
 * Tabs hook to manage multiple tab buttons,
 * and ensures only one tab is selected per time.
 *
 * @param props props object for the tablist
 */
export function useTabList(props: TabListHookProps) {
  const tabs = useTabsContext()

  const validChildren = getValidChildren(props.children)

  /**
   * @todo use descendant hooks for this logic
   *
   * Get all the focusable tab indexes
   * A tab is focusable if it's not disabled or is disabled and has focusable prop
   * ARIA: It's a good idea to allow users focus on disabled tabs so you tell them why it's disabled
   */
  const focusableIndexes = validChildren
    .map((child: any, index) => {
      const isTrulyDisabled = child.props.isDisabled && !child.props.isFocusable
      return isTrulyDisabled ? null : index
    })
    .filter(child => child !== null) as number[]

  const enabledSelectedIndex = focusableIndexes.indexOf(tabs.focusedIndex)

  const count = focusableIndexes.length

  // Function to update the selected tab index
  const setIndex = (index: number) => {
    const childIndex = focusableIndexes[index]
    tabs.tabNodesRef.current[childIndex].focus()
    tabs.onFocus(childIndex)
  }

  // Helper functions for keyboard navigation
  const goToNextTab = () => {
    const nextIndex = (enabledSelectedIndex + 1) % count
    setIndex(nextIndex)
  }

  const goToPrevTab = () => {
    const nextIndex = (enabledSelectedIndex - 1 + count) % count
    setIndex(nextIndex)
  }

  const goToFirst = () => setIndex(0)

  const goToLast = () => setIndex(count - 1)

  const isHorizontal = tabs.orientation === "horizontal"
  const isVertical = tabs.orientation === "vertical"

  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowRight: () => isHorizontal && goToNextTab(),
      ArrowLeft: () => isHorizontal && goToPrevTab(),
      ArrowDown: () => isVertical && goToNextTab(),
      ArrowUp: () => isVertical && goToPrevTab(),
      Home: () => goToFirst(),
      End: () => goToLast(),
    },
  })

  // Enhance the children by passing some props to them
  const children = validChildren.map((child: any, index) => {
    const isSelected = index === tabs.selectedIndex

    const onClick = () => {
      tabs.onFocus(index)
      tabs.onChange?.(index)
    }

    const onFocus = () => {
      const isDisabledButFocusable =
        child.props.isDisabled && child.props.isFocusable
      if (!tabs.isManual && !isDisabledButFocusable) {
        tabs.onChange?.(index)
      }
    }

    const refCallback = (node: HTMLElement) => {
      tabs.tabNodesRef.current[index] = node
    }

    const ref = mergeRefs(refCallback, child.props.ref)

    return React.cloneElement(child as any, {
      id: `${tabs.id}--tab-${index}`,
      panelId: `${tabs.id}--tabpanel-${index}`,
      ref,
      isSelected,
      onClick: callAllHandlers(child.props.onClick, onClick),
      onFocus: callAllHandlers(child.props.onFocus, onFocus),
    })
  })

  return {
    ...props,
    ref: mergeRefs(props.ref, tabs.tablistRef),
    role: "tablist",
    "aria-orientation": tabs.orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    children,
  }
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
export function useTabPanels(props: any) {
  const { children, ...rest } = props
  const tabs = useTabsContext()

  const validChildren = getValidChildren(children)

  const _children = validChildren.map((child, index) => {
    return React.cloneElement(child as any, {
      isSelected: index === tabs.selectedIndex,
      id: `${tabs.id}--tabpanel-${index}`,
    })
  })

  return { ...rest, children: _children }
}

/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */
export function useTabPanel(props: any) {
  const { isSelected, id, ...rest } = props
  return {
    ...rest,
    role: "tabpanel",
    hidden: !props.isSelected,
    id: props.id,
  }
}

/**
 * React hook to show an animated indicators that
 * follows the active tab.
 *
 * The way we do it is by measuring the DOM Rect (or dimensions)
 * of the active tab, and return that as CSS style for
 * the indicator.
 */
export function useTabIndicator(): React.CSSProperties {
  const tabs = useTabsContext()
  const isHorizontal = tabs.orientation === "horizontal"
  const isVertical = tabs.orientation === "vertical"

  // Get the clientRect of the selected tab
  const [rect, setRect] = React.useState(() => {
    if (isHorizontal) return { left: 0, width: 0 }
    if (isVertical) return { top: 0, height: 0 }
  })

  const [hasMeasured, setHasMeasured] = React.useState(false)

  // Update the selected tab rect when the selectedIndex changes
  useIsomorphicEffect(() => {
    if (isUndefined(tabs.selectedIndex)) return

    const selectedTabNode = tabs.tabNodesRef.current[tabs.selectedIndex]
    const selectedTabRect = selectedTabNode?.getBoundingClientRect()

    // Horizontal Tab: Calculate width and left distance
    if (isHorizontal && selectedTabRect) {
      const { left, width } = selectedTabRect
      setRect({ left, width })
    }

    // Vertical Tab: Calculate height and top distance
    if (isVertical && selectedTabRect) {
      const { top, height } = selectedTabRect
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
  }, [tabs.selectedIndex, tabs.tabNodesRef, isHorizontal, isVertical])

  return {
    position: "absolute",
    transition: hasMeasured ? "all 200ms cubic-bezier(0, 0, 0.2, 1)" : "none",
    ...rect,
  }
}
