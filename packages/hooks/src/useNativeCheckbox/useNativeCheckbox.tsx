import * as React from "react";
import useControllableValue from "../useControllableValue";
import { composeEventHandlers } from "@chakra-ui/utils";
import usePrevious from "../usePrevious";
import useIsomorphicEffect from "../useIsomorphicEffect";

export interface UseNativeCheckboxOptions {
  isChecked?: CheckboxState;
  isDisabled?: boolean;
  isFocusable?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (value: any) => void;
  name?: string;
  value?: string | number;
  id?: string;
  onBlur?: React.FocusEventHandler<any>;
  onFocus?: React.FocusEventHandler<any>;
}

// Error checks:
// Should not pass "mixed" to defaultIsChecked
// Controlled/uncontrolled checks

type CheckboxState = boolean | "mixed";

function useNativeCheckbox(props: UseNativeCheckboxOptions) {
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const [checkedState, setCheckedState] = React.useState<CheckboxState>(
    Boolean(props.defaultIsChecked),
  );
  const [isControlled, isChecked] = useControllableValue(
    props.isChecked,
    checkedState,
  );

  const isMixed = isChecked === "mixed";

  const updateState = (nextState: CheckboxState) => {
    if (!isControlled) {
      setCheckedState(nextState);
    }
    if (props.onChange) {
      props.onChange(nextState);
    }
  };

  useIsomorphicEffect(() => {
    if (!ref.current) return;
    if (ref.current.indeterminate !== isMixed) {
      ref.current.indeterminate = isMixed;
      updateState(isChecked);
    }
  }, [isMixed, isChecked, ref.current && ref.current.indeterminate]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.isReadOnly || props.isDisabled) {
      return;
    }
    const nextState = isMixed || event.target.checked;
    updateState(nextState);
  };

  const trulyDisabled = props.isDisabled && !props.isFocusable;
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return {
    state: {
      isFocused,
      isChecked: isChecked === "mixed" || isChecked === true ? true : false,
      isMixed,
      isDisabled: props.isDisabled,
      isReadOnly: props.isReadOnly,
    },
    checkbox: {
      "data-checked": isChecked === true ? "" : undefined,
      "data-focus": isFocused ? "" : undefined,
      "data-mixed": isMixed ? "" : undefined,
      "data-disabled": props.isDisabled ? "" : undefined,
      "data-readonly": props.isReadOnly ? "" : undefined,
    },
    hiddenCheckbox: {
      ref,
      type: "checkbox",
      name: props.name,
      value: props.value,
      id: props.id,
      onChange,
      onBlur: composeEventHandlers(props.onBlur, onBlur),
      onFocus: composeEventHandlers(props.onFocus, onFocus),
      checked: isChecked === "mixed" || isChecked === true ? true : false,
      disabled: trulyDisabled,
      readOnly: props.isReadOnly,
      "aria-invalid": props.isInvalid,
      "aria-disabled": props.isDisabled,
      "aria-checked": isChecked,
    },
  };
}

export default useNativeCheckbox;
