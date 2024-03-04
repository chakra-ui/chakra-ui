import { cardAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const cardSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "flex",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      bg: "var(--bg)",
      boxShadow: "var(--shadow)",
      borderRadius: "var(--radius)",
      color: "text",
      borderWidth: "var(--border-width, 0)",
      borderColor: "var(--border-color)",
    },
    body: {
      padding: "var(--padding)",
      flex: "1 1 0%",
    },
    header: {
      padding: "var(--padding)",
    },
    footer: {
      padding: "var(--padding)",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--radius": "radii.base",
          "--padding": "space.3",
        },
      },
      md: {
        root: {
          "--radius": "radii.md",
          "--padding": "space.5",
        },
      },
      lg: {
        root: {
          "--radius": "radii.xl",
          "--padding": "space.7",
        },
      },
    },
    variant: {
      elevated: {
        root: {
          "--bg": { base: "colors.bg", _dark: "colors.gray.700" },
          "--shadow": "shadows.base",
        },
      },
      outline: {
        root: {
          "--border-width": "1px",
          "--border-color": "colors.border",
        },
      },
      filled: {
        root: {
          "--bg": "colors.bg.subtle",
        },
      },
    },
  },
  defaultVariants: {
    variant: "elevated",
    size: "md",
  },
})
