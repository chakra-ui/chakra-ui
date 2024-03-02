import { avatarAnatomy as parts } from "@chakra-ui/anatomy"
import { defineSlotRecipe, defineStyle } from "@chakra-ui/react"

const sharedStyles = defineStyle({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0,
})

export const avatarTheme = defineSlotRecipe({
  slots: parts.keys,
  base: {
    group: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "row-reverse",
    },
    root: {
      ...sharedStyles,
      bg: "gray.400",
      verticalAlign: "top",
      width: "var(--size)",
      height: "var(--size)",
      "--fs": "calc(var(--size) / 2.5)",
      fontSize: "var(--fs)",
    },
    badge: {
      borderRadius: "full",
      border: "0.2em solid",
      borderColor: { base: "white", _dark: "gray.800" },
    },
    excessLabel: {
      ...sharedStyles,
      lineHeight: "1",
      bg: { base: "gray.200", _dark: "whiteAlpha.400" },
      fontSize: "var(--fs)",
    },
    label: {
      lineHeight: "1",
      fontSize: "var(--fs)",
    },
  },
  variants: {
    size: {
      "2xs": {
        root: { "--size": "sizes.4" },
      },
      xs: {
        root: { "--size": "sizes.6" },
      },
      sm: {
        root: { "--size": "sizes.8" },
      },
      md: {
        root: { "--size": "sizes.12" },
      },
      lg: {
        root: { "--size": "sizes.16" },
      },
      xl: {
        root: { "--size": "sizes.24" },
      },
      "2xl": {
        root: { "--size": "sizes.32" },
      },
      full: {
        root: { "--size": "100%" },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
