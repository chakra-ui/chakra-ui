import {
  isContentEditableElement,
  isDisabledElement,
  isHTMLElement,
  isHiddenElement,
} from "./is-element"

export const hasTabIndex = (element: HTMLElement) =>
  element.hasAttribute("tabindex")

export function isFocusable(element: HTMLElement) {
  if (
    !isHTMLElement(element) ||
    isHiddenElement(element) ||
    isDisabledElement(element)
  ) {
    return false
  }

  const { localName } = element
  const focusableTags = ["input", "select", "textarea", "button"]
  if (focusableTags.indexOf(localName) >= 0) return true

  const others = {
    a: () => element.hasAttribute("href"),
    audio: () => element.hasAttribute("controls"),
    video: () => element.hasAttribute("controls"),
  }

  if (localName in others) {
    return others[localName as keyof typeof others]()
  }

  if (isContentEditableElement(element)) return true

  return hasTabIndex(element)
}
