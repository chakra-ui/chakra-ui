import { anatomy } from "@ark-ui/anatomy/dialog"
import { defineSlotRecipe } from "../../styled-system"

const dialogAnatomy = anatomy.extendWith("header", "body", "footer", "backdrop")

export const dialogSlotRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  base: {
    backdrop: {
      bg: "blackAlpha.800",
      pos: "fixed",
      left: 0,
      top: 0,
      w: "100vw",
      h: "100dvh",
      zIndex: "modal",
      _open: {
        animation: "fade-in 0.2s",
      },
      _closed: {
        animation: "fade-out 0.1s",
      },
    },
    positioner: {
      display: "flex",
      width: "100vw",
      height: "100dvh",
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
      _open: {
        animation: "enter 0.2s",
      },
      _closed: {
        animation: "exit 0.1s",
      },
    },
    header: {
      flex: 0,
      px: "6",
      py: "4",
      fontSize: "xl",
      fontWeight: "semibold",
    },
    closeTrigger: {
      position: "absolute!",
      top: "2",
      insetEnd: "2",
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
    motionPreset: {
      scale: {
        content: {
          _open: {
            "--enter-scale": "0.95",
            "--enter-opacity": "0",
          },
          _closed: {
            "--exit-scale": "0.95",
            "--exit-opacity": "0",
          },
        },
      },
      "slide-in-bottom": {
        content: {
          _open: {
            "--enter-opacity": "0",
            "--enter-translate-y": "16px",
          },
          _closed: {
            "--exit-opacity": "0",
            "--exit-translate-y": "16px",
          },
        },
      },
      "slide-in-top": {
        content: {
          _open: {
            "--enter-opacity": "0",
            "--enter-translate-y": "-16px",
          },
          _closed: {
            "--exit-opacity": "0",
            "--exit-translate-y": "-16px",
          },
        },
      },
      "slide-in-left": {
        content: {
          _open: {
            "--enter-opacity": "0",
            "--enter-translate-x": "-16px",
          },
          _closed: {
            "--exit-opacity": "0",
            "--exit-translate-x": "-16px",
          },
        },
      },
      "slide-in-right": {
        content: {
          _open: {
            "--enter-opacity": "0",
            "--enter-translate-x": "16px",
          },
          _closed: {
            "--exit-opacity": "0",
            "--exit-translate-x": "16px",
          },
        },
      },
      none: {},
    },
  },
  defaultVariants: {
    size: "md",
    scrollBehavior: "outside",
    centered: false,
    motionPreset: "scale",
  },
})
