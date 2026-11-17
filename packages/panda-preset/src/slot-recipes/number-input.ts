import { defineSlotRecipe } from "../def"

export const numberInputSlotRecipe = defineSlotRecipe({
  className: "number-input",
  slots: [
    "root",
    "label",
    "input",
    "control",
    "valueText",
    "incrementTrigger",
    "decrementTrigger",
    "scrubber",
  ],
  base: {
    root: {
      position: "relative",
      zIndex: "0",
      isolation: "isolate",
    },
    input: {
      width: "100%",
      minWidth: "0",
      outline: "0",
      position: "relative",
      appearance: "none",
      textAlign: "start",
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
      verticalAlign: "top",
      "&:where([data-scope=number-input][data-part=root]:has(> [data-scope=number-input][data-part=control]:not([hidden])) *)":
        {
          pe: "calc(var(--stepper-width) + 0.5rem)",
        },
    },
    control: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "auto",
      bottom: "0",
      insetEnd: "0px",
      margin: "1px",
      width: "var(--stepper-width)",
      height: "calc(var(--input-height) - 2px)",
      zIndex: "1",
      borderStartWidth: "1px",
      divideY: "1px",
    },
    incrementTrigger: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: "1",
      userSelect: "none",
      cursor: "button",
      lineHeight: "1",
      color: "fg.muted",
      "--stepper-base-radius": "radii.l1",
      "--stepper-radius": "calc(var(--stepper-base-radius) + 1px)",
      _icon: {
        boxSize: "1em",
      },
      _disabled: {
        opacity: "0.5",
      },
      _hover: {
        bg: "bg.muted",
      },
      _active: {
        bg: "bg.emphasized",
      },
      borderTopEndRadius: "var(--stepper-radius)",
    },
    decrementTrigger: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: "1",
      userSelect: "none",
      cursor: "button",
      lineHeight: "1",
      color: "fg.muted",
      "--stepper-base-radius": "radii.l1",
      "--stepper-radius": "calc(var(--stepper-base-radius) + 1px)",
      _icon: {
        boxSize: "1em",
      },
      _disabled: {
        opacity: "0.5",
      },
      _hover: {
        bg: "bg.muted",
      },
      _active: {
        bg: "bg.emphasized",
      },
      borderBottomEndRadius: "var(--stepper-radius)",
    },
    valueText: {
      fontWeight: "medium",
      fontFeatureSettings: "pnum",
      fontVariantNumeric: "proportional-nums",
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          "--input-height": "sizes.8",
          "--stepper-width": "sizes.4",
        },
        input: {
          textStyle: "xs",
          px: "2",
          "--input-height": "sizes.8",
        },
        control: {
          fontSize: "2xs",
        },
      },
      sm: {
        root: {
          "--input-height": "sizes.9",
          "--stepper-width": "sizes.5",
        },
        input: {
          textStyle: "sm",
          px: "2.5",
          "--input-height": "sizes.9",
        },
        control: {
          fontSize: "xs",
        },
      },
      md: {
        root: {
          "--input-height": "sizes.10",
          "--stepper-width": "sizes.6",
        },
        input: {
          textStyle: "sm",
          px: "3",
          "--input-height": "sizes.10",
        },
        control: {
          fontSize: "sm",
        },
      },
      lg: {
        root: {
          "--input-height": "sizes.11",
          "--stepper-width": "sizes.6",
        },
        input: {
          textStyle: "md",
          px: "4",
          "--input-height": "sizes.11",
        },
        control: {
          fontSize: "sm",
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
          focusRingColor: "var(--focus-color)",
        },
      },
      subtle: {
        input: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
          focusVisibleRing: "inside",
          focusRingColor: "var(--focus-color)",
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
            _invalid: {
              borderColor: "var(--error-color)",
              boxShadow: "0px 1px 0px 0px var(--error-color)",
            },
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
