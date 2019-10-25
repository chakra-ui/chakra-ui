import * as React from "react";

export function assignRef<R>(ref: React.Ref<R>, value: any) {
  if (ref == null) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    try {
      (ref as React.MutableRefObject<R>).current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

export function mergeRefs<R>(ref1: React.Ref<R>, ref2: React.Ref<R>) {
  if (ref1 == null && ref2 == null) return null;
  return (node: R) => {
    assignRef(ref1, node);
    assignRef(ref2, node);
  };
}
