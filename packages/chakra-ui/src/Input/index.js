/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { forwardRef } from "react";
import { useFormControlProps } from "../FormControl";
import PseudoBox from "../PseudoBox";
import useInputStyle from "./styles";

const Input = forwardRef((props, ref) => {
  const {
    type,
    size,
    variant,
    as,
    "aria-label": ariaLabel,
    isReadOnly,
    isFullWidth,
    isDisabled,
    isInvalid,
    isSpellCheckEnabled,
    isRequired,
    _focusBorderColor,
    ...rest
  } = props;

  const inputStyleProps = useInputStyle(props);
  const formControl = useFormControlProps(props);

  return (
    <PseudoBox
      ref={ref}
      as={as}
      type={type}
      name={name}
      id={formControl.id}
      readOnly={formControl.isReadOnly}
      disabled={formControl.isDisabled}
      aria-label={ariaLabel}
      aria-invalid={formControl.isInvalid}
      aria-required={formControl.isRequired}
      aria-disabled={formControl.isDisabled}
      spellCheck={isSpellCheckEnabled}
      {...inputStyleProps}
      {...rest}
    />
  );
});

Input.defaultProps = {
  size: "md",
  as: "input",
  variant: "outline",
  isFullWidth: true,
  _focusBorderColor: "blue"
};

Input.propTypes = {
  size: propTypes.oneOf(["md", "sm", "lg"]),
  type: propTypes.oneOf(["text", "email", "number", "password", "search"]),
  variant: propTypes.oneOf(["outline", "unstyled", "flushed", "filled"])
};

export default Input;
