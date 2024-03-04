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
  },
  variants: {
    isChecked: {
      true: {
        control: {
          ...checkboxSlotRecipe.variants?.isChecked?.true.control,
          _before: {
            content: `""`,
            display: "inline-block",
            pos: "relative",
            w: "50%",
            h: "50%",
            borderRadius: "50%",
            bg: "currentColor",
          },
        },
      },
    },
    size: {
      sm: {
        control: { w: "3", h: "3" },
        label: { fontSize: "sm" },
      },
      md: {
        control: { w: "4", h: "4" },
        label: { fontSize: "md" },
      },
      lg: {
        control: { w: "5", h: "5" },
        label: { fontSize: "lg" },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
