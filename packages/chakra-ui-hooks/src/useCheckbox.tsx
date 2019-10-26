import * as React from "react";
import { mergeRefs } from "@chakra-ui/utils";

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
  const inputRef = React.useRef<HTMLElement>(null);
  const {
    isChecked,
    isDisabled,
    isReadOnly,
    isInvalid,
    defaultIsChecked,
    isIndeterminate,
    ref,
    onChange,
    value,
  } = props;
  const checked = isChecked || defaultIsChecked;
  const isInteractive = !(isDisabled || isReadOnly);

  const handleClick = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return {
    ref: ref ? mergeRefs(ref, inputRef) : inputRef,
    tabIndex: isInteractive ? 0 : undefined,
    readonly: isReadOnly,
    role: "checkbox",
    type: "checkbox",
    value: value,
    onClick: handleClick,
    "aria-checked": isIndeterminate ? "mixed" : isChecked || defaultIsChecked,
    "aria-invalid": isInvalid ? true : undefined,
    "aria-readonly": isReadOnly ? true : undefined,
    "aria-disabled": isDisabled,
  };
}

export default useCheckbox;
