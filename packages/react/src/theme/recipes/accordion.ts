import { accordionAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const accordionSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    item: {
      overflowAnchor: "none",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontWeight: "medium",
      outline: "0",
      borderRadius: "var(--accordion-radius)",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.500",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },
    content: {
      overflow: "hidden",
      // paddingBottom: "calc(var(--accordion-padding-y) * 2)",
      borderRadius: "var(--accordion-radius)",
      _open: {
        animation: "collapse-in 250ms",
      },
      _closed: {
        animation: "collapse-out 250ms",
      },
    },
    indicator: {
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
        trigger: {
          paddingX: "var(--accordion-padding-x)",
        },
        content: {
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
        trigger: {
          paddingX: "var(--accordion-padding-x)",
        },
        content: {
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
          fontSize: "sm",
        },
        trigger: {
          paddingY: "var(--accordion-padding-y)",
        },
      },
      md: {
        item: {
          "--accordion-padding-x": "spacing.4",
          "--accordion-padding-y": "spacing.2",
          "--accordion-radius": "radii.md",
          fontSize: "sm",
        },
        trigger: {
          paddingY: "var(--accordion-padding-y)",
        },
      },
      lg: {
        item: {
          "--accordion-padding-x": "spacing.6",
          "--accordion-padding-y": "spacing.3",
          "--accordion-radius": "radii.md",
          fontSize: "md",
        },
        trigger: {
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
