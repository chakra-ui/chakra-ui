import { fieldAnatomy } from "@ark-ui/react/field"
import { defineSlotRecipe } from "../../styled-system"

export const fieldSlotRecipe = defineSlotRecipe({
  className: "field",
  slots: [...fieldAnatomy.keys(), "requiredIndicator"],
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
      fontSize: "xs",
    },
    helperText: {
      color: "fg.subtle",
      lineHeight: "normal",
      fontSize: "xs",
    },
  },
})
