import { StyleFunctionProps, getModeValue, getModeColor } from "./utils"

function getMenuListStyle(props: StyleFunctionProps) {
  const longShadow = `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`
  return {
    bg: getModeColor(props, `#fff`, `gray.700`),
    shadow: getModeValue(props, `sm`, longShadow),
    color: "inherit",
    borderWidth: "1px",
  }
}

function getMenuItemStyle(props: StyleFunctionProps) {
  return {
    width: "100%",
    flex: "0 0 auto",
    userSelect: "none",
    transition: "background-color 220ms, color 220ms",
    _active: {
      bg: getModeValue(props, `gray.200`, `whiteAlpha.200`),
    },
    _focus: {
      bg: getModeValue(props, `gray.100`, `whiteAlpha.100`),
      outline: 0,
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  }
}

function getbaseStyle(props: StyleFunctionProps) {
  return {
    MenuList: getMenuListStyle(props),
    MenuItem: getMenuItemStyle(props),
  }
}

export default {
  baseStyle: getbaseStyle,
}
