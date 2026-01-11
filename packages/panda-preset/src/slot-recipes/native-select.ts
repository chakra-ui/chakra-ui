import { defineSlotRecipe } from "../def"

export const nativeSelectSlotRecipe = defineSlotRecipe({
  className: "native-select",
  slots: ["root", "field", "indicator"],
  base: {
    root: {
      height: "fit-content",
      display: "flex",
      width: "100%",
      position: "relative",
    },
    field: {
      width: "100%",
      minWidth: "0",
      outline: "0",
      appearance: "none",
      borderRadius: "l2",
      "--error-color": "colors.border.error",
      "--input-height": "var(--select-field-height)",
      height: "var(--select-field-height)",
      _disabled: {
        layerStyle: "disabled",
      },
      _invalid: {
        focusRingColor: "var(--error-color)",
        borderColor: "var(--error-color)",
      },
      focusVisibleRing: "inside",
      lineHeight: "normal",
      "& > option, & > optgroup": {
        bg: "bg",
      },
    },
    indicator: {
      position: "absolute",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
      height: "100%",
      color: "fg.muted",
      _disabled: {
        opacity: "0.5",
      },
      _invalid: {
        color: "fg.error",
      },
      _icon: {
        width: "1em",
        height: "1em",
      },
    },
  },
  variants: {
    variant: {
      outline: {
        field: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "border",
          _expanded: {
            borderColor: "border.emphasized",
          },
        },
      },
      subtle: {
        field: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
        },
      },
      plain: {
        field: {
          bg: "transparent",
          color: "fg",
          focusRingWidth: "2px",
        },
      },
      ghost: {
        field: {
          bg: "transparent",
          _expanded: {
            bg: "bg.muted",
          },
        },
      },
    },
    size: {
      xs: {
        root: {
          "--select-field-height": "sizes.8",
        },
        field: {
          textStyle: "xs",
          ps: "2",
          pe: "6",
        },
        indicator: {
          textStyle: "sm",
          insetEnd: "1.5",
        },
      },
      sm: {
        root: {
          "--select-field-height": "sizes.9",
        },
        field: {
          textStyle: "sm",
          ps: "2.5",
          pe: "8",
        },
        indicator: {
          textStyle: "md",
          insetEnd: "2",
        },
      },
      md: {
        root: {
          "--select-field-height": "sizes.10",
        },
        field: {
          textStyle: "sm",
          ps: "3",
          pe: "8",
        },
        indicator: {
          textStyle: "lg",
          insetEnd: "2",
        },
      },
      lg: {
        root: {
          "--select-field-height": "sizes.11",
        },
        field: {
          textStyle: "md",
          ps: "4",
          pe: "8",
        },
        indicator: {
          textStyle: "xl",
          insetEnd: "3",
        },
      },
      xl: {
        root: {
          "--select-field-height": "sizes.12",
        },
        field: {
          textStyle: "md",
          ps: "4.5",
          pe: "10",
        },
        indicator: {
          textStyle: "xl",
          insetEnd: "3",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
