import { editableAnatomy } from "../../anatomy"
import { defineSlotRecipe, defineStyle } from "../../styled-system"

const sharedStyles = defineStyle({
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
  borderRadius: "l2",
})

export const editableSlotRecipe = defineSlotRecipe({
  slots: editableAnatomy.keys(),
  className: "chakra-editable",
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
      gap: "1.5",
      width: "full",
    },
    preview: {
      ...sharedStyles,
      py: "1",
      px: "1",
      display: "inline-flex",
      alignItems: "center",
      transitionProperty: "common",
      transitionDuration: "normal",
      cursor: "text",
      _hover: {
        bg: "bg.muted",
      },
      _disabled: {
        userSelect: "none",
      },
    },
    input: {
      ...sharedStyles,
      outline: "0",
      py: "1",
      px: "1",
      transitionProperty: "common",
      transitionDuration: "normal",
      width: "full",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      _placeholder: { opacity: 0.6 },
    },

    control: {
      display: "inline-flex",
      alignItems: "center",
      gap: "1.5",
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          textStyle: "sm",
        },
        preview: { minH: "8" },
        input: { minH: "8" },
      },
      md: {
        root: {
          textStyle: "sm",
        },
        preview: { minH: "9" },
        input: { minH: "9" },
      },
      lg: {
        root: {
          textStyle: "md",
        },
        preview: { minH: "10" },
        input: { minH: "10" },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
