import * as React from "react"

export function useButtonType(value?: React.ElementType) {
  const [isButton, setIsButton] = React.useState(!value)
  const refCallback = React.useCallback((node: HTMLElement | null) => {
    if (!node) return
    setIsButton(node.tagName === "BUTTON")
  }, [])
  const type = isButton ? "button" : undefined
  return { ref: refCallback, type } as const
}
