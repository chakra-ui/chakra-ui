import * as React from "react"
import { isString } from "./is"

export function getElementRef(el: React.ReactElement) {
  const version = React.version
  if (!isString(version)) return (el as any)?.ref
  if (version.startsWith("18.")) return (el as any)?.ref
  return (el as any)?.props?.ref
}
