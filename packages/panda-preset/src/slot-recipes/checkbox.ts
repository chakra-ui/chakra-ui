import { defineSlotRecipe } from "../def"

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: ["root", "label", "control", "indicator", "group"],
  className: "checkbox",
  base: {
    root: {
      display: "inline-flex",
      gap: "2",
      alignItems: "center",
      verticalAlign: "top",
      position: "relative",
    },
    control: {
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
    label: {
      fontWeight: "medium",
      userSelect: "none",
      _disabled: {
        opacity: "0.5",
      },
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          gap: "1.5",
        },
        label: {
          textStyle: "xs",
        },
        control: {
          boxSize: "3",
        },
      },
      sm: {
        root: {
          gap: "2",
        },
        label: {
          textStyle: "sm",
        },
        control: {
          boxSize: "4",
        },
      },
      md: {
        root: {
          gap: "2.5",
        },
        label: {
          textStyle: "sm",
        },
        control: {
          boxSize: "5",
          p: "0.5",
        },
      },
      lg: {
        root: {
          gap: "3",
        },
        label: {
          textStyle: "md",
        },
        control: {
          boxSize: "6",
          p: "0.5",
        },
      },
    },
    variant: {
      outline: {
        control: {
          borderColor: "border",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            color: "colorPalette.fg",
            borderColor: "colorPalette.solid",
          },
        },
      },
      solid: {
        control: {
          borderColor: "border",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
      },
      subtle: {
        control: {
          bg: "colorPalette.muted",
          borderColor: "colorPalette.muted",
          "&:is([data-state=checked], [data-state=indeterminate])": {
            color: "colorPalette.fg",
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})
