import { BaseStyle, mode } from "@chakra-ui/theme-tools"

const register = {
  parts: [
    "menuList",
    "menuItem",
    "menuButton",
    "groupTitle",
    "menuDivider",
    "icon",
    "command",
  ],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    menuList: {
      bg: mode(`#fff`, `gray.700`)(props),
      boxShadow: mode(`sm`, `dark-lg`)(props),
      color: "inherit",
      minWidth: "3xs",
      paddingY: "2",
      zIndex: 1,
      borderRadius: "md",
      borderWidth: "1px",
    },

    menuItem: {
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
    },

    groupTitle: {
      marginX: 4,
      marginY: 2,
      fontWeight: "semibold",
      fontSize: "sm",
    },

    command: {
      opacity: 0.6,
    },
  }
}

const menu = {
  register,
  baseStyle,
}

export default menu
