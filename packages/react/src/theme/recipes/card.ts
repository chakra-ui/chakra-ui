import { cardAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const cardSlotRecipe = defineSlotRecipe({
  className: "chakra-card",
  slots: cardAnatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      bg: "var(--card-bg)",
      boxShadow: "var(--card-shadow)",
      borderRadius: "var(--card-radius)",
      color: "fg",
      borderWidth: "var(--card-border-width, 0)",
      borderColor: "var(--card-border)",
    },
    title: {
      fontWeight: "semibold",
      textStyle: "lg",
      letterSpacing: "tight",
    },
    description: {
      color: "fg.subtle",
    },
    body: {
      padding: "var(--card-padding)",
      flex: "1 1 0%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    header: {
      paddingInline: "var(--card-padding)",
      paddingTop: "var(--card-padding)",
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      paddingInline: "var(--card-padding)",
      paddingBottom: "var(--card-padding)",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--card-radius": "radii.lg",
          "--card-padding": "spacing.4",
        },
      },
      md: {
        root: {
          "--card-radius": "radii.xl",
          "--card-padding": "spacing.6",
        },
      },
      lg: {
        root: {
          "--card-radius": "radii.2xl",
          "--card-padding": "spacing.7",
        },
      },
    },
    variant: {
      elevated: {
        root: {
          "--card-bg": { _light: "white", _dark: "colors.gray.800" },
          "--card-shadow": "shadows.xs",
        },
      },
      outline: {
        root: {
          "--card-bg": "colors.bg",
          "--card-border-width": "1px",
          "--card-border": "colors.border",
        },
      },
      subtle: {
        root: {
          "--card-bg": "colors.bg.subtle",
        },
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
})
