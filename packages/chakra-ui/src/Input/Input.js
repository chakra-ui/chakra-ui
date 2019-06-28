/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { forwardRef } from "react";
import { Box } from "../Layout";
import useInputStyle from "./InputStyle";
import { useFormControlProps } from "../FormControl";

const Input = forwardRef((props, ref) => {
  const {
    size,
    as,
    "aria-label": ariaLabel,
    isFocused,
    isReadOnly,
    variant,
    css,
    ...rest
  } = props;

  const inputStyle = useInputStyle(props);
  const { id, name, isDisabled, isInvalid, isRequired } = useFormControlProps(
    props
  );

  return (
    <Box
      ref={ref}
      as={as}
      name={name}
      aria-label={ariaLabel}
      id={id}
      readOnly={isReadOnly}
      disabled={isDisabled}
      variant={variant}
      aria-invalid={isInvalid}
      aria-required={isRequired}
      aria-disabled={isDisabled}
      css={[inputStyle, css]}
      {...rest}
    />
  );
});

Input.defaultProps = {
  size: "md",
  as: "input",
  variant: "default"
};

Input.propTypes = {
  size: propTypes.oneOf(["md", "sm", "lg"]),
  type: propTypes.oneOf(["text", "email", "number", "password", "search"]),
  state: propTypes.oneOf(["success", "error", "warning"]),
  variant: propTypes.oneOf(["default", "unstyled", "flushed"])
};

export default Input;
