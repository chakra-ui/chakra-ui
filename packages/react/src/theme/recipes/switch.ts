import { switchAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const switchSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
      lineHeight: 0,
      "--diff": "calc(var(--width) - var(--height))",
      "--x": { base: "var(--diff)", _rtl: "calc(var(--diff) * -1)" },
      colorPalette: "blue",
    },
    label: {
      userSelect: "none",
    },
    track: {
      display: "inline-flex",
      gap: "0.5rem",
      flexShrink: 0,
      justifyContent: "flex-start",
      boxSizing: "content-box",
      cursor: "pointer",
      borderRadius: "full",
      p: "0.5",
      width: "var(--width)",
      height: "var(--height)",
      transitionProperty: "common",
      transitionDuration: "fast",
      shadow: { _focusVisible: "outline" },
      bg: { base: "gray.300", _dark: "whiteAlpha.400" },
      _checked: {
        bg: { base: "colorPalette.500", _dark: "colorPalette.200" },
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
    thumb: {
      bg: "white",
      transitionProperty: "transform",
      transitionDuration: "normal",
      borderRadius: "inherit",
      width: "var(--height)",
      height: "var(--height)",
      transform: { _checked: "translateX(var(--x))" },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--width": "1.375rem",
          "--height": "3",
        },
      },
      md: {
        root: {
          "--width": "1.875rem",
          "--height": "4",
        },
      },
      lg: {
        root: {
          "--width": "2.875rem",
          "--height": "6",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
