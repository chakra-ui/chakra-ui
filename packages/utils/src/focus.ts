// Original licensing for the following methods can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/calvellido/focus-options-polyfill
// See https://github.com/adobe/react-spectrum

import { getOwnerDocument } from "./dom"
import { warn } from "./function"
import { FocusableElement, isActiveElement, isInputElement } from "./tabbable"

export interface ExtendedFocusOptions extends FocusOptions {
  /**
   * Function that determines if the element is the active element
   */
  isActive?: typeof isActiveElement
  /**
   * If true, the element will be focused in the next tick
   */
  nextTick?: boolean
  /**
   * If true and element is an input element, the input's text will be selected
   */
  selectTextIfInput?: boolean
}

export function focus(
  element: FocusableElement | null,
  options: ExtendedFocusOptions = {},
) {
  const {
    isActive = isActiveElement,
    nextTick,
    preventScroll = true,
    selectTextIfInput = true,
  } = options

  if (!element || isActive(element)) return -1

  function triggerFocus() {
    if (!element) {
      warn({
        condition: true,
        message:
          "[chakra-ui]: can't call focus() on `null` or `undefined` element",
      })
      return
    }
    if (supportsPreventScroll()) {
      element.focus({ preventScroll })
    } else {
      element.focus()
      if (preventScroll) {
        const scrollableElements = getScrollableElements(element as HTMLElement)
        restoreScrollPosition(scrollableElements)
      }
    }

    if (isInputElement(element) && selectTextIfInput) {
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
  const win = doc.defaultView ?? window
  let parent = element.parentNode
  const scrollableElements: ScrollableElement[] = []
  const rootScrollingElement = doc.scrollingElement || doc.documentElement

  while (parent instanceof win.HTMLElement && parent !== rootScrollingElement) {
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

  if (rootScrollingElement instanceof win.HTMLElement) {
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
