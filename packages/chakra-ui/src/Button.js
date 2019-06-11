/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import propTypes from "prop-types";
import { forwardRef } from "react";
import Icon from "./Icon";
import { Box } from "./Layout";
import Spinner from "./Spinner";
import { useUIMode } from "./ThemeProvider";

/* 
  Let's start with the Button Styles.
  We want to leverage the power of Emotion's composition so the output CSS is clean
*/

// This is the base style all buttons use
const baseStyle = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 250ms",
  userSelect: "none",
  position: "relative",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: "1.2"
});

// For unstyled buttons
const unstyledStyle = css({
  userSelect: "inherit",
  background: "none",
  border: 0,
  color: "inherit",
  display: "inline",
  font: "inherit",
  lineHeight: "inherit",
  margin: 0,
  padding: 0,
  textAlign: "inherit"
});

// Just so I don't repeat this :)
let hoverSelector = '&:not([aria-disabled="true"]):hover',
  activeSelector = '&:not([aria-disabled="true"]):active',
  disabledSelector = '&[aria-disabled="true"]',
  focusSelector = "&:focus";

// Color styled for contained buttons
const solidColorStyle = props =>
  css({
    color: "#fff",
    backgroundColor: themeGet(`colors.${props.buttonColor}.500`)(props),
    [hoverSelector]: {
      backgroundColor: themeGet(`colors.${props.buttonColor}.600`)(props)
    },
    [activeSelector]: {
      backgroundColor: themeGet(`colors.${props.buttonColor}.700`)(props)
    },
    ...(props.buttonColor === "gray" && {
      color: "inherit",
      backgroundColor: themeGet(`colors.gray.100`)(props),
      [hoverSelector]: {
        backgroundColor: themeGet(`colors.gray.200`)(props)
      },
      [activeSelector]: {
        backgroundColor: themeGet(`colors.gray.300`)(props)
      }
    })
  });

// Color style for ghost style
const ghostColorStyle = props =>
  css({
    color: themeGet(`colors.${props.buttonColor}.500`)(props),
    backgroundColor: "transparent",
    [hoverSelector]: {
      backgroundColor: themeGet(`colors.${props.buttonColor}.50`)(props)
    },
    [activeSelector]: {
      backgroundColor: themeGet(`colors.${props.buttonColor}.100`)(props)
    },
    //Adjust the interaction for gray button
    ...(props.buttonColor === "gray" && {
      [hoverSelector]: {
        backgroundColor:
          props.mode === "dark"
            ? themeGet(`colors.alpha.100`)(props)
            : themeGet(`colors.gray.100`)(props)
      },
      [activeSelector]: {
        backgroundColor:
          props.mode === "dark"
            ? themeGet(`colors.alpha.200`)(props)
            : themeGet(`colors.gray.200`)(props)
      }
    }),
    // Find a better solution for this?
    // Need to change the label color to black if the bgColor is a light color
    ...(["gray", "yellow"].includes(props.buttonColor) && { color: "inherit" })
  });

// Style for outline button
const outlineColorStyle = props =>
  css(ghostColorStyle(props), {
    borderWidth: 1,
    borderColor: themeGet(`colors.${props.buttonColor}.200`)(props),
    ...(props.buttonColor === "gray" && {
      borderColor:
        props.mode === "dark"
          ? themeGet(`colors.alpha.400`)(props)
          : themeGet(`colors.${props.buttonColor}.200`)(props)
    })
  });

// Style for link variant
const linkStyle = props =>
  css({
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    color: themeGet(`colors.${props.buttonColor}.600`)(props),
    [hoverSelector]: {
      textDecoration: "underline"
    },
    [activeSelector]: {
      color: themeGet(`colors.${props.buttonColor}.700`)(props)
    }
  });

// Finally, a function to determine which style to use
const variantStyle = props => {
  switch (props.buttonVariant) {
    case "solid":
      return solidColorStyle(props);
    case "outline":
      return outlineColorStyle(props);
    case "ghost":
      return ghostColorStyle(props);
    case "link":
      return linkStyle(props);
    case "unstyled":
      return unstyledStyle;
    default:
      // eslint-disable-next-line no-console
      console.warn("passed variant prop is invalid ");
      return {};
  }
};

// We generating the size (fontSize, padding, height) for the Button based on prop
const sizeStyle = props =>
  css({
    ...themeGet(`sizes.button.${props.buttonSize}`)(props),
    ...(props.isFullWidth && { width: "100%" })
  });

const disabledStyle = css({
  [disabledSelector]: {
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none"
  }
});

const focusStyle = props =>
  css({
    [focusSelector]: {
      boxShadow: themeGet("shadows.focusring")(props)
    }
  });

/* 
  Now, Let's create the Button Component and consume the styles
*/

const StyledButton = styled(Box)`
  ${baseStyle}
  ${disabledStyle}
  ${focusStyle}
  ${sizeStyle}
  ${variantStyle}
`;

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
    ...rest
  } = props;

  const mode = useUIMode();

  return (
    <StyledButton
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      as={as}
      ref={ref}
      type={type}
      mode={mode}
      isFullWidth={isFullWidth}
      buttonVariant={variant}
      buttonSize={size}
      buttonColor={color}
      borderRadius="md"
      fontWeight="semibold"
      {...rest}
    >
      {leftIcon && !isLoading && (
        <Icon
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
          ml={iconSpacing}
          name={rightIcon}
          color="currentColor"
          size="1em"
        />
      )}
    </StyledButton>
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

export default Button;
export { baseStyle, variantStyle, focusStyle, disabledStyle, sizeStyle };
