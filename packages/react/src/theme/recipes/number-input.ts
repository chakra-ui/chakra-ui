import { mapEntries } from "@chakra-ui/utils"
import { numberInputAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe, defineStyle } from "../../styled-system"
import { inputRecipe } from "./input"

const stepperStyle = defineStyle({
  bg: "bg",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  userSelect: "none",
  lineHeight: "1",
  color: "fg.muted",
  _disabled: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
  _hover: {
    bg: { base: "gray.50", _dark: "gray.400/10" },
  },
  _active: {
    bg: { base: "gray.100", _dark: "gray.400/20" },
  },
})

export const numberInputSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      position: "relative",
      zIndex: 0,
      colorPalette: "gray",
    },
    field: {
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
      isolation: "isolate",
      zIndex: 1,
      borderStartWidth: "1px",
      divideY: "1px",
    },
    incrementTrigger: {
      ...stepperStyle,
      borderTopEndRadius: "var(--stepper-radius)",
    },
    decrementTrigger: {
      ...stepperStyle,
      borderBottomEndRadius: "var(--stepper-radius)",
    },
  },
  variants: {
    size: {
      xs: {
        field: inputRecipe.variants!.size.xs,
        control: {
          fontSize: "2xs",
          "--stepper-radius": "radii.sm",
          "--stepper-width": "sizes.4",
        },
      },
      sm: {
        field: inputRecipe.variants!.size.sm,
        control: {
          fontSize: "xs",
          "--stepper-radius": "radii.sm",
          "--stepper-width": "sizes.5",
        },
      },
      md: {
        field: inputRecipe.variants!.size.md,
        control: {
          fontSize: "sm",
          "--stepper-radius": "radii.md",
          "--stepper-width": "sizes.6",
        },
      },
      lg: {
        field: inputRecipe.variants!.size.lg,
        control: {
          fontSize: "sm",
          "--stepper-radius": "radii.md",
          "--stepper-width": "sizes.6",
        },
      },
    },
    variant: mapEntries(inputRecipe.variants!.variant, (key, value) => [
      key,
      { field: value },
    ]),
  },
  defaultVariants: inputRecipe.defaultVariants,
})
