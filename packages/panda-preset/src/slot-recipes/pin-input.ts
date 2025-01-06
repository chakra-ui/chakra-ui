import { defineSlotRecipe } from "../def"

export const pinInputSlotRecipe = defineSlotRecipe({
  className: "pin-input",
  slots: ["root", "label", "input", "control"],
  base: {
    input: {
      width: "var(--input-height)",
      minWidth: "0",
      outline: "0",
      position: "relative",
      appearance: "none",
      textAlign: "center",
      borderRadius: "l2",
      _disabled: {
        layerStyle: "disabled",
      },
      height: "var(--input-height)",
      minW: "var(--input-height)",
      "--focus-color": "colors.colorPalette.focusRing",
      "--error-color": "colors.border.error",
      _invalid: {
        focusRingColor: "var(--error-color)",
        borderColor: "var(--error-color)",
      },
    },
  },
  variants: {
    size: {
      "2xs": {
        input: {
          textStyle: "xs",
          px: "2",
          "--input-height": "sizes.7",
        },
      },
      xs: {
        input: {
          textStyle: "xs",
          px: "2",
          "--input-height": "sizes.8",
        },
      },
      sm: {
        input: {
          textStyle: "sm",
          px: "2.5",
          "--input-height": "sizes.9",
        },
      },
      md: {
        input: {
          textStyle: "sm",
          px: "3",
          "--input-height": "sizes.10",
        },
      },
      lg: {
        input: {
          textStyle: "md",
          px: "4",
          "--input-height": "sizes.11",
        },
      },
      xl: {
        input: {
          textStyle: "md",
          px: "4.5",
          "--input-height": "sizes.12",
        },
      },
      "2xl": {
        input: {
          textStyle: "lg",
          px: "5",
          "--input-height": "sizes.16",
        },
      },
    },
    variant: {
      outline: {
        input: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "border",
          focusVisibleRing: "inside",
        },
      },
      subtle: {
        input: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
          focusVisibleRing: "inside",
        },
      },
      flushed: {
        input: {
          bg: "transparent",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
          borderRadius: "0",
          px: "0",
          _focusVisible: {
            borderColor: "var(--focus-color)",
            boxShadow: "0px 1px 0px 0px var(--focus-color)",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
