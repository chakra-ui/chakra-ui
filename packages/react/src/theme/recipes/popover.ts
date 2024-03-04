import { popoverAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const popoverSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    content: {
      "--popper-bg": { base: "colors.white", _dark: "colors.gray.700" },
      "--popper-arrow-bg": "var(--popper-bg)",
      "--popper-arrow-shadow-color": {
        base: "colors.gray.200",
        _dark: "colors.whiteAlpha.300",
      },
      position: "relative",
      display: "flex",
      flexDirection: "column",
      bg: "white",
      width: "xs",
      border: "1px solid inherit",
      borderRadius: "md",
      boxShadow: { base: "sm", _focusVisible: "outline" },
      zIndex: "inherit",
      _focusVisible: {
        outline: 0,
      },
    },
    header: {
      px: 3,
      py: 2,
      borderBottomWidth: "1px",
    },
    body: {
      px: 3,
      py: 2,
    },
    footer: {
      px: 3,
      py: 2,
      borderTopWidth: "1px",
    },
    closeTrigger: {
      position: "absolute",
      borderRadius: "md",
      top: 1,
      insetEnd: 2,
      padding: 2,
    },
  },
})
