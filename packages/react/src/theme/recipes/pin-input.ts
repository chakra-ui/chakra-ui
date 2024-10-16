import { pinInputAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { mapEntries } from "../../utils"
import { inputRecipe } from "./input"

const { variants, defaultVariants } = inputRecipe

export const pinInputSlotRecipe = defineSlotRecipe({
  className: "chakra-pin-input",
  slots: pinInputAnatomy.keys(),
  base: {
    input: {
      ...inputRecipe.base,
      textAlign: "center",
      width: "var(--input-height)",
    },
  },
  variants: {
    size: mapEntries(variants!.size, (key, value) => [key, { input: value }]),
    variant: mapEntries(variants!.variant, (key, value) => [
      key,
      { input: value },
    ]),
  },
  defaultVariants: defaultVariants,
})
