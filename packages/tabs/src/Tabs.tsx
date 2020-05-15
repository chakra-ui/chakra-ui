import {
  chakra,
  PropsOf,
  useThemeDefaultProps,
  ThemingProps,
} from "@chakra-ui/system"
import { createContext, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import { forwardRef, useMemo } from "react"
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

const [TabsCtxProvider, useTabsContext] = createContext<UseTabsReturn>({
  strict: true,
  name: "TabsContext",
  errorMessage:
    "Chakra UI: Tabs components can only be used within <Tabs> component",
})

type ThemingContext = ThemingProps & {
  /**
   * If `true`, tabs will stretch to width of the tablist.
   */
  isFitted?: boolean
}

type DivProps = Omit<PropsOf<typeof chakra.div>, "onChange">

export type TabsProps = UseTabsProps &
  DivProps & {
    children: React.ReactNode
    /**
     * If `true`, tabs will stretch to width of the tablist.
     */
    isFitted?: boolean
  }

const [ThemingCtxProvider, useThemingContext] = createContext<ThemingContext>()

/**
 * Tabs
 *
 * Provides context and logic for all tabs components. It doesn't render
 * any DOM node.
 */
export const Tabs = forwardRef((props: TabsProps, ref: React.Ref<any>) => {
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
    ...rest
  } = props

  const { htmlProps, ...context } = useTabs(rest)
  const tabs = useMemo(() => context, [context])

  const _className = cx("chakra-tabs", className)

  return (
    <TabsCtxProvider value={tabs}>
      <ThemingCtxProvider value={{ variant, size, colorScheme, isFitted }}>
        <chakra.div className={_className} ref={ref} {...htmlProps}>
          {children}
        </chakra.div>
      </ThemingCtxProvider>
    </TabsCtxProvider>
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
 * The tab button uses to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab = forwardRef((props: TabProps, ref: React.Ref<any>) => {
  const { className, ...htmlProps } = props
  const { isFitted, ...theming } = useThemingContext()

  const context = useTabsContext()
  const tabProps = useTab({ ...htmlProps, ref, context })

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
})

export type TabListProps = Omit<UseTabListProps, "context"> &
  PropsOf<typeof StyledTabList>

/**
 * TabList
 *
 * Used to manage a list of tab buttons. It renders a `div` by default,
 * and is responsible the keyboard interaction between tabs.
 */
export const TabList = forwardRef(
  (props: TabListProps, ref: React.Ref<any>) => {
    const { className, ...htmlProps } = props
    const { isFitted, ...theming } = useThemingContext()

    const context = useTabsContext()
    const tablistProps = useTabList({ ...htmlProps, ref, context })

    const _className = cx("chakra-tabs__tablist", className)

    return (
      <StyledTabList className={_className} {...theming} {...tablistProps} />
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
export const TabPanel = React.forwardRef(
  (props: TabPanelProps, ref: React.Ref<any>) => {
    const { className, ...htmlProps } = props
    const panelProps = useTabPanel({ ...htmlProps, ref })
    const _className = cx("chakra-tabs__tab-panel", className)
    return <StyledTabPanel className={_className} {...panelProps} />
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
export const TabPanels = forwardRef(
  (props: TabPanelsProps, ref: React.Ref<any>) => {
    const { className, ...htmlProps } = props
    const context = useTabsContext()
    const panelsProp = useTabPanels({ ...htmlProps, context })

    const _className = cx("chakra-tabs__tab-panels", className)
    return <chakra.div ref={ref} className={_className} {...panelsProp} />
  },
)

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
export const TabIndicator = forwardRef(
  (props: TabIndicatorProps, ref: React.Ref<any>) => {
    const { className, style, ...htmlProps } = props

    const context = useTabsContext()
    const styles = useTabIndicator(context)

    const _className = cx("chakra-tabs__tab-indicator", className)
    const _style = { ...style, ...styles }

    return (
      <chakra.div
        ref={ref}
        className={_className}
        style={_style}
        {...htmlProps}
      />
    )
  },
)

if (__DEV__) {
  TabIndicator.displayName = "TabIndicator"
}
