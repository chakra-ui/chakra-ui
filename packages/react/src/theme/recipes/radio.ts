import { radioAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { checkboxSlotRecipe } from "./checkbox"

const { base, variants, compoundVariants } = checkboxSlotRecipe

export const radioSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    item: base!.root,
    label: base!.label,
    control: {
      ...base!.control,
      borderRadius: "full",
    },
    indicator: {
      height: "100%",
      width: "100%",
      borderRadius: "full",
      bg: "currentColor",
      scale: "0.4",
    },
  },
  variants: {
    variant: {
      ...variants!.variant,
      classic: {
        control: {
          borderWidth: "1px",
          borderColor: "inherit",
          _checked: {
            color: { base: "colorPalette.600", _dark: "colorPalette.300" },
            borderColor: "currentcolor",
          },
        },
        indicator: {
          scale: "0.6",
        },
      },
    },
    size: {
      sm: {
        control: { boxSize: "3" },
        label: { fontSize: "xs" },
      },
      md: {
        control: { boxSize: "4" },
        label: { fontSize: "sm" },
      },
      lg: {
        control: { boxSize: "5" },
        label: { fontSize: "md" },
      },
    },
  },
  compoundVariants,
  defaultVariants: {
    size: "md",
    variant: "outline",
    colorPalette: "gray",
  },
})
