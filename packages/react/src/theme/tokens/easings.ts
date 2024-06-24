import { defineTokens } from "../../styled-system"

export const easings = defineTokens.easings({
  linear: { value: "linear" },
  in: { value: "cubic-bezier(0.4, 0, 1, 1)" },
  out: { value: "cubic-bezier(0, 0, 0.2, 1)" },
  "in-out": { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
})
