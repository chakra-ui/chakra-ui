import { useControllableState } from "@chakra-ui/hooks/use-controllable-state"
import { LazyMode } from "@chakra-ui/utils/lazy"
import { useEffect, useId, useState } from "react"
import { useTabsDescendants } from "./tabs-context"

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
    defaultIndex,
    onChange,
    index,
    isManual,
    isLazy,
    lazyBehavior = "unmount",
    orientation = "horizontal",
    direction = "ltr",
  } = props

  const [focusedIndex, setFocusedIndex] = useState(defaultIndex ?? 0)

  const [selectedIndex, setSelectedIndex] = useControllableState({
    defaultValue: defaultIndex ?? 0,
    value: index,
    onChange,
  })

  /**
   * Sync focused `index` with controlled `selectedIndex` (which is the `props.index`)
   */
  useEffect(() => {
    if (index != null) {
      setFocusedIndex(index)
    }
  }, [index])

  const descendants = useTabsDescendants()

  const uuid = useId()
  const uid = props.id ?? uuid
  const id = `tabs-${uid}`

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
  }
}

export type UseTabsReturn = Omit<
  ReturnType<typeof useTabs>,
  "htmlProps" | "descendants"
>

export function makeTabId(id: string, index: number) {
  return `${id}--tab-${index}`
}

export function makeTabPanelId(id: string, index: number) {
  return `${id}--tabpanel-${index}`
}
