import * as React from "react";
import { useFormControl } from "@chakra-ui/form-control";
import { createChakra, PropsOf } from "@chakra-ui/system";
import { InputOptions } from "./Input.types";

const BaseInput = createChakra("input", { themeKey: "Input" });

type Omitted =
  | "disabled"
  | "required"
  | "checked"
  | "defaultChecked"
  | "readOnly";

type InputProps = InputOptions & Omit<PropsOf<typeof BaseInput>, Omitted>;

const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      size,
      variant,
      as,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      isReadOnly,
      isFullWidth,
      isDisabled,
      isInvalid,
      isRequired,
      focusBorderColor,
      errorBorderColor,
      ...rest
    } = props;

    const formControl = useFormControl(props);

    return (
      <BaseInput
        ref={ref}
        as={as}
        readOnly={formControl.isReadOnly}
        aria-readonly={isReadOnly}
        disabled={formControl.isDisabled}
        aria-label={ariaLabel}
        aria-invalid={formControl.isInvalid}
        required={formControl.isRequired}
        aria-required={formControl.isRequired}
        aria-disabled={formControl.isDisabled}
        aria-describedby={ariaDescribedby}
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
