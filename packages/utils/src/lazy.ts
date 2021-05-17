export type LazyBehavior = "unmount" | "keepMounted"

interface DetermineLazyBehaviorOptions {
  hasBeenSelected?: boolean
  isLazy?: boolean
  isSelected?: boolean
  lazyBehavior?: LazyBehavior
}

/**
 * Determines whether the children of a disclosure widget
 * should be rendered or not, depending on the lazy behavior.
 *
 * Used in accordion, tabs, popover, menu and other disclosure
 * widgets.
 */
export function determineLazyBehavior(options: DetermineLazyBehaviorOptions) {
  const {
    hasBeenSelected,
    isLazy,
    isSelected,
    lazyBehavior = "unmount",
  } = options

  // if not lazy, always render the disclosure's content
  if (!isLazy) return true

  // if the diclosure is selected, render the disclosure's content
  if (isSelected) return true

  // if the disclosure was selected but not active, keep its content active
  if (lazyBehavior === "keepMounted" && hasBeenSelected) return true

  return false
}
