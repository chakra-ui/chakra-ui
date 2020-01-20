import * as React from "react";
import { useControllableProp, useId } from "@chakra-ui/hooks";
import { isInputEvent } from "@chakra-ui/utils";

type Value = string | number;
type EventOrValue = React.ChangeEvent<HTMLInputElement> | Value;

export interface RadioGroupOptions {
  value?: Value;
  defaultValue?: Value;
  onChange?: (nextValue: Value) => void;
  name?: string;
}

export function useRadioGroup(props: RadioGroupOptions) {
  const { onChange: onChangeProp, value: valueProp, defaultValue } = props;

  const [valueState, setValue] = React.useState<Value>(defaultValue || "");
  const [isControlled, derivedValue] = useControllableProp(
    valueProp,
    valueState,
  );

  // All radio options must use the same name
  const fallbackName = useId(`radio`);
  const name = props.name || fallbackName;

  const onChange = React.useCallback(
    (eventOrValue: EventOrValue) => {
      const nextValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue;

      if (!isControlled) {
        setValue(nextValue);
      }

      if (onChangeProp) {
        onChangeProp(nextValue);
      }
    },
    [onChangeProp, isControlled],
  );

  return {
    name,
    value: derivedValue,
    onChange,
  };
}

export default useRadioGroup;
