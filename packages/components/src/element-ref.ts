import * as React from "react"

export function getElementRef(el: React.ReactElement) {
  const version = React.version
  if (typeof version !== "string") return (el as any)?.ref
  if (version.startsWith("18.")) return (el as any)?.ref
  return (el as any)?.props?.ref
}
