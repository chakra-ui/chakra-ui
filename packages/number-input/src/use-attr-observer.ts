import { getOwnerWindow } from "@chakra-ui/utils"
import * as React from "react"

export function useAttributeObserver(
  ref: React.RefObject<HTMLElement | null>,
  attributes: string | string[],
  fn: (v: MutationRecord) => void,
  enabled: boolean,
) {
  React.useEffect(() => {
    if (!ref.current || !enabled) return
    const win = getOwnerWindow(ref.current)
    const attrs = Array.isArray(attributes) ? attributes : [attributes]
    const obs = new win.MutationObserver((changes) => {
      for (const change of changes) {
        if (
          change.type === "attributes" &&
          change.attributeName &&
          attrs.includes(change.attributeName)
        ) {
          fn(change)
        }
      }
    })

    obs.observe(ref.current, { attributes: true, attributeFilter: attrs })

    return () => obs.disconnect()
  })
}
