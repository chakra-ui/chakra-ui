import { fieldAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fieldSlotRecipe = defineSlotRecipe({
  className: "chakra-field",
  slots: fieldAnatomy.keys(),
  base: {
    requiredIndicator: {
      color: "fg.error",
      lineHeight: "1",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      position: "relative",
      gap: "1.5",
    },
    label: {
      display: "flex",
      alignItems: "center",
      textAlign: "start",
      textStyle: "sm",
      fontWeight: "medium",
      gap: "1",
      userSelect: "none",
      _disabled: {
        opacity: "0.5",
      },
    },
    errorText: {
      display: "inline-flex",
      alignItems: "center",
      fontWeight: "medium",
      gap: "2",
      color: "fg.error",
      textStyle: "xs",
    },
    helperText: {
      color: "fg.muted",
      textStyle: "xs",
    },
  },
})
