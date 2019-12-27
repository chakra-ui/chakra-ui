import { composeEventHandlers } from "@chakra-ui/utils";
import * as React from "react";
import useControllableProp from "../useControllableProp";
import useIsomorphicEffect from "../useIsomorphicEffect";
import useLogger from "../useLogger";

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isFocusable?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;
  id?: string;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
}

function useCheckbox({
  defaultIsChecked,
  isChecked: checkedProp,
  isFocusable,
  isDisabled,
  isReadOnly,
  onChange,
  isIndeterminate,
  isInvalid,
  name,
  value,
  id,
  onBlur,
  onFocus,
}: CheckboxProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = React.useState(
    Boolean(defaultIsChecked),
  );

  const [isControlled, isChecked] = useControllableProp(
    checkedProp,
    checkedState,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly || isDisabled) {
      event.preventDefault();
      return;
    }

    if (!isControlled) {
      if (isChecked) {
        setCheckedState(event.target.checked);
      } else {
        setCheckedState(isIndeterminate ? true : event.target.checked);
      }
    }

    if (onChange) {
      onChange(event);
    }
  };

  useIsomorphicEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = Boolean(isIndeterminate);
  }, [isIndeterminate]);

  const trulyDisabled = isDisabled && !isFocusable;

  const handleFocus = React.useCallback(() => setIsFocused(true), []);
  const handleBlur = React.useCallback(() => setIsFocused(false), []);

  return {
    state: {
      isFocused,
      isChecked,
      isIndeterminate,
      isDisabled,
      isReadOnly,
    },
    checkbox: {
      "data-checked": isChecked ? "" : undefined,
      "data-focus": isFocused ? "" : undefined,
      "data-mixed": isIndeterminate ? "" : undefined,
      "data-disabled": isDisabled ? "" : undefined,
      "data-readonly": isReadOnly ? "" : undefined,
    },
    input: {
      ref,
      type: "checkbox",
      name,
      value,
      id,
      onChange: handleChange,
      onBlur: composeEventHandlers(onBlur, handleBlur),
      onFocus: composeEventHandlers(onFocus, handleFocus),
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-invalid": isInvalid,
      "aria-disabled": isDisabled,
    },
  };
}

export default useCheckbox;
