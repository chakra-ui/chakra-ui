import { anatomy } from "@ark-ui/anatomy/dialog"
import { defineSlotRecipe } from "../../styled-system"

const dialogAnatomy = anatomy.extendWith("header", "body", "footer", "backdrop")

export const dialogSlotRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  base: {
    backdrop: {
      bg: "blackAlpha.500",
      pos: "fixed",
      left: 0,
      top: 0,
      w: "100vw",
      h: "100dvh",
      zIndex: "modal",
      _open: {
        animation: "fade-in 0.15s",
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
      borderRadius: "lg",
      fontSize: "sm",
      zIndex: "modal",
      bg: "bg.panel",
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
      padding: "6",
    },
    closeTrigger: {
      position: "absolute!",
      top: "2",
      insetEnd: "2",
    },
    body: {
      flex: "1",
      color: "fg.muted",
      paddingX: "6",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "3",
      padding: "6",
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
      xs: {
        content: {
          maxW: "2xs",
        },
      },
      sm: {
        content: {
          maxW: "sm",
        },
      },
      md: {
        content: {
          maxW: "lg",
        },
      },
      lg: {
        content: {
          maxW: "2xl",
        },
      },
      xl: {
        content: {
          maxW: "4xl",
        },
      },
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
          "--enter-scale": "0.95",
          "--enter-opacity": "0",
          "--exit-scale": "0.95",
          "--exit-opacity": "0",
        },
      },
      "slide-in-bottom": {
        content: {
          "--enter-opacity": "0",
          "--enter-translate-y": "16px",
          "--exit-opacity": "0",
          "--exit-translate-y": "16px",
        },
      },
      "slide-in-top": {
        content: {
          "--enter-opacity": "0",
          "--enter-translate-y": "-16px",
          "--exit-opacity": "0",
          "--exit-translate-y": "-16px",
        },
      },
      "slide-in-left": {
        content: {
          "--enter-opacity": "0",
          "--enter-translate-x": "-16px",
          "--exit-opacity": "0",
          "--exit-translate-x": "-16px",
        },
      },
      "slide-in-right": {
        content: {
          "--enter-opacity": "0",
          "--enter-translate-x": "16px",
          "--exit-opacity": "0",
          "--exit-translate-x": "16px",
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
