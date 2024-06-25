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
        animationName: "fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationName: "fade-out",
        animationDuration: "faster",
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
        animationDuration: "normal",
      },
      _closed: {
        animationDuration: "faster",
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
        positioner: {
          alignItems: "center",
        },
        content: {
          my: "auto",
          mx: "auto",
        },
      },
      false: {
        positioner: {
          alignItems: "flex-start",
        },
        content: {
          my: "16",
          mx: "auto",
        },
      },
    },

    scrollBehavior: {
      inside: {
        positioner: {
          overflow: "hidden",
        },
        content: {
          maxH: "calc(100% - 7.5rem)",
        },
        body: {
          overflow: "auto",
        },
      },
      outside: {
        positioner: {
          overflow: "auto",
        },
      },
    },

    size: {
      xs: {
        content: {
          maxW: "sm",
        },
      },
      sm: {
        content: {
          maxW: "md",
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
          _open: { animationName: "scale-in, fade-in" },
          _closed: { animationName: "scale-out, fade-out" },
        },
      },
      "slide-in-bottom": {
        content: {
          _open: { animationName: "slide-from-bottom, fade-in" },
          _closed: { animationName: "slide-to-bottom, fade-out" },
        },
      },
      "slide-in-top": {
        content: {
          _open: { animationName: "slide-from-top, fade-in" },
          _closed: { animationName: "slide-to-top, fade-out" },
        },
      },
      "slide-in-left": {
        content: {
          _open: { animationName: "slide-from-left, fade-in" },
          _closed: { animationName: "slide-to-left, fade-out" },
        },
      },
      "slide-in-right": {
        content: {
          _open: { animationName: "slide-from-right, fade-in" },
          _closed: { animationName: "slide-to-right, fade-out" },
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
