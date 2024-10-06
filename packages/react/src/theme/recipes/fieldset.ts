import { fieldsetAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fieldsetSlotRecipe = defineSlotRecipe({
  className: "fieldset",
  slots: [...fieldsetAnatomy.keys(), "control"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "full",
    },
    control: {
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
      color: "fg.subtle",
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
        root: { spaceY: "4" },
        control: { gap: "4" },
        legend: { textStyle: "sm" },
      },
      md: {
        root: { spaceY: "4" },
        control: { gap: "6" },
        legend: { textStyle: "md" },
      },
    },
  },

  defaultVariants: {
    size: "sm",
  },
})
