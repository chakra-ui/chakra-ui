import { ConfigStyle } from "@styled-system/core"
import * as CSS from "csstype"

export * from "./positive-or-negative"
export * from "./types"

export function makeConfig(
  scale: string,
  transform?: ConfigStyle["transform"],
) {
  return <T extends keyof CSS.Properties>(prop: T | T[]) => {
    const result: ConfigStyle = { scale }
    if (transform) result.transform = transform
    if (Array.isArray(prop)) result.properties = prop
    else result.property = prop
    return result
  }
}
