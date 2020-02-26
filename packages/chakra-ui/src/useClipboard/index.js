import { useState, useEffect, useCallback } from "react";
import copy from "copy-to-clipboard";

export function useClipboard(value) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = useCallback(() => {
    const didCopy = copy(value);
    setHasCopied(didCopy);
  }, [value]);

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false);
      }, 1500);

      return () => clearTimeout(id);
    }
  }, [hasCopied]);

  return { value, onCopy, hasCopied };
}

export default useClipboard;
