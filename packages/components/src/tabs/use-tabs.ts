import { useControllableState } from "@chakra-ui/hooks/use-controllable-state"
import { mergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { useSafeLayoutEffect } from "@chakra-ui/hooks/use-safe-layout-effect"
import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { getValidChildren } from "@chakra-ui/utils/children"
import { createContext } from "@chakra-ui/utils/context"
import { lazyDisclosure, LazyMode } from "@chakra-ui/utils/lazy"
import { createElement, useCallback, useId, useRef, useState } from "react"
import { nextById, prevById, queryAll } from "@zag-js/dom-utils"
import { useClickable, UseClickableProps } from "../clickable"

/* -------------------------------------------------------------------------------------------------
 * useTabs - The root react hook that manages all tab items
 * -----------------------------------------------------------------------------------------------*/

export interface UseTabsProps {
  /**
   * The orientation of the tab list.
   * @default "horizontal"
   */
  orientation?: "vertical" | "horizontal"
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   *
   * @default false
   */
  isManual?: boolean
  /**
   * Callback when the tab (controlled or un-controlled) changes.
   */
  onChange?: (index: string) => void
  /**
   * The id of the selected tab (in controlled mode)
   */
  value?: string
  /**
   * The initially selected tab (in uncontrolled mode)
   */
  defaultValue?: string
  /**
   * The id of the tab
   */
  id?: string
  /**
   * Performance 🚀:
   * If `true`, rendering of the tab panel's will be deferred until it is selected.
   * @default false
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
  lazyBehavior?: LazyMode
  /**
   * The writing mode direction.
   *
   * - When in RTL, the left and right navigation is flipped
   * @default "ltr"
   */
  direction?: "rtl" | "ltr"
}

/**
 * Tabs hook that provides all the states, and accessibility
 * helpers to keep all things working properly.
 *
 * Its returned object will be passed unto a Context Provider
 * so all child components can read from it.
 * There is no document link yet
 * @see Docs https://chakra-ui.com/docs/components/useTabs
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export function useTabs(props: UseTabsProps) {
  const {
    defaultValue,
    onChange,
    value,
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
  const [focusedValue, setFocusedValue] = useState(defaultValue ?? "")

  const [selectedValue, setSelectedValue] = useControllableState({
    defaultValue,
    value,
    onChange,
  })

  /**
   * Generate a unique id or use user-provided id for the tabs widget
   */
  const uuid = useId()
  const uid = props.id ?? uuid
  const id = `tabs-${uid}`

  return {
    id,
    focusedValue,
    setFocusedValue,
    selectedValue,
    setSelectedValue,
    isManual,
    isLazy,
    lazyBehavior,
    orientation,
    direction,
    htmlProps,
  }
}

export type UseTabsReturn = Omit<ReturnType<typeof useTabs>, "htmlProps">

export const [TabsProvider, useTabsContext] = createContext<UseTabsReturn>({
  name: "TabsContext",
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
})

export interface UseTabListProps {
  children?: React.ReactNode
  onKeyDown?: React.KeyboardEventHandler
  ref: React.ForwardedRef<HTMLDivElement>
}

/**
 * Tabs hook to manage multiple tab buttons,
 * and ensures only one tab is selected per time.
 *
 * @param props props object for the tablist
 */
export function useTabList<P extends UseTabListProps>(props: P) {
  const { id, focusedValue, orientation, direction } = useTabsContext()

  const tabListRef = useRef<HTMLDivElement>(null)

  const allTabNodes = useCallback(() => {
    return queryAll(tabListRef.current, `[role='tab']:not([disabled])`)
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const nextTab = () => {
        const next = nextById(allTabNodes(), makeTabId(id, focusedValue), true)
        if (next) next?.focus()
      }
      const prevTab = () => {
        const prev = prevById(allTabNodes(), makeTabId(id, focusedValue), true)
        if (prev) prev?.focus()
      }
      const firstTab = () => {
        const first = tabListRef.current?.querySelector<HTMLDivElement>(
          `[role=tab]:not([disabled]):first-of-type`,
        )
        if (first) first.focus()
      }
      const lastTab = () => {
        const last = tabListRef.current?.querySelector<HTMLDivElement>(
          `[role=tab]:not([disabled]):last-of-type`,
        )
        if (last) last.focus()
      }

      const isHorizontal = orientation === "horizontal"
      const isVertical = orientation === "vertical"

      const eventKey = event.key

      const ArrowStart = direction === "ltr" ? "ArrowLeft" : "ArrowRight"
      const ArrowEnd = direction === "ltr" ? "ArrowRight" : "ArrowLeft"

      const keyMap: Record<string, React.KeyboardEventHandler> = {
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
    [allTabNodes, focusedValue, id, orientation, direction],
  )

  return {
    ...props,
    ref: mergeRefs(props.ref, tabListRef),
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
  }
}

export type UseTabListReturn = ReturnType<typeof useTabList>

export interface UseTabOptions {
  /**
   * The value of the tab
   */
  value: string
  /**
   * If `true`, the `Tab` won't be toggleable
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true` and `isDisabled`, the `Tab` will be focusable but not interactive.
   * @default false
   */
  isFocusable?: boolean
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
  const { isDisabled, isFocusable, value, ref, ...htmlProps } = props

  const { setSelectedValue, isManual, id, setFocusedValue, selectedValue } =
    useTabsContext()

  const isSelected = value === selectedValue

  const onClick = () => {
    setSelectedValue(value)
  }

  const onFocus = () => {
    setFocusedValue(value)
    const isDisabledButFocusable = isDisabled && isFocusable
    const shouldSelect = !isManual && !isDisabledButFocusable
    if (shouldSelect) {
      setSelectedValue(value)
    }
  }

  const clickableProps = useClickable({
    ...htmlProps,
    ref,
    isDisabled,
    isFocusable,
    onClick: callAllHandlers(props.onClick, onClick),
  })

  const type: "button" | "submit" | "reset" = "button"

  return {
    ...clickableProps,
    id: makeTabId(id, value),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, value),
    onFocus: isDisabled ? undefined : callAllHandlers(props.onFocus, onFocus),
  }
}

export interface UseTabPanelsProps {
  children?: React.ReactNode
}

const [TabPanelProvider, useTabPanelContext] = createContext<{
  isSelected: boolean
  id: string
  tabId: string
  selectedValue: string
}>({})

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

  const { id, selectedValue } = context

  const validChildren = getValidChildren(props.children)

  const children = validChildren.map((child, index) =>
    createElement(
      TabPanelProvider,
      {
        key: index,
        value: {
          isSelected: child.props.value === selectedValue,
          id: makeTabPanelId(id, child.props.value),
          tabId: makeTabId(id, child.props.value),
          selectedValue,
        },
      },
      child,
    ),
  )

  return { ...props, children }
}

/**
 * Tabs hook for managing the visible/hidden states
 * of the tab panel.
 *
 * @param props props object for the tab panel
 */
export function useTabPanel(props: Record<string, any>) {
  const { children, value, ...htmlProps } = props
  const { isLazy, lazyBehavior } = useTabsContext()
  const { isSelected, id, tabId } = useTabPanelContext()

  const hasBeenSelected = useRef(false)
  if (isSelected) {
    hasBeenSelected.current = true
  }

  const shouldRenderChildren = lazyDisclosure({
    wasSelected: hasBeenSelected.current,
    isSelected,
    enabled: isLazy,
    mode: lazyBehavior,
  })

  return {
    // Puts the tabpanel in the page `Tab` sequence.
    tabIndex: 0,
    ...htmlProps,
    children: shouldRenderChildren ? children : null,
    role: "tabpanel",
    "aria-labelledby": tabId,
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
  const { selectedValue, orientation, id } = context

  const isHorizontal = orientation === "horizontal"
  const isVertical = orientation === "vertical"

  // Get the clientRect of the selected tab
  const [rect, setRect] = useState(() => {
    if (isHorizontal) return { left: 0, width: 0 }
    if (isVertical) return { top: 0, height: 0 }
    return undefined
  })

  const [hasMeasured, setHasMeasured] = useState(false)

  // Update the selected tab rect when the selectedIndex changes
  useSafeLayoutEffect(() => {
    if (selectedValue == null) return

    const tab = document.querySelector<HTMLElement>(
      `#${makeTabId(id, selectedValue)}`,
    )
    if (tab == null) return

    // Horizontal Tab: Calculate width and left distance
    if (isHorizontal) {
      setRect({ left: tab.offsetLeft, width: tab.offsetWidth })
    }

    // Vertical Tab: Calculate height and top distance
    if (isVertical) {
      setRect({ top: tab.offsetTop, height: tab.offsetHeight })
    }

    // Prevent unwanted transition from 0 to measured rect
    // by setting the measured state in the next tick
    const aid = requestAnimationFrame(() => {
      setHasMeasured(true)
    })

    return () => {
      if (aid) {
        cancelAnimationFrame(aid)
      }
    }
  }, [id, selectedValue, isHorizontal, isVertical])

  return {
    position: "absolute",
    transitionProperty: "left, right, top, bottom, height, width",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  }
}

function makeTabId(id: string, value: string) {
  return `${id}--tab-${value}`
}

function makeTabPanelId(id: string, value: string) {
  return `${id}--tabpanel-${value}`
}
