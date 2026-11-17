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
  slots: numberInputAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      zIndex: "0",
      isolation: "isolate",
    },
    input: {
      ...inputRecipe.base,
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
        root: {
          "--input-height": inputRecipe.variants!.size.xs["--input-height"],
          "--stepper-width": "sizes.4",
        },
        input: inputRecipe.variants!.size.xs,
        control: {
          fontSize: "2xs",
        },
      },
      sm: {
        root: {
          "--input-height": inputRecipe.variants!.size.sm["--input-height"],
          "--stepper-width": "sizes.5",
        },
        input: inputRecipe.variants!.size.sm,
        control: {
          fontSize: "xs",
        },
      },
      md: {
        root: {
          "--input-height": inputRecipe.variants!.size.md["--input-height"],
          "--stepper-width": "sizes.6",
        },
        input: inputRecipe.variants!.size.md,
        control: {
          fontSize: "sm",
        },
      },
      lg: {
        root: {
          "--input-height": inputRecipe.variants!.size.lg["--input-height"],
          "--stepper-width": "sizes.6",
        },
        input: inputRecipe.variants!.size.lg,
        control: {
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
