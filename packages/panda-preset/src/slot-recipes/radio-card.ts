import { defineSlotRecipe } from "../def"

export const radioCardSlotRecipe = defineSlotRecipe({
  className: "radio-card",
  slots: [
    "root",
    "label",
    "item",
    "itemText",
    "itemControl",
    "indicator",
    "itemAddon",
    "itemIndicator",
    "itemContent",
    "itemDescription",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      isolation: "isolate",
    },
    item: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      position: "relative",
      borderRadius: "l2",
      _focus: {
        bg: "colorPalette.muted/20",
      },
      _disabled: {
        opacity: "0.8",
        borderColor: "border.disabled",
      },
      _checked: {
        zIndex: "1",
      },
    },
    label: {
      display: "inline-flex",
      fontWeight: "medium",
      textStyle: "sm",
      _disabled: {
        opacity: "0.5",
      },
    },
    itemText: {
      fontWeight: "medium",
    },
    itemDescription: {
      opacity: "0.64",
      textStyle: "sm",
    },
    itemControl: {
      display: "inline-flex",
      flex: "1",
      pos: "relative",
      rounded: "inherit",
      justifyContent: "var(--radio-card-justify)",
      alignItems: "var(--radio-card-align)",
      _disabled: {
        bg: "bg.muted",
      },
    },
    itemIndicator: {
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
    itemAddon: {
      roundedBottom: "inherit",
      _disabled: {
        color: "fg.muted",
      },
    },
    itemContent: {
      display: "flex",
      flexDirection: "column",
      flex: "1",
      gap: "1",
      justifyContent: "var(--radio-card-justify)",
      alignItems: "var(--radio-card-align)",
    },
  },
  variants: {
    size: {
      sm: {
        item: {
          textStyle: "sm",
        },
        itemControl: {
          padding: "3",
          gap: "1.5",
        },
        itemAddon: {
          px: "3",
          py: "1.5",
          borderTopWidth: "1px",
        },
        itemIndicator: {
          boxSize: "4",
        },
      },
      md: {
        item: {
          textStyle: "sm",
        },
        itemControl: {
          padding: "4",
          gap: "2.5",
        },
        itemAddon: {
          px: "4",
          py: "2",
          borderTopWidth: "1px",
        },
        itemIndicator: {
          boxSize: "5",
        },
      },
      lg: {
        item: {
          textStyle: "md",
        },
        itemControl: {
          padding: "4",
          gap: "3.5",
        },
        itemAddon: {
          px: "4",
          py: "2",
          borderTopWidth: "1px",
        },
        itemIndicator: {
          boxSize: "6",
        },
      },
    },
    variant: {
      surface: {
        item: {
          borderWidth: "1px",
          _checked: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
            borderColor: "colorPalette.muted",
          },
        },
        itemIndicator: {
          borderWidth: "1px",
          borderColor: "border",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
      },
      subtle: {
        item: {
          bg: "bg.muted",
        },
        itemControl: {
          _checked: {
            bg: "colorPalette.muted",
            color: "colorPalette.fg",
          },
        },
        itemIndicator: {
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
      outline: {
        item: {
          borderWidth: "1px",
          _checked: {
            boxShadow: "0 0 0 1px var(--shadow-color)",
            boxShadowColor: "colorPalette.solid",
            borderColor: "colorPalette.solid",
          },
        },
        itemIndicator: {
          borderWidth: "1px",
          borderColor: "border",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
      },
      solid: {
        item: {
          borderWidth: "1px",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
        itemIndicator: {
          bg: "bg",
          borderWidth: "1px",
          borderColor: "inherit",
          _checked: {
            color: "colorPalette.solid",
            borderColor: "currentcolor",
          },
        },
      },
    },
    justify: {
      start: {
        item: {
          "--radio-card-justify": "flex-start",
        },
      },
      end: {
        item: {
          "--radio-card-justify": "flex-end",
        },
      },
      center: {
        item: {
          "--radio-card-justify": "center",
        },
      },
    },
    align: {
      start: {
        item: {
          "--radio-card-align": "flex-start",
        },
        itemControl: {
          textAlign: "start",
        },
      },
      end: {
        item: {
          "--radio-card-align": "flex-end",
        },
        itemControl: {
          textAlign: "end",
        },
      },
      center: {
        item: {
          "--radio-card-align": "center",
        },
        itemControl: {
          textAlign: "center",
        },
      },
    },
    orientation: {
      vertical: {
        itemControl: {
          flexDirection: "column",
        },
      },
      horizontal: {
        itemControl: {
          flexDirection: "row",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
    align: "start",
    orientation: "horizontal",
  },
})
