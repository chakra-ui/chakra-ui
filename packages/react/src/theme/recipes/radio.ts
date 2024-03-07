import { radioAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { checkboxSlotRecipe } from "./checkbox"

export const radioSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: checkboxSlotRecipe.base!.root,
    label: checkboxSlotRecipe.base!.label,
    control: {
      ...checkboxSlotRecipe.base!.control,
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
    variant: checkboxSlotRecipe.variants!.variant,
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
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
