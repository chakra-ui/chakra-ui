import * as React from "react";
import { useField, ControlProps } from "@chakra-ui/field-base";
import { createChakra, PropsOf } from "@chakra-ui/system";
import { Omit } from "@chakra-ui/utils";

type OmittedTypes = "disabled" | "required" | "readOnly";

type BaseInputProps = Omit<PropsOf<"input">, OmittedTypes> & ControlProps;

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const inputProps = useField<HTMLInputElement>(props);
    return <input ref={ref} {...inputProps} />;
  },
);

interface InputOptions {
  /**<P
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string;
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string;
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean;
}

const Input = createChakra<typeof BaseInput, InputOptions>(BaseInput, {
  themeKey: "Input",
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
});

Input.displayName = "Input";

Input.defaultProps = {
  variantSize: "md",
  variant: "outline",
  isFullWidth: true,
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
};

export default Input;
