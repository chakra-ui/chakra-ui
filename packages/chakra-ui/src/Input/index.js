/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { forwardRef, useRef } from "react";
import { useFormControlProps } from "../FormControl";
import PseudoBox from "../PseudoBox";
import useInputStyle from "./styles";

const Input = forwardRef((props, ref) => {
  const {
    size,
    as,
    "aria-label": ariaLabel,
    isFocused,
    isReadOnly,
    onFocus,
    onBlur,
    onChange,
    onKeyDown,
    onKeyUp,
    _focusBorderColor,
    variant,
    ...rest
  } = props;

  const inputStyleProps = useInputStyle(props);
  const { id, name, isDisabled, isInvalid, isRequired } = useFormControlProps(
    props
  );

  const ownRef = useRef();

  const _ref = ref || ownRef;

  return (
    <PseudoBox
      ref={_ref}
      as={as}
      name={name}
      id={id}
      onFocus={event => {
        if (_ref.current && isReadOnly) {
          _ref.current.select();
        }
        onFocus && onFocus(event);
      }}
      onBlur={onBlur}
      onChange={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      readOnly={isReadOnly}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-invalid={isInvalid}
      aria-required={isRequired}
      aria-disabled={isDisabled}
      {...inputStyleProps}
      {...rest}
    />
  );
});

Input.defaultProps = {
  size: "md",
  as: "input",
  variant: "outline",
  _focusBorderColor: "blue"
};

Input.propTypes = {
  size: propTypes.oneOf(["md", "sm", "lg"]),
  type: propTypes.oneOf(["text", "email", "number", "password", "search"]),
  state: propTypes.oneOf(["success", "error", "warning"]),
  variant: propTypes.oneOf(["outline", "unstyled", "flushed", "filled"])
};

export default Input;
