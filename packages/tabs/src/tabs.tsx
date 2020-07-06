import {
  chakra,
  PropsOf,
  forwardRef,
  ThemingProps,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { createContext, cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  TabsContextProvider,
  useTab,
  useTabIndicator,
  useTabList,
  UseTabListProps,
  useTabPanel,
  useTabPanels,
  UseTabProps,
  useTabs,
  UseTabsProps,
} from "./use-tabs"

interface TabsOptions {
  /**
   * If `true`, tabs will stretch to width of the tablist.
   */
  isFitted?: boolean
  /**
   * The alignment of the tabs
   */
  align?: "start" | "end" | "center"
}

interface ThemingContext extends ThemingProps, TabsOptions {}

type DivProps = Omit<PropsOf<typeof chakra.div>, "onChange">

export type TabsProps = UseTabsProps &
  DivProps &
  TabsOptions & {
    children: React.ReactNode
  }

const [ThemingContextProvider, useThemingContext] = createContext<
  ThemingContext
>({
  name: "TabsThemingContext",
})

export { useThemingContext as useTabsThemingContext }

/**
 * Tabs
 *
 * Provides context and logic for all tabs components. It doesn't render
 * any DOM node.
 */
export const Tabs = React.forwardRef(function Tabs(
  props: TabsProps,
  ref: React.Ref<any>,
) {
  /**
   * Gets the default props for `variant` and `size` from `theme.components.Tabs`
   */
  const defaults = useThemeDefaultProps("Tabs")

  const {
    children,
    variant = defaults?.variant,
    size = defaults?.size,
    colorScheme = defaults?.colorScheme,
    isFitted,
    className,
    align = "start",
    ...rest
  } = props

  const { htmlProps, ...context } = useTabs(rest)
  const tabs = React.useMemo(() => context, [context])

  const _className = cx("chakra-tabs", className)

  return (
    <TabsContextProvider value={tabs}>
      <ThemingContextProvider value={{ variant, size, colorScheme, isFitted }}>
        <chakra.div className={_className} ref={ref} {...htmlProps}>
          {children}
        </chakra.div>
      </ThemingContextProvider>
    </TabsContextProvider>
  )
})

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
 * The tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab = forwardRef<TabProps>(function Tab(props, ref) {
  const { className, ...rest } = props
  const { isFitted, ...theming } = useThemingContext()
  const tabProps = useTab({ ...rest, ref })

  const _className = cx("chakra-tabs__tab", className)

  return (
    <StyledTab
      className={_className}
      flex={isFitted ? 1 : undefined}
      {...theming}
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
const StyledTabList = chakra("div", {
  themeKey: "Tabs.TabList",
  baseStyle: {
    display: "flex",
  },
})

export type TabListProps = Omit<UseTabListProps, "context"> &
  PropsOf<typeof StyledTabList>

/**
 * TabList
 *
 * Used to manage a list of tab buttons. It renders a `div` by default,
 * and is responsible the keyboard interaction between tabs.
 */
export const TabList = React.forwardRef(function TabList(
  props: TabListProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const { isFitted, align = "start", ...theming } = useThemingContext()
  const tablistProps = useTabList({ ...rest, ref })

  const _className = cx("chakra-tabs__tablist", className)

  const alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start",
  }

  return (
    <StyledTabList
      justifyContent={alignments[align]}
      className={_className}
      {...theming}
      {...tablistProps}
    />
  )
})

if (__DEV__) {
  TabList.displayName = "TabList"
}

/**
 * TabPanel - Theming
 *
 * To change the styles of tab panels globally, update the styles in
 * `theme.components.Tabs` under the `TabPanel` key
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
export const TabPanel = React.forwardRef(function TabPanel(
  props: TabPanelProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const panelProps = useTabPanel({ ...rest, ref })
  const _className = cx("chakra-tabs__tab-panel", className)
  return <StyledTabPanel className={_className} {...panelProps} />
})

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
export const TabPanels = React.forwardRef(function TabPanels(
  props: TabPanelsProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const panelsProp = useTabPanels(rest)

  const _className = cx("chakra-tabs__tab-panels", className)
  return <chakra.div ref={ref} className={_className} {...panelsProp} />
})

if (__DEV__) {
  TabPanels.displayName = "TabPanels"
}

/**
 * TabIndicator - Theming
 *
 * To change the styles of tab indicator globally, update the styles in
 * `theme.components.Tabs` under the `TabIndicator` key
 */
const StyledTabIndicator = chakra("div", {
  themeKey: "Tabs.TabIndicator",
})

export type TabIndicatorProps = PropsOf<typeof chakra.div>

/**
 * TabIndicator
 *
 * Used to render an active tab indicator that animates between
 * selected tabs.
 */
export const TabIndicator = React.forwardRef(function TabIndicator(
  props: TabIndicatorProps,
  ref: React.Ref<any>,
) {
  const { className, style, ...rest } = props

  const styles = useTabIndicator()

  const _className = cx("chakra-tabs__tab-indicator", className)
  const _style = { ...style, ...styles }

  return (
    <StyledTabIndicator
      ref={ref}
      className={_className}
      style={_style}
      {...rest}
    />
  )
})

if (__DEV__) {
  TabIndicator.displayName = "TabIndicator"
}
