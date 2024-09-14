import { isFocusable } from "./tabbable"

const focusableElList = [
  "input:not(:disabled):not([disabled])",
  "select:not(:disabled):not([disabled])",
  "textarea:not(:disabled):not([disabled])",
  "embed",
  "iframe",
  "object",
  "a[href]",
  "area[href]",
  "button:not(:disabled):not([disabled])",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]",
]

const focusableElSelector = focusableElList.join()

const isVisible = (el: HTMLElement) => el.offsetWidth > 0 && el.offsetHeight > 0

export function getAllFocusable<T extends HTMLElement>(container: T): T[] {
  const focusableEls: T[] = Array.from(
    container.querySelectorAll<T>(focusableElSelector),
  )
  focusableEls.unshift(container)
  return focusableEls.filter((el) => isFocusable(el) && isVisible(el))
}
