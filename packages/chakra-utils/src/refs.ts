import * as React from "react";

export const setRef = (ref: React.Ref<any>, value: any) => {
  if (ref == null) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    try {
      (ref as React.MutableRefObject<any>).current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
};

export function useRefs(ref1: React.Ref<any>, ref2: React.Ref<any>) {
  return React.useMemo(() => {
    if (ref1 == null && ref2 == null) return null;
    return (refValue: any) => {
      setRef(ref1, refValue);
      setRef(ref2, refValue);
    };
  }, [ref1, ref2]);
}
