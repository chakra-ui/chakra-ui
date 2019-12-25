import * as React from "react";
import useControllableProp from "../useControllableProp";
import { composeEventHandlers } from "@chakra-ui/utils";
import useTabbable from "../useTabbable";

export interface UseCheckboxOptions {
  isChecked?: CheckboxState;
  isDisabled?: boolean;
  isFocusable?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  defaultIsChecked?: boolean;
  onChange?: (value: any) => void;
  name?: string;
  value?: string | number;
  onClick?: React.MouseEventHandler<any>;
}

// Error checks:
// Should not pass "mixed" to defaultIsChecked
// Controlled/uncontrolled checks

type CheckboxState = boolean | "mixed";

function useCheckbox(props: UseCheckboxOptions) {
  const [checkedState, setCheckedState] = React.useState<CheckboxState>(
    Boolean(props.defaultIsChecked),
  );
  const [isControlled, checked] = useControllableProp(
    props.isChecked,
    checkedState,
  );

  const isInteractive = !(props.isDisabled || props.isReadOnly);

  const onClick = () => {
    if (!isInteractive) return;
    const nextState = checked === "mixed" ? true : !checked;
    if (!isControlled) {
      setCheckedState(nextState);
    }
    if (props.onChange) {
      props.onChange(nextState);
    }
  };

  const tabbable = useTabbable({
    ...props,
    clickOnEnter: false,
    clickOnSpace: true,
    onClick: composeEventHandlers(props.onClick, onClick),
  });

  return {
    isChecked: checked,
    isMixed: checked === "mixed",
    hiddenCheckbox: {
      type: "hidden",
      name: props.name,
      value: props.value,
    },
    checkbox: {
      ...tabbable,
      tabIndex: isInteractive || props.isFocusable ? 0 : undefined,
      role: "checkbox",
      "aria-checked": checked,
      "aria-invalid": props.isInvalid ? true : undefined,
      "aria-readonly": props.isReadOnly ? true : undefined,
    },
  };
}

export default useCheckbox;
