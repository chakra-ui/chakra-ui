import { menuAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const menuSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    content: {
      outline: 0,
      bg: { base: "white", _dark: "gray.700" },
      boxShadow: { base: "sm", _dark: "dark-lg" },
      color: "inherit",
      minW: "3xs",
      py: "2",
      zIndex: "dropdown",
      borderRadius: "md",
      borderWidth: "1px",
    },
    item: {
      textDecoration: "none",
      color: "inherit",
      userSelect: "none",
      display: "flex",
      width: "100%",
      alignItems: "center",
      textAlign: "start",
      flex: "0 0 auto",
      outline: 0,
      py: "1.5",
      px: "3",
      transitionProperty: "background",
      transitionDuration: "ultra-fast",
      transitionTimingFunction: "ease-in",
      _focus: {
        bg: { base: "gray.100", _dark: "whiteAlpha.100" },
      },
      _active: {
        bg: { base: "gray.200", _dark: "whiteAlpha.200" },
      },
      _expanded: {
        bg: { base: "gray.100", _dark: "whiteAlpha.100" },
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
    groupTitle: {
      mx: 4,
      my: 2,
      fontWeight: "semibold",
      fontSize: "sm",
    },
    icon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    command: {
      opacity: 0.6,
    },
    divider: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "inherit",
      my: "2",
      opacity: 0.6,
    },
    trigger: {
      transitionProperty: "common",
      transitionDuration: "normal",
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      outline: 0,
    },
  },
})
