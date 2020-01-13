import { VariantStyleFunction } from "./utils";

function getMenuListStyle({ colorMode }: VariantStyleFunction) {
  const elevation = {
    light: {
      bg: "#fff",
      shadow: "sm",
    },
    dark: {
      bg: "gray.700",
      shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
    },
  };

  return {
    color: "inherit",
    borderWidth: "1px",
    ...elevation[colorMode],
  };
}

function getMenuItemStyle({ colorMode }: VariantStyleFunction) {
  const _focusColor = { light: "gray.100", dark: "whiteAlpha.100" };
  const _activeColor = { light: "gray.200", dark: "whiteAlpha.200" };

  return {
    width: "full",
    flex: "0 0 auto",
    userSelect: "none",
    transition: "background-color 220ms, color 220ms",
    _active: {
      bg: _activeColor[colorMode],
    },
    _focus: {
      // bg: _focusColor[colorMode],
      outline: 0,
      shadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  };
}

function getbaseStyle(props: VariantStyleFunction) {
  return {
    MenuList: getMenuListStyle(props),
    MenuItem: getMenuItemStyle(props),
  };
}

export default {
  baseStyle: getbaseStyle,
};
