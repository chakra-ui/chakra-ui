import { fieldAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fieldSlotRecipe = defineSlotRecipe({
  className: "chakra-field",
  slots: fieldAnatomy.keys(),
  base: {
    requiredIndicator: {
      marginStart: "2",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      position: "relative",
      gap: "2",
    },
    label: {
      display: "block",
      textAlign: "start",
      textStyle: "sm",
      fontWeight: "medium",
      marginEnd: "3",
      userSelect: "none",
      _disabled: {
        opacity: "0.5",
      },
    },
    errorText: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      color: "fg.error",
      textStyle: "xs",
    },
    helperText: {
      color: "fg.muted",
      lineHeight: "normal",
      textStyle: "xs",
    },
  },
})
