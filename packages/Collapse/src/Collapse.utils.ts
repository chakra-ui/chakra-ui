import * as React from "react";

export function getElementHeight(el: React.RefObject<HTMLElement>) {
  if (!el || !el.current) return "auto";
  return el.current.scrollHeight;
}

export const defaultTransitionStyles: React.CSSProperties = {
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
};

export function join(str: string | undefined) {
  if (str) {
    const styles = ["height"];
    styles.push(...str.split(", "));
    return styles.join(", ");
  }
  return "height";
}

interface TransitionOptions {
  collapseStyles?: React.CSSProperties;
  expandStyles?: React.CSSProperties;
}

export function makeTransitionStyles(options: TransitionOptions) {
  const {
    expandStyles = defaultTransitionStyles,
    collapseStyles = defaultTransitionStyles,
  } = options;
  return {
    expandStyles: {
      ...expandStyles,
      transitionProperty: join(expandStyles.transitionProperty),
    },
    collapseStyles: {
      ...collapseStyles,
      transitionProperty: join(collapseStyles.transitionProperty),
    },
  };
}
