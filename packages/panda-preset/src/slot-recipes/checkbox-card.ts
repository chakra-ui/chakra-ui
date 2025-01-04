import { defineSlotRecipe } from "../def"

export const checkboxCardSlotRecipe = defineSlotRecipe({
  slots: [
    "root",
    "control",
    "label",
    "description",
    "addon",
    "indicator",
    "content",
  ],
  className: "checkbox-card",
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      position: "relative",
      borderRadius: "l2",
      flex: "1",
      focusVisibleRing: "outside",
      _disabled: {
        opacity: "0.8",
        borderColor: "border.subtle",
      },
      _invalid: {
        outline: "2px solid",
        outlineColor: "border.error",
      },
    },
    control: {
      display: "inline-flex",
      flex: "1",
      position: "relative",
      borderRadius: "inherit",
      justifyContent: "var(--checkbox-card-justify)",
      alignItems: "var(--checkbox-card-align)",
    },
    label: {
      fontWeight: "medium",
      display: "flex",
      alignItems: "center",
      gap: "2",
      _disabled: {
        opacity: "0.5",
      },
    },
    description: {
      opacity: "0.64",
      textStyle: "sm",
    },
    addon: {
      _disabled: {
        opacity: "0.5",
      },
    },
    indicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      color: "white",
      borderWidth: "1px",
      borderColor: "transparent",
      borderRadius: "l1",
      focusVisibleRing: "outside",
      _icon: {
        boxSize: "full",
      },
      _invalid: {
        colorPalette: "red",
        borderColor: "border.error",
      },
      _disabled: {
        opacity: "0.5",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flex: "1",
      gap: "1",
      justifyContent: "var(--checkbox-card-justify)",
      alignItems: "var(--checkbox-card-align)",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          textStyle: "sm",
        },
        control: {
          padding: "3",
          gap: "1.5",
        },
        addon: {
          px: "3",
          py: "1.5",
          borderTopWidth: "1px",
        },
        indicator: {
          boxSize: "4",
        },
      },
      md: {
        root: {
          textStyle: "sm",
        },
        control: {
          padding: "4",
          gap: "2.5",
        },
        addon: {
          px: "4",
          py: "2",
          borderTopWidth: "1px",
        },
        indicator: {
          boxSize: "5",
          p: "0.5",
        },
      },
      lg: {
        root: {
          textStyle: "md",
        },
        control: {
          padding: "4",
          gap: "3.5",
        },
        addon: {
          px: "4",
          py: "2",
          borderTopWidth: "1px",
        },
        indicator: {
          boxSize: "6",
          p: "0.5",
        },
      },
    },
    variant: {
      surface: {
        root: {
          borderWidth: "1px",
          borderColor: "border",
          _checked: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
            borderColor: "colorPalette.muted",
          },
          _disabled: {
            bg: "bg.muted",
          },
        },
        indicator: {
          borderColor: "border",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
      },
      subtle: {
        root: {
          bg: "bg.muted",
        },
        control: {
          _checked: {
            bg: "colorPalette.muted",
            color: "colorPalette.fg",
          },
        },
        indicator: {
          "&:is([data-state=checked], [data-state=indeterminate])": {
            color: "colorPalette.fg",
          },
        },
      },
      outline: {
        root: {
          borderWidth: "1px",
          borderColor: "border",
          _checked: {
            boxShadow: "0 0 0 1px var(--shadow-color)",
            boxShadowColor: "colorPalette.solid",
            borderColor: "colorPalette.solid",
          },
        },
        indicator: {
          borderColor: "border",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
      },
      solid: {
        root: {
          borderWidth: "1px",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
        indicator: {
          borderColor: "border",
          color: "colorPalette.fg",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            borderColor: "colorPalette.solid",
          },
        },
      },
    },
    justify: {
      start: {
        root: {
          "--checkbox-card-justify": "flex-start",
        },
      },
      end: {
        root: {
          "--checkbox-card-justify": "flex-end",
        },
      },
      center: {
        root: {
          "--checkbox-card-justify": "center",
        },
      },
    },
    align: {
      start: {
        root: {
          "--checkbox-card-align": "flex-start",
        },
        content: {
          textAlign: "start",
        },
      },
      end: {
        root: {
          "--checkbox-card-align": "flex-end",
        },
        content: {
          textAlign: "end",
        },
      },
      center: {
        root: {
          "--checkbox-card-align": "center",
        },
        content: {
          textAlign: "center",
        },
      },
    },
    orientation: {
      vertical: {
        control: {
          flexDirection: "column",
        },
      },
      horizontal: {
        control: {
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
