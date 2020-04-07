import { chakra, PropsOf, useThemeDefaultProps } from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  useTab,
  useTabIndicator,
  useTabList,
  UseTabListProps,
  useTabPanel,
  useTabPanels,
  UseTabProps,
  useTabs,
  UseTabsProps,
  UseTabsReturn,
} from "./Tabs.hook"

const [TabsContextProvider, useTabsContext] = createContext<UseTabsReturn>({
  strict: true,
  name: "TabsContext",
  errorMessage:
    "Chakra UI: useTabsContext can only be used within TabsContextProvider",
})

type ThemingProps = {
  /**
   * The style of the tabs to use
   */
  variant?: string
  /**
   * The size of the tab (affects the font-size and padding).
   */
  size?: string
  /**
   * The color scheme of the tabs
   */
  colorScheme?: string
  /**
   * If `true`, tabs will stretch to width of the tablist.
   */
  isFitted?: boolean
}

export type TabsProps = UseTabsProps &
  ThemingProps & { children?: React.ReactNode }

const [ThemingContextProvider, useThemingContext] = createContext<
  ThemingProps
>()

/**
 * Tabs
 *
 * Provides context and logic for all tabs components. It doesn't render
 * any DOM node.
 */
export function Tabs(props: TabsProps) {
  /**
   * get the default props for `variant` and `size` from `theme.components.Tabs`
   */
  const defaults = useThemeDefaultProps("Tabs")

  const {
    children,
    variant = defaults?.variant,
    size = defaults?.size,
    colorScheme,
    isFitted,
    ...hookProps
  } = props

  const context = useTabs(hookProps)
  const memoizedContext = React.useMemo(() => context, [context])

  return (
    <TabsContextProvider value={memoizedContext}>
      <ThemingContextProvider value={{ variant, size, colorScheme, isFitted }}>
        {children}
      </ThemingContextProvider>
    </TabsContextProvider>
  )
}

if (__DEV__) {
  Tabs.displayName = "Tabs"
}

/**
 * Tabs - Theming
 *
 * To change the styles of a tab buttons globally, update the styles in
 * `theme.components.Tabs` under the `Tab` key.
 */
const StyledTab = chakra("button", {
  themeKey: "Tabs.Tab",
  baseStyle: {
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})

export type TabProps = Omit<UseTabProps, "context"> & PropsOf<typeof StyledTab>

/**
 * Tabs
 *
 * The tab button uses to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab = React.forwardRef((props: TabProps, ref: React.Ref<any>) => {
  const context = useTabsContext()
  const tabProps = useTab({ ...props, ref, context })

  const { isFitted, ...themingProps } = useThemingContext()
  return (
    <StyledTab
      data-chakra-tab=""
      flex={isFitted ? 1 : undefined}
      {...themingProps}
      {...tabProps}
    />
  )
})

if (__DEV__) {
  Tab.displayName = "Tab"
}

/**
 * TabList - Theming
 *
 * To change the styles of a tablist globally, update the styles in
 * `theme.components.Tabs` under the `TabList` key
 */
const StyledTabList = chakra("div", { themeKey: "Tabs.TabList" })

export type TabListProps = Omit<UseTabListProps, "context"> &
  PropsOf<typeof StyledTabList>

/**
 * TabList
 *
 * Used to manage a list of tab buttons. It renders a `div` by default,
 * and is responsible the keyboard interaction between tabs.
 */
export const TabList = React.forwardRef(
  (props: TabListProps, ref: React.Ref<any>) => {
    const context = useTabsContext()

    const tablistProps = useTabList({ ...props, ref, context })
    const { isFitted, ...themingProps } = useThemingContext()

    return (
      <StyledTabList
        data-chakra-tablist=""
        {...themingProps}
        {...tablistProps}
      />
    )
  },
)

if (__DEV__) {
  TabList.displayName = "TabList"
}

/**
 * TabPanel - Theming
 *
 * To change the styles of tab panels globally, update the styles in
 * `theme.components.Tabs` under the `Tab.TabPanel` key
 */
const StyledTabPanel = chakra("div", {
  themeKey: "Tabs.TabPanel",
})

export type TabPanelProps = PropsOf<typeof StyledTabPanel>

/**
 * TabPanel
 *
 * Used to render the content for a specific tab.
 */
export const TabPanel = React.forwardRef(
  (props: TabPanelProps, ref: React.Ref<any>) => {
    const tabpanelProps = useTabPanel({ ...props, ref })
    return <StyledTabPanel data-chakra-tabpanel="" {...tabpanelProps} />
  },
)

if (__DEV__) {
  TabPanel.displayName = "TabPanel"
}

export type TabPanelsProps = PropsOf<typeof chakra.div>

/**
 * TabPanel
 *
 * Used to manage the rendering of multiple tab panels. It uses
 * `cloneElement` to hide/show tab panels.
 *
 * It renders a `div` by default.
 */
export function TabPanels(props: TabPanelsProps) {
  const context = useTabsContext()
  const panelsProp = useTabPanels({ ...props, context })
  return <chakra.div data-chakra-tabpanels="" {...panelsProp} />
}

if (__DEV__) {
  TabPanels.displayName = "TabPanels"
}

export type TabIndicatorProps = PropsOf<typeof chakra.div>

/**
 * TabIndicator
 *
 * Used to render an active tab indicator that animates between
 * selected tabs.
 */
export function TabIndicator(props: TabIndicatorProps) {
  const context = useTabsContext()
  const styles = useTabIndicator(context)
  return (
    <chakra.div
      data-chakra-tab-indicator=""
      {...props}
      style={{ ...props.style, ...styles }}
    />
  )
}

if (__DEV__) {
  TabIndicator.displayName = "TabIndicator"
}
