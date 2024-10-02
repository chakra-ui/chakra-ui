import { numberInputAnatomy } from "../../anatomy"
import { defineSlotRecipe, defineStyle } from "../../styled-system"
import { mapEntries } from "../../utils"
import { inputRecipe } from "./input"

const triggerStyle = defineStyle({
  bg: "bg",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  userSelect: "none",
  cursor: "button",
  lineHeight: "1",
  color: "fg.subtle",
  _disabled: {
    opacity: "0.5",
  },
  _hover: {
    bg: { _light: "gray.50", _dark: "gray.400/10" },
  },
  _active: {
    bg: { _light: "gray.100", _dark: "gray.400/20" },
  },
})

export const numberInputSlotRecipe = defineSlotRecipe({
  className: "chakra-number-input",
  slots: numberInputAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      zIndex: 0,
      isolation: "isolate",
    },
    input: {
      ...inputRecipe.base,
      verticalAlign: "top",
      paddingEnd: "calc(var(--stepper-width) + 0.5rem)",
    },
    control: {
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
    valueText: {
      fontWeight: "medium",
      fontFeatureSettings: "pnum",
      fontVariantNumeric: "proportional-nums",
    },
  },
  variants: {
    size: {
      xs: {
        input: inputRecipe.variants!.size.xs,
        control: {
          fontSize: "2xs",
          "--stepper-radius": "radii.sm",
          "--stepper-width": "sizes.4",
        },
      },
      sm: {
        input: inputRecipe.variants!.size.sm,
        control: {
          fontSize: "xs",
          "--stepper-radius": "radii.sm",
          "--stepper-width": "sizes.5",
        },
      },
      md: {
        input: inputRecipe.variants!.size.md,
        control: {
          fontSize: "sm",
          "--stepper-radius": "radii.md",
          "--stepper-width": "sizes.6",
        },
      },
      lg: {
        input: inputRecipe.variants!.size.lg,
        control: {
          fontSize: "sm",
          "--stepper-radius": "radii.md",
          "--stepper-width": "sizes.6",
        },
      },
    },

    variant: mapEntries(inputRecipe.variants!.variant, (key, variantStyles) => [
      key,
      { input: variantStyles },
    ]),
  },

  defaultVariants: inputRecipe.defaultVariants,
})
