/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import propTypes from "prop-types";
import ControlBox from "../ControlBox";
import { useColorMode } from "../ColorModeProvider";
import VisuallyHidden from "../VisuallyHidden";
import checkboxStyles from "../Checkbox/styles";
import Flex from "../Flex";
import Box from "../Box";

const Radio = forwardRef(
  (
    {
      id,
      name,
      value,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      color,
      defaultChecked,
      isChecked,
      isFullWidth,
      size,
      isDisabled,
      isInvalid,
      onChange,
      onBlur,
      onFocus,
      children,
      ...rest
    },
    ref,
  ) => {
    const { mode } = useColorMode();
    const styleProps = checkboxStyles({ color, size, mode });

    return (
      <Flex
        as="label"
        display="inline-flex"
        verticalAlign="top"
        htmlFor={id}
        alignItems="center"
        width={isFullWidth ? "full" : undefined}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="radio"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={id}
          ref={ref}
          name={name}
          value={value}
          aria-invalid={isInvalid}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
        />
        <ControlBox {...styleProps} type="radio" rounded="full">
          <Box bg="currentColor" as="span" rounded="full" size="50%" />
        </ControlBox>
        {children && (
          <Box
            ml={2}
            fontSize={size}
            userSelect="none"
            opacity={isDisabled ? 0.32 : 1}
          >
            {children}
          </Box>
        )}
      </Flex>
    );
  },
);

Radio.defaultProps = {
  size: "md",
  color: "blue",
};

Radio.propTypes = {
  /**
   * The aria-label attribute associated with the radio element
   */
  "aria-label": propTypes.string,
  /**
   * If `true`, the radio will be disabled
   */
  isDisabled: propTypes.bool,
  /**
   * If `true`, the radio is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid: propTypes.bool,
  /**
   * The color of the radio when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  color: propTypes.string,
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultChecked: propTypes.bool,
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked: propTypes.bool,
  /**
   * id assigned to input
   */
  id: propTypes.string,
  /**
   * The name of the input field in a radio
   * (Useful for form submission).
   */
  name: propTypes.string,
  /**
   * The value to be used in the radio button.
   * This is the value that will be returned on form submission.
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default Radio;
