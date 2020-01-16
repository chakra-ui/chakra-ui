import * as React from "react";

function ensureFocus(ref: React.RefObject<HTMLInputElement>) {
  if (ref && ref.current) {
    ref.current.focus();
  }
}

export interface PinInputProviderProps {
  autoFocus?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (nextValue: string) => void;
  onComplete?: () => void;
}

type InputRefs = React.RefObject<HTMLInputElement>[];

export function usePinInputProvider(props: PinInputProviderProps = {}) {
  const { autoFocus } = props;

  const refs = React.useRef<InputRefs>([]);

  const [moveFocus, setMoveFocus] = React.useState(true);

  const [values, setValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (autoFocus) {
      const firstInputRef = refs.current[0];
      ensureFocus(firstInputRef);
    }
  }, [autoFocus]);

  const focusNext = React.useCallback(
    index => {
      if (!moveFocus) return;
      const nextInputRef = refs.current[index + 1];
      ensureFocus(nextInputRef);
    },
    [moveFocus],
  );

  const setValue = React.useCallback(
    (value: string, index: number) => {
      const nextValues = [...values];
      nextValues[index] = value;
      setValues(nextValues);
      focusNext(index);
    },
    [values, focusNext],
  );

  const register = React.useCallback(ref => {
    refs.current.push(ref);
  }, []);

  const unregister = React.useCallback(ref => {
    refs.current = refs.current.filter(_ref => _ref !== ref);
  }, []);

  const clear = React.useCallback(() => {
    const values: string[] = Array(refs.current.length).fill("");
    setValues(values);
    ensureFocus(refs.current[0]);
  }, []);

  const _setValues = React.useCallback((value: string[]) => {
    setValues(value);
  }, []);

  const _setMoveFocus = React.useCallback((value: boolean) => {
    setMoveFocus(value);
  }, []);

  return {
    refs: refs.current,
    register,
    unregister,
    setValue,
    values,
    setValues: _setValues,
    setMoveFocus: _setMoveFocus,
    clear,
  };
}

export interface PinInputProps {
  context: ReturnType<typeof usePinInputProvider>;
}

export function usePinInput({ context }: PinInputProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const { setValue, refs, values, setMoveFocus, setValues } = context;

  React.useLayoutEffect(() => {
    context.register(ref);
    return () => {
      context.unregister(ref);
    };
  }, [context]);

  const getNextValue = React.useCallback((currentValue, eventValue) => {
    let nextValue = eventValue;
    if (currentValue && currentValue.length > 0) {
      if (currentValue[0] === eventValue[0]) {
        nextValue = eventValue[1];
      } else if (currentValue[0] === eventValue[1]) {
        nextValue = eventValue[0];
      }
    }
    return nextValue;
  }, []);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const index = refs.indexOf(ref);
      const eventValue = event.target.value;
      const currentValue = values[index];
      const nextValue = getNextValue(currentValue, eventValue);

      // if the value was removed using backspace
      if (nextValue === "") {
        setValue("", index);
        return;
      }

      // in the case of an autocomplete or copy and paste
      if (eventValue.length > 2) {
        // see if we can use the string to fill out our values
        if (eventValue.match(/^[0-9]+$/)) {
          const length = refs.length;
          // ensure the value matches the number of inputs
          const nextValue = eventValue.split("").filter((_, i) => i < length);
          setValues(nextValue);
        }
        return;
      }

      // only set if the new value is a number
      if (nextValue.match(/^[0-9]$/)) {
        setValue(nextValue, index);
      }

      setMoveFocus(true);
    },
    [setValue, setMoveFocus, getNextValue, values, refs, setValues],
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace") {
        //@ts-ignore
        if (event.target.value === "") {
          const index = refs.indexOf(ref);
          if (refs[index - 1]) {
            setValue("", index - 1);
            const prevInputRef = refs[index - 1];
            ensureFocus(prevInputRef);
            setMoveFocus(true);
          }
        } else {
          setMoveFocus(false);
        }
      }
    },
    [setMoveFocus, refs, setValue],
  );

  const [hasFocus, setHasFocus] = React.useState(false);
  const onFocus = React.useCallback(() => {
    setHasFocus(true);
  }, []);
  const onBlur = React.useCallback(() => {
    setHasFocus(false);
  }, []);

  const value = values[refs.indexOf(ref)] || "";

  return {
    ref,
    onChange,
    onKeyDown,
    onFocus,
    onBlur,
    value,
    inputMode: "numeric" as React.InputHTMLAttributes<any>["inputMode"],
    "aria-label": "Please enter your pin code",
    autoComplete: "not-allowed",
    placeholder: hasFocus ? "" : "○",
    size: 1,
  };
}
