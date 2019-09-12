import * as React from "react";

export function assignRef<T>(ref: T, value: T): T;
export function mergeRefs<T>(refs: T, value: T): T;
export function getFocusables<T>(
  element: React.ReactNode,
  keyboardOnly: boolean,
): T;
