import { useMemo, useLayoutEffect, useEffect } from "react";
import { useTheme } from "../ThemeProvider";

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

export const isReducedMotion = () => {
  const { matches } = window.matchMedia("(prefers-reduced-motion: reduce)");
  return matches;
};

export const prefersReducedMotion = () => ({
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
    transition: "none",
  },
});

export const isObject = input =>
  input != null && typeof input === "object" && Object.keys(input).length > 0;

export const inputProps = [
  "name",
  "type",
  "autoFocus",
  "size",
  "form",
  "pattern",
  "placeholder",
  "onBlur",
  "onChange",
  "onKeyDown",
  "onKeyUp",
  "onKeyPress",
  "onFocus",
  "id",
  "autoFocus",
  "aria-label",
  "aria-describedby",
  "aria-labelledby",
  "min",
  "max",
  "maxLength",
  "minLength",
  "step",
  "defaultValue",
  "value",
  "isReadOnly",
  "isFullWidth",
  "isDisabled",
  "isInvalid",
  "isRequired",
];

export function useVariantColorWarning(label, variantColor) {
  const theme = useTheme();
  const variantColorIsDefined = variantColor != null;

  if (variantColorIsDefined) {
    const variantColorExists = variantColor in theme.colors;
    // If variant color exists in theme object
    if (!variantColorExists) {
      throw Error(
        `You passed an invalid variantColor to the ${label} Component. Variant color values must be a color key in the theme object that has '100' - '900' color values. Check http://chakra-ui.com/theme#colors to see possible values`,
      );
    }

    // if variant color exists and is an object
    // TODO: Check for the 100 - 900 keys
    if (variantColorExists) {
      const colorObj = theme.colors[variantColor];
      const variantColorIsObject =
        typeof colorObj === "object" && Object.keys(colorObj).length > 0;

      if (!variantColorIsObject) {
        throw Error(
          `${label}: The variantColor passed exists in the theme object but is not valid. For a color to be a valid variantColor, it must be an object that has '100' - '900' color values. Use a tool like: 
        https://smart-swatch.netlify.com/ to generate color values quickly`,
        );
      }
    }
  }
}
