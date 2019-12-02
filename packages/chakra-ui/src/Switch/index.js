/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Box from "../Box";
import { useColorMode } from "../ColorModeProvider";
import ControlBox from "../ControlBox";
import VisuallyHidden from "../VisuallyHidden";

const switchSizes = {
  sm: {
    width: "1.375rem",
    height: "0.75rem",
  },
  md: {
    width: "1.875rem",
    height: "1rem",
  },
  lg: {
    width: "2.875rem",
    height: "1.5rem",
  },
};

const Switch = forwardRef(
  (
    {
      id,
      name,
      value,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      color,
      defaultIsChecked,
      isChecked,
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
    const { colorMode } = useColorMode();
    const width = switchSizes[size] && switchSizes[size]["width"];
    const height = switchSizes[size] && switchSizes[size]["height"];

    const stylesProps = {
      rounded: "full",
      justifyContent: "flex-start",
      width,
      height,
      bg: colorMode === "dark" ? "whiteAlpha.400" : "gray.300",
      boxSizing: "content-box",
      p: "2px",
      _checked: {
        bg: `${color}.500`,
      },
      _child: {
        transform: `translateX(0)`,
      },
      _checkedAndChild: {
        transform: `translateX(calc(${width} - ${height}))`,
      },
      _focus: {
        boxShadow: "outline",
      },
      _hover: {
        cursor: "pointer",
      },
      _checkedAndHover: {
        cursor: "pointer",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    };

    return (
      <Box as="label" display="inline-block" verticalAlign="middle" {...rest}>
        <VisuallyHidden
          as="input"
          type="checkbox"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={id}
          ref={ref}
          name={name}
          value={value}
          aria-invalid={isInvalid}
          defaultChecked={defaultIsChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
        />
        <ControlBox {...stylesProps}>
          <Box
            bg="white"
            transition="transform 250ms"
            rounded="full"
            size={height}
          />
        </ControlBox>
      </Box>
    );
  },
);

Switch.displayName = "Switch";

Switch.defaultProps = {
  color: "blue",
  size: "md",
};

export default Switch;
