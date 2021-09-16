// Really great work done by Diego Haz on this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/tabbable.ts

import { getOwnerDocument, isHTMLElement } from "./dom"

export const hasDisplayNone = (element: HTMLElement) =>
  window.getComputedStyle(element).display === "none"

export const hasTabIndex = (element: HTMLElement) =>
  element.hasAttribute("tabindex")

export const hasNegativeTabIndex = (element: HTMLElement) =>
  hasTabIndex(element) && element.tabIndex === -1

export function isDisabled(element: HTMLElement) {
  return (
    Boolean(element.getAttribute("disabled")) === true ||
    Boolean(element.getAttribute("aria-disabled")) === true
  )
}

export interface FocusableElement {
  focus(options?: FocusOptions): void
}

export function isInputElement(
  element: FocusableElement,
): element is HTMLInputElement {
  return (
    isHTMLElement(element) &&
    element.tagName.toLowerCase() === "input" &&
    "select" in element
  )
}

export function isActiveElement(element: FocusableElement) {
  const doc = isHTMLElement(element) ? getOwnerDocument(element) : document
  return doc.activeElement === (element as HTMLElement)
}

export function hasFocusWithin(element: HTMLElement) {
  if (!document.activeElement) return false
  return element.contains(document.activeElement)
}

export function isHidden(element: HTMLElement) {
  if (element.parentElement && isHidden(element.parentElement)) return true
  return element.hidden
}

export function isContentEditable(element: HTMLElement) {
  const value = element.getAttribute("contenteditable")
  return value !== "false" && value != null
}

export function isFocusable(element: HTMLElement) {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
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

  if (isContentEditable(element)) return true

  return hasTabIndex(element)
}

export function isTabbable(element?: HTMLElement | null) {
  if (!element) return false
  return (
    isHTMLElement(element) &&
    isFocusable(element) &&
    !hasNegativeTabIndex(element)
  )
}
