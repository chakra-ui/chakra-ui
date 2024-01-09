import { isHTMLElement } from "./is-element"

function isScrollParent(el: HTMLElement): boolean {
  const win = el.ownerDocument.defaultView || window
  const { overflow, overflowX, overflowY } = win.getComputedStyle(el)
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)
}

function getParent(el: HTMLElement): HTMLElement {
  if (el.localName === "html") return el
  return el.assignedSlot || el.parentElement || el.ownerDocument.documentElement
}

export function getScrollParent(el: HTMLElement): HTMLElement {
  if (["html", "body", "#document"].includes(el.localName)) {
    return el.ownerDocument.body
  }

  if (isHTMLElement(el) && isScrollParent(el)) {
    return el
  }

  return getScrollParent(getParent(el))
}
