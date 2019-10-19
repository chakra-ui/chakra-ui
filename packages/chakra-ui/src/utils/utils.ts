import {
  useMemo,
  useLayoutEffect,
  useEffect,
  MutableRefObject,
  Ref,
} from "react";
import { canUseDOM } from "exenv";

export const assignRef = (ref: Ref<any>, value: any) => {
  if (ref == null) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    try {
      (ref as MutableRefObject<any>).current = value;
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

export function getFocusables(domNode: HTMLElement, keyboardOnly = false) {
  let focusableEls: HTMLElement[] = Array.from(
    domNode.querySelectorAll(focusableElSelector),
  );

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

export function useRefs(refA: Ref<any>, refB: Ref<any>) {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: any) => {
      assignRef(refA, refValue);
      assignRef(refB, refValue);
    };
  }, [refA, refB]);
}

export function createChainedFunction(...funcs: any[]) {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(this: any, ...args: any[]) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}

export const useEnhancedEffect = canUseDOM ? useEffect : useLayoutEffect;

export function wrapEvent<T extends (event: any) => void>(
  theirHandler: T,
  ourHandler: T,
) {
  return function(event: Parameters<T>[0]) {
    if (typeof theirHandler === "function") {
      theirHandler(event);
    }

    if (!event.defaultPrevented && typeof ourHandler === "function") {
      return ourHandler(event);
    }
  };
}

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

export const isObject = (input: any) =>
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
