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
      spaceY: "2",
      width: "full",
    },
    control: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "2",
    },
    legend: {
      color: "fg",
      fontWeight: "medium",
      textStyle: "sm",
      _disabled: {
        opacity: "0.5",
      },
    },
    helperText: {
      color: "fg.muted",
      textStyle: "sm",
    },
    errorText: {
      alignItems: "center",
      color: "fg.error",
      display: "inline-flex",
      fontWeight: "medium",
      gap: "2",
      mt: "4",
      textStyle: "sm",
    },
  },
})
