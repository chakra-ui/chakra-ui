import { defineTokens } from "../def"

export const letterSpacings = defineTokens.letterSpacings({
  tighter: {
    value: "-0.05em",
  },
  tight: {
    value: "-0.025em",
  },
  wide: {
    value: "0.025em",
  },
  wider: {
    value: "0.05em",
  },
  widest: {
    value: "0.1em",
  },
})
