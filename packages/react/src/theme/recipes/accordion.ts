import { accordionAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const accordionSlotRecipe = defineSlotRecipe({
  className: "chakra-accordion",
  slots: accordionAnatomy.keys(),
  base: {
    root: {
      width: "full",
    },
    item: {
      overflowAnchor: "none",
    },
    itemTrigger: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      outline: "0",
      gap: "3",
      fontWeight: "medium",
      borderRadius: "var(--accordion-radius)",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "focusRing",
      },
      _disabled: {
        layerStyle: "disabled",
      },
    },
    itemBody: {
      paddingBottom: "calc(var(--accordion-padding-y) * 2)",
    },
    itemContent: {
      overflow: "hidden",
      borderRadius: "var(--accordion-radius)",
      _open: {
        animationName: "expand-height, fade-in",
        animationDuration: "moderate",
      },
      _closed: {
        animationName: "collapse-height, fade-out",
        animationDuration: "moderate",
      },
    },
    itemIndicator: {
      transition: "transform 0.2s",
      transformOrigin: "center",
      color: "fg.muted",
      _open: {
        transform: "rotate(180deg)",
      },
      _icon: {
        width: "1.2em",
        height: "1.2em",
      },
    },
  },

  variants: {
    variant: {
      outline: {
        item: {
          borderBottomWidth: "1px",
        },
      },

      subtle: {
        itemTrigger: {
          paddingX: "var(--accordion-padding-x)",
        },
        itemContent: {
          paddingX: "var(--accordion-padding-x)",
        },
        item: {
          borderRadius: "var(--accordion-radius)",
          _open: {
            bg: "colorPalette.muted",
          },
        },
      },

      enclosed: {
        root: {
          borderWidth: "1px",
          borderRadius: "var(--accordion-radius)",
          divideY: "1px",
          overflow: "hidden",
        },
        itemTrigger: {
          paddingX: "var(--accordion-padding-x)",
        },
        itemContent: {
          paddingX: "var(--accordion-padding-x)",
        },
        item: {
          _open: {
            bg: "bg.muted",
          },
        },
      },

      plain: {},
    },

    size: {
      sm: {
        root: {
          "--accordion-padding-x": "spacing.3",
          "--accordion-padding-y": "spacing.2",
          "--accordion-radius": "radii.sm",
        },
        itemContent: {
          textStyle: "xs",
        },
        itemTrigger: {
          textStyle: "sm",
          paddingY: "var(--accordion-padding-y)",
        },
      },
      md: {
        root: {
          "--accordion-padding-x": "spacing.4",
          "--accordion-padding-y": "spacing.2",
          "--accordion-radius": "radii.md",
        },
        itemContent: {
          textStyle: "sm",
        },
        itemTrigger: {
          textStyle: "md",
          paddingY: "var(--accordion-padding-y)",
        },
      },
      lg: {
        root: {
          "--accordion-padding-x": "spacing.4.5",
          "--accordion-padding-y": "spacing.2.5",
          "--accordion-radius": "radii.md",
        },
        itemContent: {
          textStyle: "md",
        },
        itemTrigger: {
          textStyle: "lg",
          paddingY: "var(--accordion-padding-y)",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
