import * as React from "react";
import { useControllableProp } from "@chakra-ui/hooks";
import { isInputEvent } from "@chakra-ui/utils";

type Value = string | number;
type ArrayOfValue = Value[];

export interface CheckboxGroupProps {
  value?: ArrayOfValue;
  defaultValue?: ArrayOfValue;
  onChange?: (nextState: ArrayOfValue) => void;
}

export function useCheckboxGroup(props: CheckboxGroupProps) {
  const { defaultValue, value: valueProp, onChange: onChangeProp } = props;
  const [valueState, setValue] = React.useState(defaultValue || []);
  const [isControlled, value] = useControllableProp(valueProp, valueState);

  const updateValue = React.useCallback(
    (nextState: Value[]) => {
      if (!isControlled) {
        setValue(nextState);
      }

      if (onChangeProp) {
        onChangeProp(nextState);
      }
    },
    [isControlled, onChangeProp],
  );

  const onChange = (
    eventOrValue: React.ChangeEvent<HTMLInputElement> | Value,
  ) => {
    if (!value) return;

    const checked = isInputEvent(eventOrValue)
      ? eventOrValue.target.checked
      : !value.includes(eventOrValue as Value);

    const selectedValue = isInputEvent(eventOrValue)
      ? eventOrValue.target.value
      : eventOrValue;

    const nextValue = checked
      ? [...value, selectedValue]
      : value.filter(val => val !== selectedValue);

    updateValue(nextValue);
  };

  return {
    value: value,
    onChange,
    setValue: updateValue,
  };
}

export default useCheckboxGroup;
