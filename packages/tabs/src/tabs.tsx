import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, omit, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  TabsDescendantsProvider,
  TabsProvider,
  useTab,
  useTabIndicator,
  useTabList,
  UseTabListProps,
  UseTabOptions,
  useTabPanel,
  useTabPanels,
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

export interface TabsProps
  extends UseTabsProps,
    ThemingProps<"Tabs">,
    Omit<HTMLChakraProps<"div">, "onChange">,
    TabsOptions {
  children: React.ReactNode
}

/**
 * Tabs
 *
 * Provides context and logic for all tabs components.
 */
export const Tabs = forwardRef<TabsProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Tabs", props)
  const { children, className, ...rest } = omitThemingProps(props)

  const { htmlProps, descendants, ...ctx } = useTabs(rest)
  const context = React.useMemo(() => ctx, [ctx])

  const rootProps = omit(htmlProps as any, ["isFitted"])

  return (
    <TabsDescendantsProvider value={descendants}>
      <TabsProvider value={context}>
        <StylesProvider value={styles}>
          <chakra.div
            className={cx("chakra-tabs", className)}
            ref={ref}
            {...rootProps}
            __css={styles.root}
          >
            {children}
          </chakra.div>
        </StylesProvider>
      </TabsProvider>
    </TabsDescendantsProvider>
  )
})

if (__DEV__) {
  Tabs.displayName = "Tabs"
}

export interface TabProps extends UseTabOptions, HTMLChakraProps<"button"> {}

/**
 * Tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab = forwardRef<TabProps, "button">((props, ref) => {
  const styles = useStyles()
  const tabProps = useTab({ ...props, ref })

  const tabStyles: SystemStyleObject = {
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...styles.tab,
  }

  return (
    <chakra.button
      {...tabProps}
      className={cx("chakra-tabs__tab", props.className)}
      __css={tabStyles}
    />
  )
})

if (__DEV__) {
  Tab.displayName = "Tab"
}

export interface TabListProps
  extends UseTabListProps,
    Omit<HTMLChakraProps<"div">, "onKeyDown" | "ref"> {}

/**
 * TabList is used to manage a list of tab buttons. It renders a `div` by default,
 * and is responsible the keyboard interaction between tabs.
 */
export const TabList = forwardRef<TabListProps, "div">((props, ref) => {
  const tablistProps = useTabList({ ...props, ref })

  const styles = useStyles()

  const tablistStyles: SystemStyleObject = {
    display: "flex",
    ...styles.tablist,
  }

  return (
    <chakra.div
      {...tablistProps}
      className={cx("chakra-tabs__tablist", props.className)}
      __css={tablistStyles}
    />
  )
})

if (__DEV__) {
  TabList.displayName = "TabList"
}

export interface TabPanelProps extends HTMLChakraProps<"div"> {}

/**
 * TabPanel
 * Used to render the content for a specific tab.
 */
export const TabPanel = forwardRef<TabPanelProps, "div">((props, ref) => {
  const panelProps = useTabPanel({ ...props, ref })
  const styles = useStyles()

  return (
    <chakra.div
      outline="0"
      {...panelProps}
      className={cx("chakra-tabs__tab-panel", props.className)}
      __css={styles.tabpanel}
    />
  )
})

if (__DEV__) {
  TabPanel.displayName = "TabPanel"
}

export interface TabPanelsProps extends HTMLChakraProps<"div"> {}

/**
 * TabPanel
 *
 * Used to manage the rendering of multiple tab panels. It uses
 * `cloneElement` to hide/show tab panels.
 *
 * It renders a `div` by default.
 */
export const TabPanels = forwardRef<TabPanelsProps, "div">((props, ref) => {
  const panelsProps = useTabPanels(props)
  const styles = useStyles()

  return (
    <chakra.div
      {...panelsProps}
      width="100%"
      ref={ref}
      className={cx("chakra-tabs__tab-panels", props.className)}
      __css={styles.tabpanels}
    />
  )
})

if (__DEV__) {
  TabPanels.displayName = "TabPanels"
}

export interface TabIndicatorProps extends HTMLChakraProps<"div"> {}

/**
 * TabIndicator
 *
 * Used to render an active tab indicator that animates between
 * selected tabs.
 */
export const TabIndicator = forwardRef<TabIndicatorProps, "div">(
  (props, ref) => {
    const indicatorStyle = useTabIndicator()
    const style = {
      ...props.style,
      ...indicatorStyle,
    }

    const styles = useStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-tabs__tab-indicator", props.className)}
        style={style}
        __css={styles.indicator}
      />
    )
  },
)

if (__DEV__) {
  TabIndicator.displayName = "TabIndicator"
}
