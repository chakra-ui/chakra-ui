import { defineSemanticTokens } from "../../styled-system/index.ts"

export const semanticRadii = defineSemanticTokens.radii({
  l1: { value: "{radii.xs}" },
  l2: { value: "{radii.sm}" },
  l3: { value: "{radii.md}" },
})
