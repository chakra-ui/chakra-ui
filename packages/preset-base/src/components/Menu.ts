import { Props, mode, ComponentTheme } from "./utils"
import { ChakraProps } from "@chakra-ui/system"

const getMenuListStyle = (props: Props): ChakraProps => {
  const darkShadow = `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`
  return {
    bg: mode(`#fff`, `gray.700`)(props),
    boxShadow: mode(`sm`, darkShadow)(props),
    color: "inherit",
    outline: 0,
  }
}

const getMenuItemStyle = (props: Props): ChakraProps => ({
  width: "100%",
  flex: "0 0 auto",
  userSelect: "none",
  textAlign: "left",
  transition: "background-color 220ms, color 220ms",
  outline: 0,
  _active: {
    bg: mode(`gray.200`, `whiteAlpha.200`)(props),
  },
  _focus: {
    bg: mode(`gray.100`, `whiteAlpha.100`)(props),
  },
  _expanded: {
    bg: mode(`gray.100`, `whiteAlpha.100`)(props),
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
})

const Menu: ComponentTheme = {
  baseStyle: props => ({
    MenuList: getMenuListStyle(props),
    MenuItem: getMenuItemStyle(props),
  }),
}

export default Menu
