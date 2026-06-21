import { fieldAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fieldSlotRecipe = defineSlotRecipe({
  className: "chakra-field",
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      display: "flex",
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
    requiredIndicator: {
      color: "fg.error",
      lineHeight: "1",
    },
    errorText: {
      display: "inline-flex",
      alignItems: "center",
      fontWeight: "medium",
      gap: "1",
      color: "fg.error",
      textStyle: "xs",
    },
    helperText: {
      color: "fg.muted",
      textStyle: "xs",
    },
  },

  variants: {
    orientation: {
      vertical: {
        root: {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        group: {
          flexDirection: "row",
        },
      },
      horizontal: {
        root: {
          display: "grid",
          gridTemplateColumns: "var(--field-label-width, 80px) 1fr",
          gap: "1.5",
          alignItems: "start",
        },
        label: {
          gridColumn: "1",
          alignSelf: "center",
        },
        inputElement: {
          gridColumn: "2",
          justifySelf: "end",
        },
        helperText: {
          gridColumn: "2",
        },
        errorText: {
          gridColumn: "2",
        },
      },
    },
  },

  defaultVariants: {
    orientation: "vertical",
  },
})
