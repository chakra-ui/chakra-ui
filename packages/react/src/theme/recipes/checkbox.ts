import { checkboxAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "inline-flex",
      gap: "0.5rem",
      alignItems: "center",
      verticalAlign: "top",
      cursor: "pointer",
      position: "relative",
      colorPalette: "blue",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    control: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      userSelect: "none",
      w: "var(--size)",
      h: "var(--size)",
      transitionProperty: "box-shadow",
      transitionDuration: "normal",
      border: "2px solid",
      borderRadius: "sm",
      borderColor: "inherit",
      color: "white",
      verticalAlign: "top",
      _focusVisible: {
        boxShadow: "outline",
      },
      _invalid: {
        borderColor: { base: "red.500", _dark: "red.300" },
      },
    },
    label: {
      userSelect: "none",
      _disabled: { opacity: 0.4 },
    },
    icon: {
      transitionProperty: "transform",
      transitionDuration: "normal",
    },
  },
  variants: {
    isChecked: {
      true: {
        control: {
          bg: { base: "colorPalette.500", _dark: "colorPalette.200" },
          borderColor: { base: "colorPalette.500", _dark: "colorPalette.200" },
          color: { base: "white", _dark: "gray.900" },
          _hover: {
            bg: { base: "colorPalette.600", _dark: "colorPalette.300" },
            borderColor: {
              base: "colorPalette.600",
              _dark: "colorPalette.300",
            },
          },
          _disabled: {
            borderColor: { base: "gray.200", _dark: "transparent" },
            bg: { base: "gray.200", _dark: "whiteAlpha.300" },
            color: { base: "gray.500", _dark: "whiteAlpha.500" },
          },
        },
      },
    },
    isIndeterminate: {
      true: {
        control: {
          bg: { base: "colorPalette.500", _dark: "colorPalette.200" },
          borderColor: { base: "colorPalette.500", _dark: "colorPalette.200" },
          color: { base: "white", _dark: "gray.900" },
        },
      },
    },
    size: {
      sm: {
        control: { "--size": "sizes.3" },
        label: { fontSize: "sm" },
        icon: { fontSize: "3xs" },
      },
      md: {
        control: { "--size": "sizes.4" },
        label: { fontSize: "md" },
        icon: { fontSize: "2xs" },
      },
      lg: {
        control: { "--size": "sizes.5" },
        label: { fontSize: "lg" },
        icon: { fontSize: "2xs" },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
