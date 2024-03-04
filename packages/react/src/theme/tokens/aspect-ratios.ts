import { defineTokens } from "../../styled-system"

export const aspectRatios = defineTokens.aspectRatios({
  square: { value: "1 / 1" },
  landscape: { value: "4 / 3" },
  portrait: { value: "3 / 4" },
  wide: { value: "16 / 9" },
  ultrawide: { value: "18 / 5" },
  golden: { value: "1.618 / 1" },
})
