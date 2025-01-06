import { defineSlotRecipe } from "../def"

export const editableSlotRecipe = defineSlotRecipe({
  slots: [
    "root",
    "area",
    "label",
    "preview",
    "input",
    "editTrigger",
    "submitTrigger",
    "cancelTrigger",
    "control",
    "textarea",
  ],
  className: "editable",
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
      gap: "1.5",
      width: "full",
    },
    preview: {
      fontSize: "inherit",
      fontWeight: "inherit",
      textAlign: "inherit",
      bg: "transparent",
      borderRadius: "l2",
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
      fontSize: "inherit",
      fontWeight: "inherit",
      textAlign: "inherit",
      bg: "transparent",
      borderRadius: "l2",
      outline: "0",
      py: "1",
      px: "1",
      transitionProperty: "common",
      transitionDuration: "normal",
      width: "full",
      focusVisibleRing: "inside",
      focusRingWidth: "2px",
      _placeholder: {
        opacity: 0.6,
      },
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
        preview: {
          minH: "8",
        },
        input: {
          minH: "8",
        },
      },
      md: {
        root: {
          textStyle: "sm",
        },
        preview: {
          minH: "9",
        },
        input: {
          minH: "9",
        },
      },
      lg: {
        root: {
          textStyle: "md",
        },
        preview: {
          minH: "10",
        },
        input: {
          minH: "10",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
