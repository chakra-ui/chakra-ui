import { defineSlotRecipe } from "../def"

export const emptyStateSlotRecipe = defineSlotRecipe({
  slots: ["root", "content", "indicator", "title", "description"],
  className: "empty-state",
  base: {
    root: {
      width: "full",
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
      color: "fg.subtle",
      _icon: {
        boxSize: "1em",
      },
    },
    title: {
      fontWeight: "semibold",
    },
    description: {
      textStyle: "sm",
      color: "fg.muted",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          px: "4",
          py: "6",
        },
        title: {
          textStyle: "md",
        },
        content: {
          gap: "4",
        },
        indicator: {
          textStyle: "2xl",
        },
      },
      md: {
        root: {
          px: "8",
          py: "12",
        },
        title: {
          textStyle: "lg",
        },
        content: {
          gap: "6",
        },
        indicator: {
          textStyle: "4xl",
        },
      },
      lg: {
        root: {
          px: "12",
          py: "16",
        },
        title: {
          textStyle: "xl",
        },
        content: {
          gap: "8",
        },
        indicator: {
          textStyle: "6xl",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
