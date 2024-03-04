import { statAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const statSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      position: "relative",
      flex: "1 1 0%",
    },
    label: {
      fontWeight: "medium",
    },
    helpText: {
      opacity: 0.8,
      marginBottom: "2",
    },
    number: {
      verticalAlign: "baseline",
      fontWeight: "semibold",
    },
    icon: {
      marginEnd: 1,
      w: "3.5",
      h: "3.5",
      verticalAlign: "middle",
    },
  },
  variants: {
    size: {
      md: {
        label: { fontSize: "sm" },
        helpText: { fontSize: "sm" },
        number: { fontSize: "2xl" },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
