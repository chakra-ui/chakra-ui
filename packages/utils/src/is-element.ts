import { FocusableElement } from "./types"

export function isHTMLElement(el: any): el is HTMLElement {
  return (
    el != null &&
    typeof el == "object" &&
    "nodeType" in el &&
    el.nodeType === Node.ELEMENT_NODE
  )
}

export function isBrowser() {
  return Boolean(globalThis?.document)
}

export function isInputElement(
  element: FocusableElement,
): element is HTMLInputElement {
  return (
    isHTMLElement(element) &&
    element.localName === "input" &&
    "select" in element
  )
}

export function isActiveElement(element: FocusableElement) {
  const doc = isHTMLElement(element) ? element.ownerDocument : document
  return doc.activeElement === (element as HTMLElement)
}

export function isHiddenElement(element: HTMLElement) {
  if (element.parentElement && isHiddenElement(element.parentElement))
    return true
  return element.hidden
}

export function isContentEditableElement(element: HTMLElement) {
  const value = element.getAttribute("contenteditable")
  return value !== "false" && value != null
}

export function isDisabledElement(element: HTMLElement) {
  return (
    Boolean(element.getAttribute("disabled")) === true ||
    Boolean(element.getAttribute("aria-disabled")) === true
  )
}
