import { defineTokens } from "../../styled-system"

export const durations = defineTokens.durations({
  "ultra-fast": { value: "50ms" },
  faster: { value: "100ms" },
  fast: { value: "150ms" },
  normal: { value: "200ms" },
  slow: { value: "300ms" },
  slower: { value: "400ms" },
  "ultra-slow": { value: "500ms" },
})
