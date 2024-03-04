import { mapEntries } from "@chakra-ui/utils"
import { numberInputAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { inputRecipe } from "./input"

export const numberInputSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      position: "relative",
      zIndex: 0,
      "--stepper-width": "sizes.6",
    },
    field: {
      ...inputRecipe.base,
      verticalAlign: "top",
      paddingEnd: "calc(var(--stepper-width) + 0.5rem)",
    },
    stepperGroup: {
      width: "var(--stepper-width)",
    },
    stepper: {
      borderStart: "1px solid",
      borderStartColor: { base: "border", _dark: "whiteAlpha.300" },
      color: { base: "text", _dark: "whiteAlpha.800" },
      _active: {
        bg: { base: "gray.200", _dark: "whiteAlpha.300" },
      },
      _disabled: {
        opacity: "0.4",
        cursor: "not-allowed",
      },
      _last: {
        marginTop: "-1px",
        borderTopWidth: "1px",
      },
    },
  },
  variants: {
    size: {
      xs: {
        field: inputRecipe.variants!.size.xs,
        stepper: {
          fontSize: "2xs",
          _first: { borderTopEndRadius: "sm" },
          _last: { borderBottomEndRadius: "sm" },
        },
      },
      sm: {
        field: inputRecipe.variants!.size.sm,
        stepper: {
          fontSize: "xs",
          _first: { borderTopEndRadius: "sm" },
          _last: { borderBottomEndRadius: "sm" },
        },
      },
      md: {
        field: inputRecipe.variants!.size.md,
        stepper: {
          fontSize: "sm",
          _first: { borderTopEndRadius: "md" },
          _last: { borderBottomEndRadius: "md" },
        },
      },
      lg: {
        field: inputRecipe.variants!.size.lg,
        stepper: {
          fontSize: "sm",
          _first: { borderTopEndRadius: "md" },
          _last: { borderBottomEndRadius: "md" },
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
