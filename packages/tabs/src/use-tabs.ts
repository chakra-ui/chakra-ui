import { useClickable, UseClickableProps } from "@chakra-ui/clickable"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import {
  useControllableState,
  useId,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import {
  callAllHandlers,
  createOnKeyDown,
  Dict,
  getValidChildren,
  isUndefined,
  mergeRefs,
  createContext,
} from "@chakra-ui/utils"
import {
  cloneElement,
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
  KeyboardEventHandler,
  FocusEventHandler,
  ButtonHTMLAttributes,
  Ref,
  CSSProperties,
} from "react"

export interface UseTabsProps {
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
  /**
   * Performance 🚀:
   * If `true`, the TabPanel rendering will be deferred
   * until it is open.
   */
  isLazy?: boolean
}

/**
 * Tabs hooks that provides all the states, and accessibility
 * helpers to keep all things working properly.
 *
 * It's returned object will be passed unto a Context Provider
 * so all child components can read from it.
 *
 * @see Docs https://chakra-ui.com/components/useTabs
 */
export function useTabs(props: UseTabsProps) {
  const {
    defaultIndex,
    onChange,
    index,
    isManual,
    isLazy,
    orientation = "horizontal",
    ...htmlProps
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
  const [focusedIndex, setFocusedIndex] = useState(defaultIndex ?? 0)

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
  useEffect(() => {
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
  const enabledDomContext = useDescendants()

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
  const domContext = useDescendants()

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
    isLazy,
    orientation,
    enabledDomContext,
    domContext,
    htmlProps,
  }
}

export type UseTabsReturn = Omit<ReturnType<typeof useTabs>, "htmlProps">

const [TabsProvider, useTabsContext] = createContext<UseTabsReturn>({
  name: "TabsContext",
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
})

export { TabsProvider }

type Child = ReactElement<any>

export interface UseTabListProps {
  children?: ReactNode
  onKeyDown?: KeyboardEventHandler
  ref?: Ref<any>
}

/**
 * Tabs hook to manage multiple tab buttons,
 * and ensures only one tab is selected per time.
 *
 * @param props props object for the tablist
 */
export function useTabList<P extends UseTabListProps>(props: P) {
  const {
    setFocusedIndex,
    focusedIndex,
    orientation,
    enabledDomContext,
  } = useTabsContext()

  const count = enabledDomContext.descendants.length

  /**
   * Function to update the selected tab index
   */
  const setIndex = (index: number) => {
    const tab = enabledDomContext.descendants[index]
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
    ...props,
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

export type UseTabListReturn = ReturnType<typeof useTabList>

export interface UseTabOptions {
  id?: string
  isSelected?: boolean
  panelId?: string
}

export interface UseTabProps
  extends Omit<UseClickableProps, "color">,
    UseTabOptions {}

/**
 * Tabs hook to manage each tab button.
 *
 * A tab can be disabled and focusable, or both,
 * hence the use of `useClickable` to handle this scenario
 */
export function useTab<P extends UseTabProps>(
  props: P,
): ButtonHTMLAttributes<any> {
  const { isDisabled, isFocusable, ...htmlProps } = props

  const {
    setSelectedIndex,
    isManual,
    id,
    setFocusedIndex,
    enabledDomContext,
    domContext,
    selectedIndex,
  } = useTabsContext()

  const ref = useRef<HTMLElement>(null)

  /**
   * Think of `useDescendant` as the function that registers tab node
   * to the `enabledDomContext`, and returns it's index.
   *
   * Tab is registered if it's enabled or focusable
   */
  const enabledIndex = useDescendant({
    disabled: Boolean(isDisabled),
    focusable: Boolean(isFocusable),
    context: enabledDomContext,
    element: ref.current,
  })

  /**
   * Registers all tabs (whether disabled or not)
   */
  const index = useDescendant({
    context: domContext,
    element: ref.current,
  })

  const isSelected = index === selectedIndex

  const onClick = () => {
    setFocusedIndex(enabledIndex)
    setSelectedIndex(index)
  }

  const onFocus = () => {
    const isDisabledButFocusable = isDisabled && isFocusable
    const shouldSelect = !isManual && !isDisabledButFocusable

    if (shouldSelect) {
      setSelectedIndex(index)
    }
  }

  const clickable = useClickable({
    ...htmlProps,
    ref: mergeRefs(ref, props.ref),
    isDisabled,
    isFocusable,
    onClick: callAllHandlers(props.onClick, onClick),
  })

  const type: "button" | "submit" | "reset" = "button"

  return {
    ...clickable,
    id: makeTabId(id, index),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": makeTabPanelId(id, index),
    onFocus: callAllHandlers(props.onFocus, onFocus),
  }
}

export interface UseTabPanelsProps {
  children?: ReactNode
}

/**
 * Tabs hook for managing the visibility of multiple tab panels.
 *
 * Since only one panel can be show at a time, we use `cloneElement`
 * to inject `selected` panel to each TabPanel.
 *
 * It returns a cloned version of it's children with
 * all functionality included.
 */
export function useTabPanels<P extends UseTabPanelsProps>(props: P) {
  const context = useTabsContext()

  const { id, selectedIndex } = context

  const validChildren = getValidChildren(props.children)

  const children = validChildren.map((child, index) =>
    cloneElement(child as Child, {
      isSelected: index === selectedIndex,
      id: makeTabPanelId(id, index),
    }),
  )

  return { ...props, children }
}

/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */
export function useTabPanel(props: Dict) {
  const { isSelected, id, ...htmlProps } = props
  const { isLazy } = useTabsContext()

  return {
    ...htmlProps,
    children: !isLazy || isSelected ? props.children : null,
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
export function useTabIndicator(): CSSProperties {
  const context = useTabsContext()

  const { selectedIndex, orientation, domContext } = context

  const isHorizontal = orientation === "horizontal"
  const isVertical = orientation === "vertical"

  // Get the clientRect of the selected tab
  const [rect, setRect] = useState(() => {
    if (isHorizontal) return { left: 0, width: 0 }
    if (isVertical) return { top: 0, height: 0 }
  })

  const [hasMeasured, setHasMeasured] = useState(false)

  // Update the selected tab rect when the selectedIndex changes
  useSafeLayoutEffect(() => {
    if (isUndefined(selectedIndex)) return

    const tab = domContext.descendants[selectedIndex]
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
    const frameId = requestAnimationFrame(() => {
      setHasMeasured(true)
    })

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [selectedIndex, isHorizontal, isVertical, domContext.descendants])

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
