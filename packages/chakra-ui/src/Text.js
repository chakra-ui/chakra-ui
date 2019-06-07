import React from "react";
import propTypes from "prop-types";
import { Box } from "./Layout";
import Icon from "./Icon";

const Text = ({
  as,
  children,
  leftIcon,
  rightIcon,
  iconSpacing,
  iconSize,
  iconColor,
  ...props
}) => (
  <Box as={as} {...props}>
    {leftIcon && (
      <Icon
        mr={iconSpacing}
        name={leftIcon}
        color={iconColor}
        size={iconSize}
      />
    )}
    {children}
    {rightIcon && (
      <Icon
        ml={iconSpacing}
        name={rightIcon}
        color={iconColor}
        size={iconSize}
      />
    )}
  </Box>
);

Text.defaultProps = {
  iconSize: "1em",
  iconColor: "currentColor",
  iconSpacing: 2,
  as: "p"
};

Text.propTypes = {
  fontSize: propTypes.oneOf([
    "xs",
    "sm",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl"
  ]),
  textTransform: propTypes.oneOf([
    "uppercase",
    "lowercase",
    "capitalize",
    "normal-case"
  ]),
  fontWeight: propTypes.oneOf([
    "hairline",
    "thin",
    "light",
    "normal",
    "medium",
    "semibold",
    "bold",
    "extrabold",
    "black"
  ]),
  lineHeight: propTypes.oneOf([
    "none",
    "shorter",
    "short",
    "normal",
    "tall",
    "taller"
  ]),
  letterSpacing: propTypes.oneOf([
    "tighter",
    "tight",
    "normal",
    "wide",
    "wider",
    "widest"
  ])
};

Text.displayName = "Text";

export default Text;
