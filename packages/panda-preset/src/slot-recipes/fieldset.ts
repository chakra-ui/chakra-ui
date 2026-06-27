import { defineSlotRecipe } from "../def"

export const fieldsetSlotRecipe = defineSlotRecipe({
  className: "fieldset",
  slots: ["root", "errorText", "helperText", "legend", "content"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "full",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      width: "full",
    },
    legend: {
      color: "fg",
      fontWeight: "medium",
      _disabled: {
        opacity: "0.5",
      },
    },
    helperText: {
      color: "fg.muted",
      textStyle: "sm",
    },
    errorText: {
      display: "inline-flex",
      alignItems: "center",
      color: "fg.error",
      gap: "2",
      fontWeight: "medium",
      textStyle: "sm",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          spaceY: "2",
        },
        content: {
          gap: "1.5",
        },
        legend: {
          textStyle: "sm",
        },
      },
      md: {
        root: {
          spaceY: "4",
        },
        content: {
          gap: "4",
        },
        legend: {
          textStyle: "sm",
        },
      },
      lg: {
        root: {
          spaceY: "6",
        },
        content: {
          gap: "4",
        },
        legend: {
          textStyle: "md",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
