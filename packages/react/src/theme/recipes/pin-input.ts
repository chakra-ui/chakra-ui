import { pinInputAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { mapEntries } from "../../utils"
import { inputRecipe } from "./input"

export const pinInputSlotRecipe = defineSlotRecipe({
  className: "chakra-pin-input",
  slots: pinInputAnatomy.keys(),
  base: {
    input: {
      ...inputRecipe.base,
      textAlign: "center",
    },
  },
  variants: {
    size: {
      lg: {
        input: {
          textStyle: "lg",
          w: 12,
          h: 12,
          borderRadius: "md",
        },
      },
      md: {
        input: {
          textStyle: "md",
          w: 10,
          h: 10,
          borderRadius: "md",
        },
      },
      sm: {
        input: {
          textStyle: "sm",
          w: 8,
          h: 8,
          borderRadius: "sm",
        },
      },
      xs: {
        input: {
          textStyle: "xs",
          w: 6,
          h: 6,
          borderRadius: "sm",
        },
      },
    },
    variant: mapEntries(inputRecipe.variants!.variant, (key, value) => [
      key,
      { input: value },
    ]),
  },
  defaultVariants: inputRecipe.defaultVariants,
})
