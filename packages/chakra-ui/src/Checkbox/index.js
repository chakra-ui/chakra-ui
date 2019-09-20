/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Box from "../Box";
import { useColorMode } from "../ColorModeProvider";
import ControlBox from "../ControlBox";
import PseudoBox from "../PseudoBox";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";
import checkboxStyles from "./styles";

const Checkbox = forwardRef(
  (
    {
      id,
      name,
      value,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      variantColor = "blue",
      defaultIsChecked,
      isChecked,
      isFullWidth,
      size = "md",
      isDisabled,
      isInvalid,
      onChange,
      onBlur,
      onFocus,
      isIndeterminate,
      children,
      iconColor,
      iconSize = "10px",
      ...rest
    },
    ref,
  ) => {
    const { colorMode } = useColorMode();
    const styleProps = checkboxStyles({ color: variantColor, size, colorMode });

    return (
      <PseudoBox
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
          defaultChecked={defaultIsChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
          aria-invalid={isInvalid}
          data-indeterminate={isIndeterminate}
        />
        <ControlBox {...styleProps}>
          <Icon
            name={isIndeterminate ? "minus" : "check"}
            size={iconSize}
            color={iconColor}
            transition="transform 240ms, opacity 240ms"
          />
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
      </PseudoBox>
    );
  },
);

export default Checkbox;
