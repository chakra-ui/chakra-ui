import { Props, mode, ComponentTheme, copy } from "@chakra-ui/theme-tools"
import { SystemProps } from "@chakra-ui/system"
import Button from "./button"

const getMenuListStyle = (props: Props): SystemProps => {
  return {
    bg: mode(`#fff`, `gray.700`)(props),
    boxShadow: mode(`sm`, `dark-lg`)(props),
    color: "inherit",
    outline: 0,
    minWidth: "3xs",
    paddingY: "2",
    zIndex: "1",
    borderRadius: "md",
    border: "1px solid",
    borderColor: "inherit",
  }
}

const getMenuItemStyle = (props: Props): SystemProps => ({
  width: "100%",
  outline: 0,
  textDecoration: "none",
  paddingY: "0.4rem",
  paddingX: "0.8rem",
  transition: "background 50ms ease-in 0s",
  _focus: {
    bg: mode(`gray.100`, `whiteAlpha.100`)(props),
  },
  _active: {
    bg: mode(`gray.200`, `whiteAlpha.200`)(props),
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
  defaultProps: Button.defaultProps,
  baseStyle: (props) => ({
    MenuButton: Button.baseStyle as SystemProps,
    MenuList: getMenuListStyle(props),
    MenuItem: getMenuItemStyle(props),
    MenuGroupTitle: {
      marginX: 4,
      marginY: 2,
      fontWeight: "semibold",
      fontSize: "sm",
    },
  }),
  variants: {
    /**
     * We're using `copy` function to copy all button variants
     * under the key `MenuButton`.
     *
     * You can ignore this copy and write your own variant styles
     * for the different sub-components.
     *
     * @example
     *
     * variants: {
     *   simple: {
     *     MenuButton: {...}
     *   },
     *   extended: {
     *      MenuButton: {...}
     *   }
     * }
     */
    ...copy(Button.variants, "MenuButton"),
  },
  sizes: {
    /**
     * We're using `copy` function to copy all button sizes
     * under the key `MenuButton`.
     */
    ...copy(Button.sizes, "MenuButton"),
  },
}

export default Menu
