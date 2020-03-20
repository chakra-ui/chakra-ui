import * as React from "react"
import chakra from "../chakra/chakra"
import { syncChild, syncParent, ThemingProps } from "../connect-theming"
import createChakra from "./create-chakra"
import { useComponentStyle } from "./use-component-style"

export default {
  title: "create Chakra",
}

const Button = createChakra("button", {
  themeKey: "Button",
  attrs: { type: "button" },
})

Button.displayName = "Button"

Button.defaultProps = {
  variantSize: "md",
  variant: "solid",
  variantColor: "green",
}

export const ButtonBasic = () => (
  <Button marginTop="40px">This is my button</Button>
)

export const ButtonTheming = () => (
  <Button
    bg="transparent"
    border="0"
    variantSize="sm"
    variant="link"
    variantColor="blue"
  >
    This is my button
  </Button>
)

////////////////////////////////////////////////////////////////////

const Alert = createChakra("div", {
  themeKey: "Alert",
})

export const Alert_ = () => (
  <Alert variant="tradeling" variantColor="green" role="alert">
    Welcome to alert
  </Alert>
)

////////////////////////////////////////////////////////////////////

const MenuList = createChakra("div", {
  themeKey: "Menu.MenuList",
})

const MenuItem = createChakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: {
    padding: 3,
    textAlign: "left",
  },
})

export const SubcomponentsMenulist = () => (
  <MenuList>
    <MenuItem>Menu 1</MenuItem>
    <MenuItem>Menu 2</MenuItem>
    <MenuItem>Menu 3</MenuItem>
  </MenuList>
)

////////////////////////////////////////////////////////////////////////

const TabList = createChakra("div", {
  themeKey: "Tabs.TabList",
  baseStyle: {
    display: "flex",
  },
})

TabList.displayName = "TabList"

TabList.defaultProps = {
  variant: "line",
}

const Tab = createChakra("div", {
  themeKey: "Tabs.Tab",
})

Tab.displayName = "Tab"

Tab.defaultProps = {
  variant: "line",
  variantColor: "blue",
  variantSize: "md",
}

export const SubcomponentTabs = () => (
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab variantColor="orange" data-selected="">
      Tab 2
    </Tab>
  </TabList>
)

export const UseComponentStyle = () => {
  const style = useComponentStyle({
    themeKey: "Input",
    // focusBorderColor: "gray.500",
    // errorBorderColor: "pink.500",
  })
  return (
    <chakra.pre fontFamily="mono" fontSize="xs">
      {JSON.stringify(style, null, 4)}
    </chakra.pre>
  )
}

export const BindTheming = () => {
  const TabList = createChakra("div", {
    themeKey: "Tabs.TabList",
    baseStyle: {
      display: "flex",
    },
  })

  const Tab = createChakra("button", {
    themeKey: "Tabs.Tab",
  })

  const ThemingContext = React.createContext<ThemingProps>({})
  const BindTabList = syncParent(TabList)(ThemingContext)
  const BindTab = syncChild(Tab)(ThemingContext)

  return (
    <BindTabList variant="line" variantColor="red" variantSize="md">
      <BindTab aria-selected="true">Tab 1</BindTab>
      <BindTab>Tab 2</BindTab>
      <BindTab>Tab 3</BindTab>
    </BindTabList>
  )
}
