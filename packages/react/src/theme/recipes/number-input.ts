import { numberInputAnatomy } from "../../anatomy"
import { defineSlotRecipe, defineStyle } from "../../styled-system"
import { mapEntries } from "../../utils"
import { inputRecipe } from "./input"

const triggerStyle = defineStyle({
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
})

export const numberInputSlotRecipe = defineSlotRecipe({
  className: "chakra-number-input",
  slots: numberInputAnatomy.extendWith("triggerGroup").keys(),
  base: {
    root: {
      pos: "relative",
      zIndex: "0",
      isolation: "isolate",
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
    input: {
      ...inputRecipe.base,
      verticalAlign: "top",
      pe: "calc(var(--stepper-width) + 0.5rem)!",
    },
    control: {
      pos: "relative",
    },
    triggerGroup: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "0",
      insetEnd: "0px",
      margin: "1px",
      width: "var(--stepper-width)",
      height: "calc(100% - 2px)",
      zIndex: "1",
      borderStartWidth: "1px",
      divideY: "1px",
    },
    incrementTrigger: {
      ...triggerStyle,
      borderTopEndRadius: "var(--stepper-radius)",
    },
    decrementTrigger: {
      ...triggerStyle,
      borderBottomEndRadius: "var(--stepper-radius)",
    },
    label: {
      fontWeight: "medium",
      userSelect: "none",
      textStyle: "sm",
      _disabled: {
        layerStyle: "disabled",
      },
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
          "--stepper-width": "sizes.4",
        },
        input: inputRecipe.variants!.size.xs,
        triggerGroup: {
          fontSize: "2xs",
        },
      },
      sm: {
        root: {
          "--stepper-width": "sizes.5",
        },
        input: inputRecipe.variants!.size.sm,
        triggerGroup: {
          fontSize: "xs",
        },
      },
      md: {
        root: {
          "--stepper-width": "sizes.6",
        },
        input: inputRecipe.variants!.size.md,
        triggerGroup: {
          fontSize: "sm",
        },
      },
      lg: {
        root: {
          "--stepper-width": "sizes.7",
        },
        input: inputRecipe.variants!.size.lg,
        triggerGroup: {
          fontSize: "sm",
        },
      },
    },

    variant: mapEntries(inputRecipe.variants!.variant, (key, variantStyles) => [
      key,
      { input: variantStyles },
    ]),
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
