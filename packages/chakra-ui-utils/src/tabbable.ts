// Really great work done by Diego Haz on this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/tabbable.ts

export function hasDisplayNone(element: Element) {
  return window.getComputedStyle(element).display === "none";
}

export function hasTabIndex(element: Element) {
  return element.hasAttribute("tabindex");
}

export function hasNegativeTabIndex(element: HTMLElement) {
  return hasTabIndex(element) && element.tabIndex === -1;
}

export function isDisabled(element: HTMLElement) {
  return Boolean(element.getAttribute("disabled")) == true;
}

export function hasFocusWithin(element: Element) {
  if (!document.activeElement) return false;
  return element.contains(document.activeElement);
}

export function isHTMLElement(element: Element): element is HTMLElement {
  return element instanceof HTMLElement;
}

export function isHidden(element: HTMLElement) {
  if (element.parentElement && isHidden(element.parentElement)) return true;
  return element.hidden;
}

export function isContentEditable(element: HTMLElement) {
  const value = element.getAttribute("contenteditable");
  return value !== "false" && value != null;
}

export function isFocusable(element: Element) {
  if (!isHTMLElement(element)) return false;
  if (isHidden(element)) return false;
  if (isDisabled(element)) return false;

  const { localName } = element;
  const focusableTags = ["input", "select", "textarea", "button"];

  if (focusableTags.indexOf(localName) >= 0) return true;

  const others = {
    a: () => element.hasAttribute("href"),
    audio: () => element.hasAttribute("controls"),
    video: () => element.hasAttribute("controls"),
  };

  if (localName in others) {
    return others[localName as keyof typeof others]();
  }

  if (isContentEditable(element)) return true;

  return hasTabIndex(element);
}

function defaultIsActive(element: Element) {
  return document.activeElement === element;
}

type EnsureFocusOptions = FocusOptions & {
  isActive?: typeof defaultIsActive;
};

export function ensureFocus(
  element: HTMLElement,
  { isActive = defaultIsActive, preventScroll }: EnsureFocusOptions = {},
) {
  if (isActive(element)) return -1;

  element.focus({ preventScroll });

  if (isActive(element)) return -1;

  return requestAnimationFrame(() => {
    element.focus({ preventScroll });
  });
}

export function isTabbable(element: Element) {
  return (
    isHTMLElement(element) &&
    isFocusable(element) &&
    !hasNegativeTabIndex(element)
  );
}
