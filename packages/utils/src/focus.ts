// Original licensing for the following methods can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/calvellido/focus-options-polyfill
// See https://github.com/adobe/react-spectrum

import { getOwnerDocument } from "./dom"
import { isHTMLElement } from "./tabbable"

export interface FocusableElement {
  focus(options?: FocusOptions): void
}

function isInputElement(
  element: FocusableElement,
): element is HTMLInputElement {
  return (
    isHTMLElement(element) &&
    element.tagName.toLowerCase() === "input" &&
    "select" in element
  )
}

function getActiveElement(element: FocusableElement) {
  const doc =
    element instanceof HTMLElement ? getOwnerDocument(element) : document
  return doc.activeElement === (element as HTMLElement)
}

interface FocusProps extends FocusOptions {
  /**
   * Function that determines if the element is the active element
   */
  isActive?: typeof getActiveElement
  /**
   * If true, the element will be focused in the next tick
   */
  nextTick?: boolean
}

export function focus(element: FocusableElement, options: FocusProps = {}) {
  const {
    isActive = getActiveElement,
    nextTick = true,
    preventScroll,
  } = options

  if (isActive(element)) return -1

  function triggerFocus() {
    if (supportsPreventScroll()) {
      element.focus({ preventScroll })
    } else {
      element.focus()
      if (preventScroll) {
        const scrollableElements = getScrollableElements(element as HTMLElement)
        restoreScrollPosition(scrollableElements)
      }
    }

    if (isInputElement(element)) {
      element.select()
    }
  }

  if (nextTick) {
    return requestAnimationFrame(triggerFocus)
  }

  triggerFocus()
  return -1
}

let supportsPreventScrollCached: boolean | null = null
function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false
    try {
      const div = document.createElement("div")
      div.focus({
        get preventScroll() {
          supportsPreventScrollCached = true
          return true
        },
      })
    } catch (e) {
      // Ignore
    }
  }

  return supportsPreventScrollCached
}

interface ScrollableElement {
  element: HTMLElement
  scrollTop: number
  scrollLeft: number
}

function getScrollableElements(element: HTMLElement): ScrollableElement[] {
  const doc = getOwnerDocument(element)
  let parent = element.parentNode
  const scrollableElements: ScrollableElement[] = []
  const rootScrollingElement = doc.scrollingElement || doc.documentElement

  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (
      parent.offsetHeight < parent.scrollHeight ||
      parent.offsetWidth < parent.scrollWidth
    ) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      })
    }
    parent = parent.parentNode
  }

  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft,
    })
  }

  return scrollableElements
}

function restoreScrollPosition(scrollableElements: ScrollableElement[]) {
  for (const { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop
    element.scrollLeft = scrollLeft
  }
}
