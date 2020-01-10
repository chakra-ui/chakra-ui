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
  const [isControlled, derivedValue] = useControllableProp(
    valueProp,
    valueState,
  );

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
    if (!derivedValue) return;

    const checked = isInputEvent(eventOrValue)
      ? (eventOrValue as React.ChangeEvent<HTMLInputElement>).target.checked
      : !derivedValue.includes(eventOrValue as Value);

    const selectedValue =
      typeof eventOrValue === "object"
        ? eventOrValue.target.value
        : eventOrValue;

    const nextState = checked
      ? [...derivedValue, selectedValue]
      : derivedValue.filter(val => val !== selectedValue);
    updateValue(nextState);
  };

  return {
    value: derivedValue,
    onChange,
    setValue: updateValue,
  };
}

export default useCheckboxGroup;
