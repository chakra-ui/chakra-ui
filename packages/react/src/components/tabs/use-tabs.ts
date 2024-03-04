import { useControllableState } from "@chakra-ui/hooks"
import { LazyMode } from "@chakra-ui/utils"
import { useId, useRef, useState } from "react"

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

  const rootRef = useRef<HTMLDivElement>(null)

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
    rootRef,
  }
}

export type UseTabsReturn = Omit<ReturnType<typeof useTabs>, "htmlProps">

export function makeTabId(id: string, value: string) {
  return `${id}--tab-${value}`
}

export function makeTabPanelId(id: string, value: string) {
  return `${id}--tabpanel-${value}`
}
