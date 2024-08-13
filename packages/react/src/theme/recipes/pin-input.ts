import { pinInputAnatomy } from "@ark-ui/anatomy"
import { mapEntries } from "@chakra-ui/utils"
import { defineSlotRecipe } from "../../styled-system"
import { inputRecipe } from "./input"

export const pinInputSlotRecipe = defineSlotRecipe({
  className: "pin-input",
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
          fontSize: "lg",
          w: 12,
          h: 12,
          borderRadius: "md",
        },
      },
      md: {
        input: {
          fontSize: "md",
          w: 10,
          h: 10,
          borderRadius: "md",
        },
      },
      sm: {
        input: {
          fontSize: "sm",
          w: 8,
          h: 8,
          borderRadius: "sm",
        },
      },
      xs: {
        input: {
          fontSize: "xs",
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
