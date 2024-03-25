import { compact } from "@chakra-ui/utils"
import { ToastPlacement } from "./toast.types"

export function getToastStyle(): React.CSSProperties {
  return {
    pointerEvents: "auto",
    maxWidth: 560,
    minWidth: 300,
  }
}

export function getToastGroupStyle(
  position: ToastPlacement,
): React.CSSProperties {
  const isTopOrBottom = position === "top" || position === "bottom"
  const margin = isTopOrBottom ? "0 auto" : undefined

  let alignItems = "center"
  if (position.includes("end")) alignItems = "flex-end"
  if (position.includes("start")) alignItems = "flex-start"

  const top = position.includes("top")
    ? "env(safe-area-inset-top, 0px)"
    : undefined

  const bottom = position.includes("bottom")
    ? "env(safe-area-inset-bottom, 0px)"
    : undefined

  const end = !position.includes("start")
    ? "env(safe-area-inset-right, 0px)"
    : undefined

  const start = !position.includes("end")
    ? "env(safe-area-inset-left, 0px)"
    : undefined

  return compact({
    position: "fixed",
    zIndex: "var(--toast-z-index, 5500)",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    alignItems,
    padding: "var(--toast-gutter, 0.5rem)",
    margin,
    top,
    bottom,
    insetInlineEnd: end,
    insetInlineStart: start,
  })
}
