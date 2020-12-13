import { ConfigStyle } from "@styled-system/core"

export * from "./positive-or-negative"
export * from "./types"

export const toProperty = (
  scale: string,
  property: ConfigStyle["property"],
): ConfigStyle => ({
  scale,
  property,
})
