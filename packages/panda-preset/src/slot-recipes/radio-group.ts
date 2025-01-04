import { defineSlotRecipe } from "../def"

export const radioGroupSlotRecipe = defineSlotRecipe({
  className: "radio-group",
  slots: [
    "root",
    "label",
    "item",
    "itemText",
    "itemControl",
    "indicator",
    "itemAddon",
    "itemIndicator",
  ],
  base: {
    item: {
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
      fontWeight: "medium",
      _disabled: {
        cursor: "disabled",
      },
    },
    itemControl: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      verticalAlign: "top",
      color: "white",
      borderWidth: "1px",
      borderColor: "transparent",
      borderRadius: "full",
      cursor: "radio",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "2px",
      },
      _invalid: {
        colorPalette: "red",
        borderColor: "red.500",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "disabled",
      },
      "& .dot": {
        height: "100%",
        width: "100%",
        borderRadius: "full",
        bg: "currentColor",
        scale: "0.4",
      },
    },
    label: {
      userSelect: "none",
      textStyle: "sm",
      _disabled: {
        opacity: "0.5",
      },
    },
  },
  variants: {
    variant: {
      outline: {
        itemControl: {
          borderWidth: "1px",
          borderColor: "inherit",
          _checked: {
            color: "colorPalette.fg",
            borderColor: "colorPalette.solid",
          },
          "& .dot": {
            scale: "0.6",
          },
        },
      },
      subtle: {
        itemControl: {
          borderWidth: "1px",
          bg: "colorPalette.muted",
          borderColor: "colorPalette.muted",
          color: "transparent",
          _checked: {
            color: "colorPalette.fg",
          },
        },
      },
      solid: {
        itemControl: {
          borderWidth: "1px",
          borderColor: "border",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
      },
    },
    size: {
      xs: {
        item: {
          textStyle: "xs",
          gap: "1.5",
        },
        itemControl: {
          boxSize: "3",
        },
      },
      sm: {
        item: {
          textStyle: "sm",
          gap: "2",
        },
        itemControl: {
          boxSize: "4",
        },
      },
      md: {
        item: {
          textStyle: "sm",
          gap: "2.5",
        },
        itemControl: {
          boxSize: "5",
        },
      },
      lg: {
        item: {
          textStyle: "md",
          gap: "3",
        },
        itemControl: {
          boxSize: "6",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
  },
})
