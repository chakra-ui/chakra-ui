/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import propTypes from "prop-types";
import { forwardRef } from "react";
import { Flex } from "./Layout";

// Just so I don't repeat this :)
let hoverSelector = "&:not([aria-disabled=true]):not(:focus):hover",
  disabledSelector = "&[aria-disabled=true]",
  focusSelector = "&:focus",
  invalidSelector = "&[aria-invalid=true]";

export const themedStyle = props => ({
  light: {
    [hoverSelector]: {
      borderColor: themeGet(`colors.gray.300`)(props)
    },
    [disabledSelector]: {
      backgroundColor: themeGet(`colors.gray.100`)(props),
      boxShadow: "none !important",
      color: themeGet(`colors.gray.500`)(props),
      cursor: "not-allowed"
    }
  },
  dark: {
    color: themeGet(`colors.alpha.800`)(props),
    borderColor: themeGet(`colors.alpha.200`)(props),
    backgroundColor: themeGet(`colors.alpha.200`)(props),
    [hoverSelector]: {
      borderColor: themeGet(`colors.alpha.300`)(props)
    },
    [disabledSelector]: {
      color: themeGet(`colors.alpha.500`)(props),
      cursor: "not-allowed"
    }
  }
});

const variantStyle = props => ({
  flushed: css({
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    padding: 0,
    boxShadow: "none",
    [focusSelector]: {
      boxShadow: `0 1px 0 0 ${themeGet(`colors.blue.500`)(props)}`,
      borderColor: themeGet(`colors.blue.300`)(props)
    },
    [invalidSelector]: {
      borderColor: `${themeGet(`colors.red.500`)(props)} !important`,
      boxShadow: `0 1px 0 0 ${themeGet(`colors.red.500`)(props)} !important`
    }
  }),
  unstyled: css({
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    boxShadow: "none !important",
    padding: 0
  })
});

export const formControlStyle = props =>
  css({
    alignItems: "center",
    position: "relative",
    width: "100%",
    transition: "all 0.3s",
    borderWidth: 1,
    ...themeGet(`sizes.input.${props.inputSize}`)(props),
    ...themedStyle(props)[props.mode],
    paddingBottom: 1, // To correct the text alignment
    [invalidSelector]: {
      borderColor: `${themeGet("colors.red.500")(props)} !important`
    },
    [focusSelector]: {
      borderColor:
        props.mode === "light"
          ? themeGet(`colors.blue.300`)(props)
          : themeGet(`colors.blue.600`)(props),
      boxShadow: themeGet(`shadows.focusring`)(props)
    },
    ...variantStyle(props)[props.variant],
    "&[readonly]": {
      backgroundColor: "transparent",
      boxShadow: "none !important",
      userSelect: "all"
    }
  });

const StyledInput = styled(Flex)(formControlStyle);

const Input = forwardRef(
  (
    {
      size,
      as,
      "aria-label": ariaLabel,
      id: ariaId,
      isDisabled,
      isInvalid,
      isFocused,
      isReadOnly,
      isRequired,
      variant,
      mode = "light",
      ...rest
    },
    ref
  ) => {
    return (
      <StyledInput
        inputSize={size}
        ref={ref}
        as={as}
        aria-label={ariaLabel}
        id={ariaId}
        readOnly={isReadOnly}
        disabled={isDisabled}
        mode={mode}
        variant={variant}
        aria-invalid={isInvalid}
        aria-required={isRequired}
        aria-disabled={isDisabled}
        {...rest}
      />
    );
  }
);

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
