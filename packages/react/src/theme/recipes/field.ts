import { fieldAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fieldSlotRecipe = defineSlotRecipe({
  className: "chakra-field",
  slots: fieldAnatomy.keys(),
  base: {
    requiredIndicator: {
      marginStart: "0.5",
      color: "fg.error",
      verticalAlign: "middle",
      lineHeight: "normal",
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
      fontWeight: "medium",
      gap: "2",
      color: "fg.error",
      textStyle: "xs",
    },
    helperText: {
      color: "fg.subtle",
      lineHeight: "normal",
      textStyle: "xs",
    },
  },
})
