import { dialogAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { dialogSlotRecipe } from "./dialog"

const anatomy = dialogAnatomy.extendWith("header", "body", "footer", "backdrop")

export const drawerSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  base: {
    backdrop: {
      bg: "blackAlpha.500",
      pos: "fixed",
      insetInlineStart: 0,
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
      insetInlineStart: 0,
      top: 0,
      zIndex: "modal",
      overscrollBehaviorY: "none",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      zIndex: "modal",
      fontSize: "sm",
      maxH: "100dvh",
      color: "inherit",
      bg: "bg.panel",
      shadow: "lg",
      _open: {
        animationDuration: "slowest",
        // TODO: tokenize
        animationTimingFunction: "cubic-bezier(.32,.72,0,1)",
      },
      _closed: {
        animationDuration: "normal",
        // TODO: tokenize
        animationTimingFunction: "cubic-bezier(.32,.72,0,1)",
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
        content: {
          maxW: "xs",
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
          h: "100dvh",
        },
      },
    },

    placement: {
      start: {
        positioner: {
          justifyContent: "flex-start",
        },
        content: {
          _open: {
            animationName: {
              base: "slide-from-left-full, fade-in",
              _rtl: "slide-from-right-full, fade-in",
            },
          },
          _closed: {
            animationName: {
              base: "slide-to-left-full, fade-out",
              _rtl: "slide-to-right-full, fade-out",
            },
          },
        },
      },

      end: {
        positioner: {
          justifyContent: "flex-end",
        },
        content: {
          _open: {
            animationName: {
              base: "slide-from-right-full, fade-in",
              _rtl: "slide-from-left-full, fade-in",
            },
          },
          _closed: {
            animationName: {
              base: "slide-to-right-full, fade-out",
              _rtl: "slide-to-right-full, fade-out",
            },
          },
        },
      },

      top: {
        positioner: {
          alignItems: "flex-start",
        },
        content: {
          maxW: "100%",
          _open: { animationName: "slide-from-top-full, fade-in" },
          _closed: { animationName: "slide-to-top-full, fade-out" },
        },
      },

      bottom: {
        positioner: {
          alignItems: "flex-end",
        },
        content: {
          maxW: "100%",
          _open: { animationName: "slide-from-bottom-full, fade-in" },
          _closed: { animationName: "slide-to-bottom-full, fade-out" },
        },
      },
    },

    contained: {
      true: {
        positioner: {
          padding: "4",
        },
        content: {
          borderRadius: "lg",
        },
      },
    },
  },

  defaultVariants: {
    size: "xs",
    placement: "end",
  },
})
