import * as React from "react";
import useControllableValue from "./useControllableValue";

type Value = string | number;
type ArrayOfValue = Value[];

export interface UseCheckboxGroupOptions {
  value?: ArrayOfValue;
  defaultValue?: ArrayOfValue;
  onChange?: (newValue: ArrayOfValue) => void;
}

export function useCheckboxGroup(props: UseCheckboxGroupOptions) {
  const [value, setValue] = React.useState<ArrayOfValue>(
    props.defaultValue || [],
  );
  const [isControlled, derivedValue] = useControllableValue(props.value, value);

  const onChange = (arg: React.ChangeEvent<HTMLInputElement> | Value) => {
    if (!derivedValue) return;

    const checked =
      typeof arg === "object"
        ? arg.target.checked
        : !derivedValue.includes(arg);

    const selectedValue = typeof arg === "object" ? arg.target.value : arg;

    let newState: ArrayOfValue;

    if (checked) {
      newState = [...derivedValue, selectedValue];
    } else {
      newState = derivedValue.filter(val => val !== selectedValue);
    }

    if (!isControlled) {
      setValue(newState);
    }

    if (props.onChange) {
      props.onChange(newState);
    }
  };

  return {
    value: derivedValue,
    onChange,
  } as {
    value: Value[];
    onChange: (arg: Value | React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export default useCheckboxGroup;
