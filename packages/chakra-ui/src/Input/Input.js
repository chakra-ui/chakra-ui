/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { forwardRef } from "react";
import { Box } from "../Layout";
import useInputStyle from "./InputStyle";

const Input = forwardRef((props, ref) => {
  const {
    size,
    as,
    "aria-label": ariaLabel,
    id,
    isDisabled,
    isInvalid,
    isFocused,
    isReadOnly,
    isRequired,
    variant,
    css,
    ...rest
  } = props;

  const inputStyle = useInputStyle(props);

  return (
    <Box
      ref={ref}
      as={as}
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
