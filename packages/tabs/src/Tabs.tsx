import {
  PropsOf,
  createChakra,
  chakra,
  useComponentDefaults,
} from "@chakra-ui/system"
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
  variant?: string
  variantSize?: string
  variantColor?: string
  isFitted?: string
}

export type TabsProps = TabsHookProps & ThemingProps

const [ThemingProvider, useThemingContext] = createContext<ThemingProps>()

export function Tabs(props: TabsProps) {
  // get the default theming props for variant and variantSize
  const defaults = useComponentDefaults("Tabs") as any

  const {
    children,
    variant = defaults.variant,
    variantSize = defaults.variantSize,
    variantColor,
    isFitted,
    ...rest
  } = props

  return (
    <TabsProvider {...rest}>
      <ThemingProvider value={{ variant, variantSize, variantColor, isFitted }}>
        {children}
      </ThemingProvider>
    </TabsProvider>
  )
}

const StyledTab = createChakra("button", {
  themeKey: "Tabs.Tab",
  baseStyle: {
    outline: "0",
  },
})

export type TabProps = TabHookProps & PropsOf<typeof StyledTab>

export const Tab = React.forwardRef((props: TabProps, ref: React.Ref<any>) => {
  const tabProps = useTab({ ...props, ref })
  const themingProps = useThemingContext()
  return <StyledTab {...themingProps} {...tabProps} />
})

const StyledTabList = createChakra("div", { themeKey: "Tabs.TabList" })

export type TabListProps = TabListHookProps & PropsOf<typeof StyledTabList>

export const TabList = React.forwardRef(
  (props: TabListProps, ref: React.Ref<any>) => {
    const tablistProps = useTabList({ ...props, ref })
    const themingProps = useThemingContext()
    return <StyledTabList {...themingProps} {...tablistProps} />
  },
)

const StyledTabPanel = createChakra("div", {
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
