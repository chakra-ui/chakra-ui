import { defineSlotRecipe } from "../../styled-system"

export const emptyStateSlotRecipe = defineSlotRecipe({
  slots: ["root", "content", "indicator", "title", "description"],
  className: "chakra-empty-state",
  base: {
    root: {
      rounded: "md",
      width: "full",
      bg: "bg",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    indicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "fg.disabled",
      _icon: {
        boxSize: "1em",
      },
    },
    title: {
      textStyle: "lg",
      fontWeight: "semibold",
    },
    description: {
      textStyle: "sm",
      color: "fg.muted",
    },
  },

  variants: {
    size: {
      md: {
        root: {
          px: "8",
          py: "12",
        },
        content: {
          gap: "6",
        },
        indicator: {
          fontSize: "4xl",
        },
      },
      lg: {
        root: {
          px: "12",
          py: "16",
        },
        content: {
          gap: "8",
        },
        indicator: {
          fontSize: "6xl",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
