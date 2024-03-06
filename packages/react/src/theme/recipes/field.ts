import { fieldAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fieldSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
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
      fontSize: "sm",
      fontWeight: "medium",
      marginEnd: "3",
      opacity: { _disabled: 0.4 },
    },
    requiredIndicator: {
      marginStart: "2",
    },
    helpText: {
      color: "fg.subtle",
      lineHeight: "normal",
      fontSize: "sm",
    },
    errorMessage: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      color: "fg.error",
    },
  },
})
