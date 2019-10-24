import { useCallback, useState } from 'react';

export default function useFocus() {
  const [isFocused, setFocused] = useState(false);

  return [
    isFocused,
    {
      onFocus: useCallback(() => {
        setFocused(true);
      }, []),
      onBlur: useCallback(() => {
        setFocused(false);
      }, []),
    },
  ] as const;
}
