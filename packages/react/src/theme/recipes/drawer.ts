import { drawerAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { dialogSlotRecipe } from "./dialog"

export const drawerSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    overlay: dialogSlotRecipe.base!.overlay,
    positioner: dialogSlotRecipe.base!.positioner,
    content: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      zIndex: "modal",
      maxH: "100vh",
      color: "inherit",
      bg: "white",
      boxShadow: "lg",
      _dark: {
        bg: "gray.700",
        boxShadow: "dark-lg",
      },
    },
    header: dialogSlotRecipe.base!.header,
    closeTrigger: dialogSlotRecipe.base!.closeTrigger,
    body: {
      px: "6",
      py: "2",
      flex: "1",
      overflow: "auto",
    },
    footer: dialogSlotRecipe.base!.footer,
  },
  variants: {
    size: {
      xs: {
        content: { maxW: "xs" },
      },
      sm: {
        content: { maxW: "md" },
      },
      md: {
        content: { maxW: "lg" },
      },
      lg: {
        content: { maxW: "2xl" },
      },
      xl: {
        content: { maxW: "4xl" },
      },
      full: {
        content: { maxW: "100vw", h: "100vh" },
      },
    },
    isFullHeight: {
      true: {
        content: { height: "100vh" },
      },
    },
  },
  defaultVariants: {
    size: "xs",
  },
})
