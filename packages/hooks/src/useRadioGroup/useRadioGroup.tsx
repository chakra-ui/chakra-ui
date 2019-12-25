import * as React from "react";
import useControllableProp from "../useControllableProp";
import useId from "../useId";

type Value = string | number;
type Argument = React.ChangeEvent<HTMLInputElement> | Value;

export interface UseRadioGroupOptions {
  value?: Value;
  defaultValue?: Value;
  onChange?: (nextValue: Value) => void;
  name?: string;
}

export function useRadioGroup(props: UseRadioGroupOptions) {
  const [value, setValue] = React.useState<Value>(props.defaultValue || "");
  const [isControlled, derivedValue] = useControllableProp(props.value, value);

  // All radio options must use the same name
  const fallbackName = useId(`radio`);
  const name = props.name || fallbackName;

  const onChange = (arg: Argument) => {
    // Check if it the argument was an event object
    let _value = typeof arg === "object" ? arg.target.value : arg;

    if (!isControlled) {
      setValue(_value);
    }

    if (props.onChange) {
      props.onChange(_value);
    }
  };

  // TODO: Account for keyboard navigation in here with an option to turn it off
  // More like `useKeyboardNavigation` can be true | false

  return {
    name,
    value: derivedValue,
    onChange,
  };
}

export default useRadioGroup;
