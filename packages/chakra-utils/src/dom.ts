import { canUseDOM } from "exenv";

const focusableElements = [
  "a[href]",
  "area[href]",
  "embed",
  "iframe",
  "object",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]",
];

const focusableSelector = focusableElements.join();

function hasDisplayNone(element: Element) {
  return window.getComputedStyle(element).display === "none";
}

function hasTabIndex(element: Element) {
  return element.hasAttribute("tabindex");
}

function hasNegativeTabIndex(element: HTMLElement) {
  return hasTabIndex(element) && element.tabIndex === -1;
}

function isDisabled(element: HTMLElement) {
  return Boolean(element.getAttribute("disabled")) == true;
}

export function getAllFocusables<T extends HTMLElement>(parentNode: T) {
  const focusableEls: HTMLElement[] = Array.from(
    parentNode.querySelectorAll(focusableSelector),
  );

  const filteredElements = focusableEls.filter(
    element =>
      !hasDisplayNone(element) &&
      !hasNegativeTabIndex(element) &&
      !isDisabled(element),
  );

  return filteredElements;
}

export function hasFocusWithin(element: Element) {
  if (!document.activeElement) return false;
  return element.contains(document.activeElement);
}

export { canUseDOM };

export function focusWithoutScroll<T extends HTMLElement>(element: T) {
  if (canUseDOM) {
    const x = window.scrollX;
    const y = window.scrollY;
    element.focus();
    window.scrollTo(x, y);
  } else {
    element.focus();
  }
}
