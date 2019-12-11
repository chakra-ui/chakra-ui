import * as React from "react";
import { Selection } from "../useSelection";
import useIsomorphicEffect from "../useIsomorphicEffect";

export function useDefaultValue(selection: Selection, defaultValue: any) {
  useIsomorphicEffect(() => {
    if (defaultValue && selection.items.length) {
      const option = selection.items.find(
        option => option.value === defaultValue,
      );
      if (option) {
        selection.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.items]);
}

export function useValue(selection: Selection, value: any) {
  useIsomorphicEffect(() => {
    if (value && selection.items.length) {
      const option = selection.items.find(option => option.value === value);
      if (option) {
        selection.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, selection.items]);
}
