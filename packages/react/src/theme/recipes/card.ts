import { cardAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const cardSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "inline-flex",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      bg: "var(--card-bg)",
      boxShadow: "var(--card-shadow)",
      borderRadius: "var(--card-radius)",
      color: "text",
      borderWidth: "var(--card-border-width, 0)",
      borderColor: "var(--card-border)",
    },
    body: {
      padding: "var(--card-padding)",
      flex: "1 1 0%",
    },
    header: {
      paddingInline: "var(--card-padding)",
      paddingTop: "var(--card-padding)",
    },
    footer: {
      paddingInline: "var(--card-padding)",
      paddingBottom: "var(--card-padding)",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--card-radius": "radii.sm",
          "--card-padding": "spacing.4",
        },
      },
      md: {
        root: {
          "--card-radius": "radii.md",
          "--card-padding": "spacing.6",
        },
      },
      lg: {
        root: {
          "--card-radius": "radii.xl",
          "--card-padding": "spacing.7",
        },
      },
    },
    variant: {
      elevated: {
        root: {
          "--card-bg": { base: "white", _dark: "colors.gray.800" },
          "--card-shadow": "shadows.xs",
        },
      },
      outline: {
        root: {
          "--card-border-width": "1px",
          "--card-border": "colors.border",
        },
      },
      subtle: {
        root: {
          "--card-bg": "colors.bg.muted",
        },
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
})
