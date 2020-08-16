import { mode } from "@chakra-ui/theme-tools"

const parts = {
  item: "the menu item button",
  command: "the menu item command",
  list: "the menu items wrapper",
  button: "the menu list trigger",
  groupTitle: "the menu group title",
}

function baseStyleList(props: Record<string, any>) {
  return {
    bg: mode(`#fff`, `gray.700`)(props),
    boxShadow: mode(`sm`, `dark-lg`)(props),
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: 1,
    borderRadius: "md",
    borderWidth: "1px",
  }
}

function baseStyleItem(props: Record<string, any>) {
  return {
    py: "0.4rem",
    px: "0.8rem",
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
  }
}

const baseStyleGroupTitle = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm",
}

const baseStyleCommand = {
  opacity: 0.6,
}

const baseStyle = function (props: Record<string, any>) {
  return {
    list: baseStyleList(props),
    item: baseStyleItem(props),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
  }
}

const menu = {
  parts,
  baseStyle,
}

export default menu
