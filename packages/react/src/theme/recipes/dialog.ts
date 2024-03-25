import { modalAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const dialogSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    overlay: {
      bg: "blackAlpha.800",
      pos: "fixed",
      left: 0,
      top: 0,
      w: "100vw",
      h: "100vh",
      zIndex: "modal",
    },
    positioner: {
      display: "flex",
      width: "100vw",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: "modal",
      justifyContent: "center",
      overscrollBehaviorY: "none",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      borderRadius: "md",
      zIndex: "modal",
      bg: "bg",
      shadow: "lg",
    },
    header: {
      flex: 0,
      px: "6",
      py: "4",
      fontSize: "xl",
      fontWeight: "semibold",
    },
    closeTrigger: {
      position: "absolute",
      top: "2",
      insetEnd: "3",
    },
    body: {
      px: "6",
      py: "2",
      flex: "1",
      color: "fg.muted",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "3",
      px: "6",
      py: "4",
    },
  },
  variants: {
    centered: {
      true: {
        positioner: { alignItems: "center" },
        content: { my: "auto", mx: "auto" },
      },
      false: {
        positioner: { alignItems: "flex-start" },
        content: { my: "16", mx: "auto" },
      },
    },
    scrollBehavior: {
      inside: {
        positioner: { overflow: "hidden" },
        content: { maxH: "calc(100% - 7.5rem)" },
        body: { overflow: "auto" },
      },
      outside: {
        positioner: { overflow: "auto" },
      },
    },
    size: {
      xs: { content: { maxW: "xs" } },
      sm: { content: { maxW: "sm" } },
      md: { content: { maxW: "md" } },
      lg: { content: { maxW: "lg" } },
      xl: { content: { maxW: "xl" } },
      "2xl": { content: { maxW: "2xl" } },
      "3xl": { content: { maxW: "3xl" } },
      "4xl": { content: { maxW: "4xl" } },
      "5xl": { content: { maxW: "5xl" } },
      "6xl": { content: { maxW: "6xl" } },
      full: {
        content: {
          maxW: "100vw",
          minH: "100vh",
          my: "0",
          borderRadius: "0",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    scrollBehavior: "outside",
    centered: false,
  },
})
