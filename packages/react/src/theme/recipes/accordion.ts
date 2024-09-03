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
      _open: {
        transform: "rotate(180deg)",
      },
      _icon: {
        boxSize: "1em",
        fontSize: "lg",
        color: "fg.muted",
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
          "--accordion-padding-y": "spacing.1.5",
          "--accordion-radius": "radii.sm",
        },
        item: {
          textStyle: "sm",
        },
        itemTrigger: {
          paddingY: "var(--accordion-padding-y)",
        },
      },
      md: {
        root: {
          "--accordion-padding-x": "spacing.4",
          "--accordion-padding-y": "spacing.2",
          "--accordion-radius": "radii.md",
        },
        item: {
          textStyle: "sm",
        },
        itemTrigger: {
          paddingY: "var(--accordion-padding-y)",
        },
      },
      lg: {
        root: {
          "--accordion-padding-x": "spacing.6",
          "--accordion-padding-y": "spacing.3",
          "--accordion-radius": "radii.md",
        },
        item: {
          textStyle: "md",
        },
        itemTrigger: {
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
