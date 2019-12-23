import * as React from "react";

function useRapidKeydown() {
  const [keys, setKeys] = React.useState<string[]>([]);
  const keysTimeoutRef = React.useRef<any>();

  const clearKeysAfterDelay = () => {
    if (keysTimeoutRef.current) {
      clearTimeout(keysTimeoutRef.current);
      keysTimeoutRef.current = null;
    }
    keysTimeoutRef.current = setTimeout(() => {
      setKeys([]);
      keysTimeoutRef.current = null;
    }, 300);
  };

  const onKeyDown = (callback: (str: string) => void) => (
    event: React.KeyboardEvent,
  ) => {
    const keyCode = event.keyCode || event.which;
    const isBackspace = keyCode === 8;
    const { key } = event;

    if (isBackspace) {
      let _keys = [...keys];
      _keys.pop();
      setKeys(_keys);
    } else {
      const isLetter = keyCode >= 65 && keyCode <= 90;
      const isNumber = keyCode >= 48 && keyCode <= 57;
      const isValid = isLetter || isNumber;

      if (isValid) {
        let _keys = keys.concat(key);
        callback(_keys.join(""));
        setKeys(_keys);
        clearKeysAfterDelay();
      }
    }
  };

  //@ts-ignore
  return [onKeyDown, keys.join("")] as const;
}

export default useRapidKeydown;
