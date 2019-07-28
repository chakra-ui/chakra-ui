/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import propTypes from "prop-types";
import VisuallyHidden from "../VisuallyHidden";
import InputBox from "../InputBox";
import Icon from "../Icon";
import checkboxStyles from "./styles";
import { useUIMode } from "../ThemeProvider";
import Flex from "../Flex";
import Box from "../Box";

const Checkbox = forwardRef(
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
      isIndeterminate,
      children,
      checkColor,
      checkSize,
      ...rest
    },
    ref
  ) => {
    const { mode } = useUIMode();
    const styleProps = checkboxStyles({ color, size, mode });

    return (
      <Flex
        as="label"
        display="inline-flex"
        verticalAlign="top"
        alignItems="center"
        width={isFullWidth ? "full" : undefined}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="checkbox"
          aria-label={ariaLabel}
          id={id}
          ref={ref}
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
          aria-invalid={isInvalid}
        />
        <InputBox {...styleProps}>
          <Icon
            name={isIndeterminate ? "minus" : "check"}
            size={checkSize}
            color={checkColor}
          />
        </InputBox>
        {children && (
          <Box
            ml={2}
            transform="translateY(-1px)"
            fontSize={size}
            userSelect="none"
            opacity={isDisabled ? 0.32 : 1}
          >
            {children}
          </Box>
        )}
      </Flex>
    );
  }
);

Checkbox.defaultProps = {
  size: "md",
  color: "blue",
  checkSize: "10px"
};

Checkbox.propTypes = {
  /**
   * id assigned to input
   */
  id: propTypes.string,
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name: propTypes.string,
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * The color of the checkbox when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  color: propTypes.string,
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultChecked: propTypes.bool,
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked: propTypes.bool,
  /**
   * If `true`, the checkbox should take up the full width of the parent.
   */
  isFullWidth: propTypes.bool,
  /**
   * The size (width and height) of the checkbox
   */
  size: propTypes.oneOf(["sm", "md", "lg"]),
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled: propTypes.bool,
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid: propTypes.bool,
  /**
   * Function called whenever the state of the checkbox changes.
   * It will be called with an object containing the react synthetic event.
   */
  onChange: propTypes.func,
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   */
  isIndeterminate: propTypes.bool,
  /**
   * The children is the label to be displayed to the right of the checkbox.
   */
  children: propTypes.oneOfType([propTypes.node, propTypes.node])
  // iconColor,
  // checkSize
};

export default Checkbox;
