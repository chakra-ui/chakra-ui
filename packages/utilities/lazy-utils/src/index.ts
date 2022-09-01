export type LazyMode = "unmount" | "keepMounted"

interface LazyOptions {
  enabled?: boolean
  isSelected?: boolean
  wasSelected?: boolean
  mode?: LazyMode
}

/**
 * Determines whether the children of a disclosure widget
 * should be rendered or not, depending on the lazy behavior.
 *
 * Used in accordion, tabs, popover, menu and other disclosure
 * widgets.
 */
export function lazyDisclosure(options: LazyOptions) {
  const { wasSelected, enabled, isSelected, mode = "unmount" } = options

  // if not lazy, always render the disclosure's content
  if (!enabled) return true

  // if the disclosure is selected, render the disclosure's content
  if (isSelected) return true

  // if the disclosure was selected but not active, keep its content active
  if (mode === "keepMounted" && wasSelected) return true

  return false
}
