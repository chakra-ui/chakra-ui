import * as React from "react";

export function useBoolean(initialValue: boolean) {
  const [value, setValue] = React.useState(!!initialValue);

  const on = React.useCallback(() => {
    setValue(true);
  }, []);

  const off = React.useCallback(() => {
    setValue(false);
  }, []);

  return [value, on, off] as const;
}

export default useBoolean;
