import { useMemo, useLayoutEffect, useEffect } from "react";

export const assignRef = (ref, value) => {
  if (ref == null) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
};

const focusableElList = [
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

const focusableElSelector = focusableElList.join();

export function getFocusables(element, keyboardOnly = false) {
  let focusableEls = Array.from(element.querySelectorAll(focusableElSelector));

  // filter out elements with display: none
  focusableEls = focusableEls.filter(
    focusableEl => window.getComputedStyle(focusableEl).display !== "none",
  );

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(
      focusableEl => focusableEl.getAttribute("tabindex") !== "-1",
    );
  }

  return focusableEls;
}

/// Evaluate color in theme object

const colorKeyInTheme = (theme, color) => color in theme.colors;

const colorHueValue = (theme, color) => {
  let hasDot = color.search(".") !== -1;
  if (hasDot) {
    const [colorName, hue] = color.split(".");

    if (colorKeyInTheme(theme, colorName)) {
      return theme.colors[colorName][hue];
    }
  }
  return null;
};

export const getColorInTheme = (theme, color) => {
  if (colorKeyInTheme(theme, color)) {
    return theme.colors[color][500];
  }

  if (colorHueValue(theme, color)) {
    return colorHueValue(theme, color);
  }

  return color;
};

export function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useForkRef(refA, refB) {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

export function createChainedFunction(...funcs) {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}

export const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const wrapEvent = (theirHandler, ourHandler) => event => {
  if (theirHandler) {
    theirHandler(event);
  }

  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
};
