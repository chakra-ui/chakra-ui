import * as React from "react";
import { useForkRef } from "./useForkRef";
import useControllableValue from "./useControllableValue";
import { composeEventHandlers } from "@chakra-ui/utils";

interface Options {
  isChecked?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  defaultIsChecked?: boolean;
  isIndeterminate?: boolean;
  ref?: React.Ref<HTMLElement>;
  onChange?: (k: any) => void;
  value?: string | number;
}

function getChecked(options: any) {
  const isBoolean = typeof options.value === "undefined";
  if (typeof options.checked !== "undefined") {
    return options.checked;
  }
  if (isBoolean) {
    return Boolean(options.state);
  }
  const state = Array.isArray(options.state) ? options.state : [];
  return state.indexOf(options.value) !== -1;
}

function useCheckbox(props: Options) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    isChecked,
    isDisabled,
    isReadOnly,
    isInvalid,
    defaultIsChecked,
    isIndeterminate,
    onChange,
    value,
  } = props;
  const [checkedState, setCheckedState] = React.useState(
    defaultIsChecked || false,
  );
  const [isControlled, checked] = useControllableValue(isChecked, checkedState);
  const isInteractive = !(isDisabled || isReadOnly);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (isReadOnly) {
      event.preventDefault();
    } else if (!isControlled) {
      setCheckedState(event.target.checked);
    }
  }

  React.useEffect(() => {
    if (isIndeterminate && inputRef.current) {
      inputRef.current.indeterminate = true;
    }
  }, [isIndeterminate]);

  return {
    ref: inputRef,
    "data-chakra-checkbox": "",
    tabIndex: isInteractive ? 0 : undefined,
    readOnly: isReadOnly,
    role: "checkbox",
    type: "checkbox",
    value: value,
    checked: isIndeterminate || checked,
    onChange: composeEventHandlers(onChange, handleChange),
    "aria-checked": isIndeterminate ? "mixed" : String(checked),
    "aria-invalid": isInvalid ? true : undefined,
    "aria-readonly": isReadOnly ? true : undefined,
    "aria-disabled": isDisabled,
  };
}

export default useCheckbox;
