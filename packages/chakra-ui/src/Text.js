import React from "react";
import propTypes from "prop-types";
import { Box, Flex } from "./Layout";
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
}) => {
  if (!leftIcon && !rightIcon) {
    return (
      <Box as={as} {...props}>
        {children}
      </Box>
    );
  }

  return (
    <Flex alignItems="center" {...props}>
      {leftIcon && (
        <Icon
          aria-hidden
          mr={iconSpacing}
          name={leftIcon}
          color={iconColor}
          size={iconSize}
        />
      )}
      <Box as={as}>{children}</Box>
      {rightIcon && (
        <Icon
          aria-hidden
          ml={iconSpacing}
          name={rightIcon}
          color={iconColor}
          size={iconSize}
        />
      )}
    </Flex>
  );
};

Text.defaultProps = {
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
