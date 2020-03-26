import { PropsOf, chakra, useComponentDefaults } from "@chakra-ui/system"
import * as React from "react"
import {
  useTab,
  useTabIndicator,
  useTabList,
  useTabPanel,
  useTabPanels,
  TabHookProps,
  TabListHookProps,
  TabsProvider,
  TabsHookProps,
} from "./Tabs.hook"
import { createContext } from "@chakra-ui/utils"

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

export type TabsProps = TabsHookProps & ThemingProps

const [ThemingProvider, useThemingContext] = createContext<ThemingProps>()

export function Tabs(props: TabsProps) {
  // get the default theming props for variant and size
  const defaults = useComponentDefaults("Tabs")

  const {
    children,
    variant = defaults?.variant,
    size = defaults?.size,
    colorScheme,
    isFitted,
    ...rest
  } = props

  return (
    <TabsProvider {...rest}>
      <ThemingProvider value={{ variant, size, colorScheme, isFitted }}>
        {children}
      </ThemingProvider>
    </TabsProvider>
  )
}

const StyledTab = chakra("button", {
  themeKey: "Tabs.Tab",
  baseStyle: {
    outline: "0",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  },
})

export type TabProps = TabHookProps & PropsOf<typeof StyledTab>

export const Tab = React.forwardRef((props: TabProps, ref: React.Ref<any>) => {
  const tabProps = useTab({ ...props, ref })
  const { isFitted, ...themingProps } = useThemingContext()
  return (
    <StyledTab
      flex={isFitted ? 1 : undefined}
      {...themingProps}
      {...tabProps}
    />
  )
})

const StyledTabList = chakra("div", { themeKey: "Tabs.TabList" })

export type TabListProps = TabListHookProps & PropsOf<typeof StyledTabList>

export const TabList = React.forwardRef(
  (props: TabListProps, ref: React.Ref<any>) => {
    const tablistProps = useTabList({ ...props, ref })
    const themingProps = useThemingContext()
    return <StyledTabList {...themingProps} {...tablistProps} />
  },
)

const StyledTabPanel = chakra("div", {
  themeKey: "Tabs.TabPanel",
  baseStyle: {
    padding: 4,
  },
})

export type TabPanelProps = PropsOf<typeof StyledTabPanel>

export const TabPanel = React.forwardRef(
  (props: TabPanelProps, ref: React.Ref<any>) => {
    const tabpanelProps = useTabPanel({ ...props, ref })
    return <StyledTabPanel {...tabpanelProps} />
  },
)

export type TabPanelsProps = PropsOf<typeof chakra.div>

export function TabPanels(props: TabPanelsProps) {
  const panelsProp = useTabPanels(props)
  return <chakra.div {...panelsProp} />
}

export type TabIndicatorProps = PropsOf<typeof chakra.div>

export function TabIndicator(props: TabIndicatorProps) {
  const styles = useTabIndicator()
  return <chakra.div {...props} style={{ ...props.style, ...styles }} />
}
