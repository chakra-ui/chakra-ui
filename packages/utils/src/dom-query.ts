import { isFocusable, isTabbable, isHTMLElement } from "./tabbable"

const selectors = [
  "input",
  "select",
  "textarea",
  "a[href]",
  "area[href]",
  "button",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable=false])",
]

const selector = selectors.join()

export const isRightClick = <E extends MouseEvent | React.MouseEvent>(
  event: E,
) => event.button != 0

export function getAllFocusable<T extends Element>(container: T) {
  const allFocusable = Array.from(container.querySelectorAll<T>(selector))
  allFocusable.unshift(container)
  return allFocusable.filter(isFocusable)
}

export function getFirstFocusable<T extends Element>(container: T) {
  const allFocusable = getAllFocusable(container)
  return allFocusable.length ? allFocusable[0] : null
}

export function getAllTabbable<T extends Element>(
  container: T,
  fallbackToFocusable?: boolean,
) {
  const allFocusable = Array.from(container.querySelectorAll<T>(selector))
  const allTabbable = allFocusable.filter(isTabbable)

  if (isTabbable(container)) {
    allTabbable.unshift(container)
  }

  if (!allTabbable.length && fallbackToFocusable) {
    return allFocusable
  }
  return allTabbable
}

export function getFirstTabbableIn<T extends Element>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null {
  const [first] = getAllTabbable(container, fallbackToFocusable)
  return first || null
}

export function getLastTabbableIn<T extends Element>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null {
  const allTabbable = getAllTabbable(container, fallbackToFocusable)
  return allTabbable[allTabbable.length - 1] || null
}

export function getNextTabbable<T extends Element>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null {
  const allFocusable = getAllFocusable(container)
  const index = allFocusable.indexOf(document.activeElement as T)
  const slice = allFocusable.slice(index + 1)
  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  )
}

export function getPreviousTabbable<T extends Element>(
  container: T,
  fallbackToFocusable?: boolean,
): T | null {
  const allFocusable = getAllFocusable(container).reverse()
  const index = allFocusable.indexOf(document.activeElement as T)
  const slice = allFocusable.slice(index + 1)
  return (
    slice.find(isTabbable) ||
    allFocusable.find(isTabbable) ||
    (fallbackToFocusable ? slice[0] : null)
  )
}

export function focusNextTabbable<T extends Element>(
  container: T,
  fallbackToFocusable?: boolean,
) {
  const nextTabbable = getNextTabbable(container, fallbackToFocusable)
  if (nextTabbable && isHTMLElement(nextTabbable)) {
    nextTabbable.focus()
  }
}

export function focusPreviousTabbable<T extends Element>(
  container: T,
  fallbackToFocusable?: boolean,
) {
  const previousTabbable = getPreviousTabbable(container, fallbackToFocusable)
  if (previousTabbable && isHTMLElement(previousTabbable)) {
    previousTabbable.focus()
  }
}

function matches(element: Element, selectors: string): boolean {
  if ("matches" in element) return element.matches(selectors)
  if ("msMatchesSelector" in element)
    return (element as any).msMatchesSelector(selectors)
  return (element as any).webkitMatchesSelector(selectors)
}

export function closest<T extends Element>(element: T, selectors: string) {
  if ("closest" in element) return element.closest(selectors)
  do {
    if (matches(element, selectors)) return element
    element = (element.parentElement || element.parentNode) as any
  } while (element !== null && element.nodeType === 1)
  return null
}
