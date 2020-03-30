/**@jsx jsx */
import { chakra, jsx } from "."

export default {
  title: "styled (advanced)",
}

/**
 * In Chakra, you can create styled components
 * that pull values from `theme.components`
 *
 * Here's an example of a button component.
 * It reads from `theme.components.Button`,
 * and applies the default theming props
 * specified in `defaultProps` key.
 */
const Button = chakra("button", {
  themeKey: "Button",
  attrs: { type: "button" },
})

export const ButtonExample = () => (
  <Button marginTop="40px">This is my button</Button>
)

const Alert = chakra("div", {
  themeKey: "Alert.Root",
  attrs: {
    role: "alert",
  },
})

export const AlertExample = () => (
  <Alert variant="top-accent" colorScheme="green">
    Welcome to alert
  </Alert>
)

/**
 * To support sub-components, you simply
 * use nested component theme key.
 *
 * In this example, the menu list and menu item
 * styles are referenced from `Menu` key
 */
const MenuList = chakra("div", {
  themeKey: "Menu.MenuList",
})

const MenuItem = chakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: {
    padding: 3,
    textAlign: "left",
  },
})

export const MenuExample = () => (
  <MenuList>
    <MenuItem>Menu 1</MenuItem>
    <MenuItem>Menu 2</MenuItem>
    <MenuItem>Menu 3</MenuItem>
  </MenuList>
)
