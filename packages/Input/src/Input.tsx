import * as React from "react";
import { useField, ControlProps } from "@chakra-ui/field-base";
import {
  createChakra,
  PropsOf,
  forwardRef,
  useComponentStyle,
} from "@chakra-ui/system";
import { Omit } from "@chakra-ui/utils";
import { useInputGroup } from "./Input.group";

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

const StyledInput = createChakra<typeof BaseInput, InputOptions>(BaseInput, {
  themeKey: "Input",
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
});

StyledInput.displayName = "StyledInput";

const Input = React.forwardRef(
  (props: PropsOf<typeof StyledInput>, ref: React.Ref<HTMLInputElement>) => {
    const group = useInputGroup();

    const variant = group?.variant || props.variant;
    const variantSize = group?.variantSize || props.variantSize;

    const { height } = useComponentStyle({
      themeKey: "Input",
      variant,
      variantSize,
    });

    return (
      <StyledInput
        ref={ref}
        {...(group?.hasRightElement && { paddingRight: height })}
        {...(group?.hasLeftElement && { paddingLeft: height })}
        {...props}
        variant={variant}
        variantSize={variantSize}
      />
    );
  },
);

Input.displayName = "Input";

Input.defaultProps = {
  isFullWidth: true,
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
};

export default Input;
