import { anatomy } from "@ark-ui/anatomy/accordion"
import { defineSlotRecipe } from "../../styled-system"

export const accordionSlotRecipe = defineSlotRecipe({
  className: "chakra-accordion",
  slots: [...anatomy.keys(), "itemBody"],
  base: {
    root: {
      width: "100%",
    },
    item: {
      overflowAnchor: "none",
    },
    itemTrigger: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontWeight: "medium",
      outline: "0",
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
      "& svg": {
        boxSize: "1em",
        fontSize: "lg",
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
      elevated: {
        itemTrigger: {
          paddingX: "var(--accordion-padding-x)",
        },
        itemContent: {
          paddingX: "var(--accordion-padding-x)",
        },
        item: {
          borderRadius: "var(--accordion-radius)",
          _open: {
            bg: "bg.panel",
            boxShadow: "xs",
          },
        },
      },
      contained: {
        itemTrigger: {
          paddingX: "var(--accordion-padding-x)",
        },
        itemContent: {
          paddingX: "var(--accordion-padding-x)",
        },
        item: {
          borderRadius: "var(--accordion-radius)",
          _open: {
            bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
          },
        },
      },
      plain: {},
    },

    size: {
      sm: {
        item: {
          "--accordion-padding-x": "spacing.3",
          "--accordion-padding-y": "spacing.1.5",
          "--accordion-radius": "radii.sm",
          textStyle: "sm",
        },
        itemTrigger: {
          paddingY: "var(--accordion-padding-y)",
        },
      },
      md: {
        item: {
          "--accordion-padding-x": "spacing.4",
          "--accordion-padding-y": "spacing.2",
          "--accordion-radius": "radii.md",
          textStyle: "sm",
        },
        itemTrigger: {
          paddingY: "var(--accordion-padding-y)",
        },
      },
      lg: {
        item: {
          "--accordion-padding-x": "spacing.6",
          "--accordion-padding-y": "spacing.3",
          "--accordion-radius": "radii.md",
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
    colorPalette: "gray",
  },
})
