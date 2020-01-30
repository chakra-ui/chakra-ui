import * as React from "react";
import { useFormControl } from "@chakra-ui/form-control";
import { createChakra, PropsOf } from "@chakra-ui/system";
import { InputOptions } from "./Input.types";
import { Omit } from "@chakra-ui/utils";

const BaseInput = createChakra("input", { themeKey: "Input" });

type Omitted =
  | "disabled"
  | "required"
  | "checked"
  | "defaultChecked"
  | "readOnly";

type InputProps = InputOptions & Omit<PropsOf<typeof BaseInput>, Omitted>;

export const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      isReadOnly,
      isFullWidth,
      isDisabled,
      isInvalid,
      isRequired,
      ...rest
    } = props;

    const formControl = useFormControl(props);

    return (
      <BaseInput
        width={isFullWidth ? "100%" : undefined}
        ref={ref}
        readOnly={formControl.isReadOnly}
        aria-readonly={isReadOnly}
        disabled={formControl.isDisabled}
        aria-invalid={formControl.isInvalid}
        required={formControl.isRequired}
        aria-required={formControl.isRequired}
        aria-disabled={formControl.isDisabled}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

Input.defaultProps = {
  variantSize: "md",
  variant: "outline",
  isFullWidth: true,
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
};

export default Input;
