import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
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

export type TabsProps = UseTabsProps &
  ThemingProps &
  Omit<PropsOf<typeof chakra.div>, "onChange" | "children"> &
  TabsOptions & {
    children: React.ReactNode
  }

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
  const styles = useStyleConfig("Tabs", props)
  const { children, className, ...rest } = omitThemingProps(props)

  const { htmlProps, ...tabsContext } = useTabs(rest)
  const ctx = React.useMemo(() => tabsContext, [tabsContext])

  const _className = cx("chakra-tabs", className)

  return (
    <TabsContextProvider value={ctx}>
      <StylesProvider value={styles}>
        <chakra.div className={_className} ref={ref} {...htmlProps}>
          {children}
        </chakra.div>
      </StylesProvider>
    </TabsContextProvider>
  )
})

if (__DEV__) {
  Tabs.displayName = "Tabs"
}

export type TabProps = UseTabProps & PropsOf<typeof chakra.button>

/**
 * Tabs
 *
 * The tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab = forwardRef<TabProps>(function Tab(props, ref) {
  const { className, ...rest } = props
  const styles = useStyles()
  const tab = useTab({ ...rest, ref })
  const _className = cx("chakra-tabs__tab", className)

  return (
    <chakra.button
      className={_className}
      __css={{
        outline: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...styles.tab,
      }}
      {...tab}
    />
  )
})

if (__DEV__) {
  Tab.displayName = "Tab"
}

export type TabListProps = Omit<UseTabListProps, "context"> &
  PropsOf<typeof chakra.div>

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
  const tablist = useTabList({ ...rest, ref })
  const styles = useStyles()

  const _className = cx("chakra-tabs__tablist", className)

  return (
    <chakra.div
      __css={{
        display: "flex",
        ...styles.tablist,
      }}
      className={_className}
      {...tablist}
    />
  )
})

if (__DEV__) {
  TabList.displayName = "TabList"
}

export type TabPanelProps = PropsOf<typeof chakra.div>

/**
 * TabPanel
 * Used to render the content for a specific tab.
 */
export const TabPanel = React.forwardRef(function TabPanel(
  props: TabPanelProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const panel = useTabPanel({ ...rest, ref })
  const _className = cx("chakra-tabs__tab-panel", className)
  const styles = useStyles()
  return (
    <chakra.div className={_className} {...panel} __css={styles.tabpanel} />
  )
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
  const indicatorStyle = useTabIndicator()
  const _className = cx("chakra-tabs__tab-indicator", className)
  const _style = { ...style, ...indicatorStyle }
  const styles = useStyles()

  return (
    <chakra.div
      ref={ref}
      className={_className}
      style={_style}
      {...rest}
      __css={styles.indicator}
    />
  )
})

if (__DEV__) {
  TabIndicator.displayName = "TabIndicator"
}
