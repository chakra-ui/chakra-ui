import { Props, mode, ComponentTheme } from "./utils"
import { ChakraProps } from "@chakra-ui/system"

const getMenuListStyle = (props: Props): ChakraProps => {
  const darkShadow = `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`
  return {
    bg: mode(`#fff`, `gray.700`)(props),
    boxShadow: mode(`sm`, darkShadow)(props),
    color: "inherit",
    outline: 0,
    minWidth: "3xs",
    paddingY: "2",
    borderRadius: "md",
    borderWidth: "1px solid",
  }
}

const getMenuItemStyle = (props: Props): ChakraProps => ({
  width: "100%",
  transition: "background-color 220ms, color 220ms",
  outline: 0,
  textDecoration: "none",
  paddingY: "0.4rem",
  paddingX: "0.8rem",
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
    MenuGroupTitle: {
      marginX: 4,
      marginY: 2,
      fontWeight: "semibold",
      fontSize: "sm",
    },
  }),
}

export default Menu
