/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { forwardRef } from "react";
import Icon from "../Icon";
import Spinner from "../Spinner";
import buttonStyle from "./styles";
import PseudoBox from "../PseudoBox";
import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";

const Button = forwardRef(
  (
    {
      isDisabled,
      isLoading,
      isFullWidth,
      children,
      as: Comp,
      color,
      leftIcon,
      rightIcon,
      variant,
      loadingText,
      iconSpacing,
      type,
      size,
      ...rest
    },
    ref,
  ) => {
    const { mode } = useColorMode();
    const theme = useTheme();
    const buttonProps = buttonStyle({ color, variant, size, mode, theme });
    const _isDisabled = isDisabled || isLoading;

    return (
      <PseudoBox
        disabled={_isDisabled}
        aria-disabled={_isDisabled}
        ref={ref}
        as={Comp}
        type={type}
        borderRadius="md"
        fontWeight="semibold"
        width={isFullWidth ? "full" : undefined}
        {...buttonProps}
        {...rest}
      >
        {leftIcon && !isLoading && (
          <Icon
            focusable="false"
            ml={-1}
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
      </PseudoBox>
    );
  },
);

Button.propTypes = {
  /**
   * The color of the button. Use the colors passed in `theme.colors`.
   */
  color: propTypes.string,
  /**
   * The variant of the button style to use.
   */
  variant: propTypes.oneOf(["outline", "ghost", "unstyled", "link", "solid"]),
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled: propTypes.bool,
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading: propTypes.bool,
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText: propTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth: propTypes.bool,
  /**
   * The html button type to use.
   */
  type: propTypes.oneOf(["button", "reset", "submit"]),
  /**
   * The size of the button. Use the sizes in `theme.sizes.button`
   */
  size: propTypes.oneOf(["sm", "md", "lg"]),
  /**
   * The content of the button.
   */
  children: propTypes.node.isRequired,
  /**
   * If added, the button will show an icon before the button's label.
   * Use the icon key in `theme.iconPath`
   */
  leftIcon: propTypes.string,
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon: propTypes.string,
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   * @ignore
   */
  iconSpacing: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

Button.defaultProps = {
  color: "gray",
  size: "md",
  variant: "solid",
  type: "button",
  iconSpacing: 2,
  as: "button",
};

export default Button;
