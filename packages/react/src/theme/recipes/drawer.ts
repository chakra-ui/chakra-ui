import { dialogAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { dialogSlotRecipe } from "./dialog"

const anatomy = dialogAnatomy.extendWith("header", "body", "footer", "backdrop")

export const drawerSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  base: {
    backdrop: {
      bg: "blackAlpha.800",
      pos: "fixed",
      insetInlineStart: 0,
      top: 0,
      w: "100vw",
      h: "100dvh",
      zIndex: "modal",
      _open: {
        animation: "fade-in 0.35s",
      },
      _closed: {
        animation: "fade-out 0.25s",
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
      maxH: "100dvh",
      color: "inherit",
      bg: "bg.panel",
      boxShadow: "lg",
      _open: {
        animation: "enter 0.5s cubic-bezier(.32,.72,0,1)",
      },
      _closed: {
        animation: "exit 0.25s cubic-bezier(.32,.72,0,1)",
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
        content: { maxW: "100vw", h: "100dvh" },
      },
    },

    placement: {
      start: {
        positioner: {
          justifyContent: "flex-start",
        },
        content: {
          _open: {
            "--enter-translate-x": "-100%",
          },
          _closed: {
            "--exit-translate-x": "-100%",
          },
        },
      },
      end: {
        positioner: {
          justifyContent: "flex-end",
        },
        content: {
          _open: {
            "--enter-translate-x": "100%",
          },
          _closed: {
            "--exit-translate-x": "100%",
          },
        },
      },
      top: {
        positioner: {
          alignItems: "flex-start",
        },
        content: {
          _open: {
            "--enter-translate-y": "-100%",
          },
          _closed: {
            "--exit-translate-y": "-100%",
          },
        },
      },
      bottom: {
        positioner: {
          alignItems: "flex-end",
        },
        content: {
          _open: {
            "--enter-translate-y": "100%",
          },
          _closed: {
            "--exit-translate-y": "100%",
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      placement: ["top", "bottom"],
      css: {
        content: {
          maxW: "100%",
        },
      },
    },
  ],

  defaultVariants: {
    size: "xs",
    placement: "end",
  },
})
