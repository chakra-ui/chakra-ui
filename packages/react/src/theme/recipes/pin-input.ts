import { pinInputAnatomy } from "../../anatomy.ts"
import { defineSlotRecipe } from "../../styled-system/index.ts"
import { mapEntries } from "../../utils/index.ts"
import { inputRecipe } from "./input.ts"

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
    control: {
      display: "inline-flex",
      gap: "2",
      isolation: "isolate",
    },
  },
  variants: {
    size: mapEntries(variants!.size, (key, value) => [
      key,
      { input: { ...value, px: "1" } },
    ]),
    variant: mapEntries(variants!.variant, (key, value) => [
      key,
      { input: value },
    ]),
    attached: {
      true: {
        control: {
          gap: "0",
          spaceX: "-1px",
        },
        input: {
          _notFirst: { borderStartRadius: "0" },
          _notLast: { borderEndRadius: "0" },
          _focusVisible: { zIndex: "1" },
        },
      },
    },
  },
  defaultVariants: defaultVariants,
})
