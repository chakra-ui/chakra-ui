import { useClickable, UseClickableProps } from "@chakra-ui/clickable"
import { createDescendantContext } from "@chakra-ui/descendant"
import {
  useControllableState,
  useId,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import {
  createContext,
  EventKeyMap,
  getValidChildren,
  mergeRefs,
} from "@chakra-ui/react-utils"
import {
  callAllHandlers,
  determineLazyBehavior,
  Dict,
  focus,
  isUndefined,
  LazyBehavior,
  normalizeEventKey,
} from "@chakra-ui/utils"
import * as React from "react"

/* -------------------------------------------------------------------------------------------------
 * Create context to track descendants and their indices
 * -----------------------------------------------------------------------------------------------*/

export const [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant,
] = createDescendantContext<HTMLButtonElement>()

/* -------------------------------------------------------------------------------------------------
 * useTabs - The root react hook that manages all tab items
 * -----------------------------------------------------------------------------------------------*/

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
   * If `true`, rendering of the tab panel's will be deferred until it is selected.
   */
  isLazy?: boolean
  /**
   * Performance 🚀:
   * The lazy behavior of tab panels' content when not active.
   * Only works when `isLazy={true}`
   *
   * - "unmount": The content of inactive tab panels are always unmounted.
   * - "keepMounted": The content of inactive tab panels is initially unmounted,
   * but stays mounted when selected.
   *
   * @default "unmount"
   */
  lazyBehavior?: LazyBehavior
  /**
   * The writing mode direction.
   *
   * - When in RTL, the left and right navigation is flipped
   */
  direction?: "rtl" | "ltr"
}

/**
 * Tabs hooks that provides all the states, and accessibility
 * helpers to keep all things working properly.
 *
 * Its returned object will be passed unto a Context Provider
 * so all child components can read from it.
 * There is no document link yet
 * @see Docs https://chakra-ui.com/docs/components/useTabs
 */
export function useTabs(props: UseTabsProps) {
  const {
    defaultIndex,
    onChange,
    index,
    isManual,
    isLazy,
    lazyBehavior = "unmount",
    orientation = "horizontal",
    direction = "ltr",
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
  const [focusedIndex, setFocusedIndex] = React.useState(defaultIndex ?? 0)

  const [selectedIndex, setSelectedIndex] = useControllableState({
    defaultValue: defaultIndex ?? 0,
    value: index,
    onChange,
  })

  /**
   * Sync focused `index` with controlled `selectedIndex` (which is the `props.index`)
   */
  React.useEffect(() => {
    if (index != null) {
      setFocusedIndex(index)
    }
  }, [index])

  /**
   * Think of `useDescendants` as a register for the tab nodes.
   */
  const descendants = useTabsDescendants()

  /**
   * Generate a unique id or use user-provided id for the tabs widget
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
    lazyBehavior,
    orientation,
    descendants,
    direction,
    htmlProps,
  }
}

export type UseTabsReturn = Omit<
  ReturnType<typeof useTabs>,
  "htmlProps" | "descendants"
>

export const [TabsProvider, useTabsContext] = createContext<UseTabsReturn>({
  name: "TabsContext",
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
})

type Child = React.ReactElement<any>

export interface UseTabListProps {
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
export function useTabList<P extends UseTabListProps>(props: P) {
  const { focusedIndex, orientation, direction } = useTabsContext()

  const descendants = useTabsDescendantsContext()

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const nextTab = () => {
        const next = descendants.nextEnabled(focusedIndex)
        if (next) focus(next.node)
      }
      const prevTab = () => {
        const prev = descendants.prevEnabled(focusedIndex)
        if (prev) focus(prev.node)
      }
      const firstTab = () => {
        const first = descendants.firstEnabled()
        if (first) focus(first.node)
      }
      const lastTab = () => {
        const last = descendants.lastEnabled()
        if (last) focus(last.node)
      }

      const isHorizontal = orientation === "horizontal"
      const isVertical = orientation === "vertical"

      const eventKey = normalizeEventKey(event)

      const ArrowStart = direction === "ltr" ? "ArrowLeft" : "ArrowRight"
      const ArrowEnd = direction === "ltr" ? "ArrowRight" : "ArrowLeft"

      const keyMap: EventKeyMap = {
        [ArrowStart]: () => isHorizontal && prevTab(),
        [ArrowEnd]: () => isHorizontal && nextTab(),
        ArrowDown: () => isVertical && nextTab(),
        ArrowUp: () => isVertical && prevTab(),
        Home: firstTab,
        End: lastTab,
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [descendants, focusedIndex, orientation, direction],
  )

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
  /**
   * If `true`, the `Tab` won't be toggleable
   */
  isDisabled?: boolean
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
export function useTab<P extends UseTabProps>(props: P) {
  const { isDisabled, isFocusable, ...htmlProps } = props

  const {
    setSelectedIndex,
    isManual,
    id,
    setFocusedIndex,
    selectedIndex,
  } = useTabsContext()

  const { index, register } = useTabsDescendant({
    disabled: isDisabled && !isFocusable,
  })

  const isSelected = index === selectedIndex

  const onClick = () => {
    setSelectedIndex(index)
  }

  const onFocus = () => {
    setFocusedIndex(index)
    const isDisabledButFocusable = isDisabled && isFocusable
    const shouldSelect = !isManual && !isDisabledButFocusable
    if (shouldSelect) {
      setSelectedIndex(index)
    }
  }

  const clickableProps = useClickable({
    ...htmlProps,
    ref: mergeRefs(register, props.ref),
    isDisabled,
    isFocusable,
    onClick: callAllHandlers(props.onClick, onClick),
  })

  const type: "button" | "submit" | "reset" = "button"

  return {
    ...clickableProps,
    id: makeTabId(id, index),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, index),
    onFocus: isDisabled ? undefined : callAllHandlers(props.onFocus, onFocus),
  }
}

export interface UseTabPanelsProps {
  children?: React.ReactNode
}

/**
 * Tabs hook for managing the visibility of multiple tab panels.
 *
 * Since only one panel can be show at a time, we use `cloneElement`
 * to inject `selected` panel to each TabPanel.
 *
 * It returns a cloned version of its children with
 * all functionality included.
 */
export function useTabPanels<P extends UseTabPanelsProps>(props: P) {
  const context = useTabsContext()

  const { id, selectedIndex } = context

  const validChildren = getValidChildren(props.children)

  const children = validChildren.map((child, index) =>
    React.cloneElement(child as Child, {
      isSelected: index === selectedIndex,
      id: makeTabPanelId(id, index),
      // Refers to the associated tab element, and also provides an accessible name to the tab panel.
      "aria-labelledby": makeTabId(id, index),
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
  const { isSelected, id, children, ...htmlProps } = props
  const { isLazy, lazyBehavior } = useTabsContext()

  const hasBeenSelected = React.useRef(false)
  if (isSelected) {
    hasBeenSelected.current = true
  }

  const shouldRenderChildren = determineLazyBehavior({
    hasBeenSelected: hasBeenSelected.current,
    isSelected,
    isLazy,
    lazyBehavior,
  })

  return {
    // Puts the tabpanel in the page `Tab` sequence.
    tabIndex: 0,
    ...htmlProps,
    children: shouldRenderChildren ? children : null,
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
export function useTabIndicator(): React.CSSProperties {
  const context = useTabsContext()
  const descendants = useTabsDescendantsContext()

  const { selectedIndex, orientation } = context

  const isHorizontal = orientation === "horizontal"
  const isVertical = orientation === "vertical"

  // Get the clientRect of the selected tab
  const [rect, setRect] = React.useState(() => {
    if (isHorizontal) return { left: 0, width: 0 }
    if (isVertical) return { top: 0, height: 0 }
    return undefined
  })

  const [hasMeasured, setHasMeasured] = React.useState(false)

  // Update the selected tab rect when the selectedIndex changes
  useSafeLayoutEffect(() => {
    if (isUndefined(selectedIndex)) return undefined

    const tab = descendants.item(selectedIndex)
    if (isUndefined(tab)) return undefined

    // Horizontal Tab: Calculate width and left distance
    if (isHorizontal) {
      setRect({ left: tab.node.offsetLeft, width: tab.node.offsetWidth })
    }

    // Vertical Tab: Calculate height and top distance
    if (isVertical) {
      setRect({ top: tab.node.offsetTop, height: tab.node.offsetHeight })
    }

    // Prevent unwanted transition from 0 to measured rect
    // by setting the measured state in the next tick
    const id = requestAnimationFrame(() => {
      setHasMeasured(true)
    })

    return () => {
      if (id) {
        cancelAnimationFrame(id)
      }
    }
  }, [selectedIndex, isHorizontal, isVertical, descendants])

  return {
    position: "absolute",
    transitionProperty: "left, right, top, bottom",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  }
}

function makeTabId(id: string, index: number) {
  return `${id}--tab-${index}`
}

function makeTabPanelId(id: string, index: number) {
  return `${id}--tabpanel-${index}`
}
