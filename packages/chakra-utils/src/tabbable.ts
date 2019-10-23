const focusableElements = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "embed",
  "iframe",
  "input:not([disabled])",
  "object",
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

export function getAllFocusables<T extends Element>(parentNode: T) {
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
