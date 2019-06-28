/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import propTypes from "prop-types";
import { forwardRef, Children, cloneElement } from "react";
import Icon from "../Icon";
import { Box } from "../Layout";
import Spinner from "../Spinner";
import useButtonStyle from "./ButtonStyle";

const Button = forwardRef((props, ref) => {
  const {
    isDisabled,
    isLoading,
    isFullWidth,
    children,
    color,
    leftIcon,
    rightIcon,
    variant,
    loadingText,
    iconSpacing,
    as,
    type,
    size,
    css,
    ...rest
  } = props;

  const buttonStyle = useButtonStyle({ color, variant, size, isFullWidth });

  return (
    <Box
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      as={as}
      ref={ref}
      type={type}
      borderRadius="md"
      fontWeight="semibold"
      css={[buttonStyle, css]}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <Icon
          focusable="false"
          mr={iconSpacing}
          name={leftIcon}
          color="currentColor"
          size="1em"
        />
      )}
      {isLoading && (
        <Spinner
          position={loadingText ? "relative" : "absolute"}
          mr={loadingText ? iconSpacing : 0}
          color="currentColor"
          size="1em"
        />
      )}
      {isLoading
        ? loadingText || (
            <Box as="span" opacity="0">
              {children}
            </Box>
          )
        : children}
      {rightIcon && !isLoading && (
        <Icon
          focusable="false"
          ml={iconSpacing}
          name={rightIcon}
          color="currentColor"
          size="1em"
        />
      )}
    </Box>
  );
});

Button.defaultProps = {
  color: "gray",
  size: "md",
  variant: "solid",
  type: "button",
  as: "button",
  iconSpacing: 2
};

Button.propTypes = {
  variant: propTypes.oneOf(["outline", "ghost", "unstyled", "link", "solid"]),
  type: propTypes.oneOf(["button", "reset", "submit"]),
  size: propTypes.oneOf(["sm", "md", "lg"])
};

Button.displayName = "Button";

const StyledButtonGroup = styled(Box)`
  &[data-attached] {
    button:focus {
      position: relative;
      z-index: 1;
    }

    > button:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    > button:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    > button:not(:first-of-type):not(:last-of-type) {
      border-radius: 0;
    }
  }
`;

export const ButtonGroup = ({
  size,
  isAttached,
  spacing = 2,
  children,
  ...rest
}) => {
  return (
    <StyledButtonGroup
      display="inline-block"
      data-attached={isAttached ? "" : undefined}
      {...rest}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          size,
          ...(index + 1 !== Children.count(children) &&
            !isAttached && { mr: spacing })
        })
      )}
    </StyledButtonGroup>
  );
};

export default Button;
