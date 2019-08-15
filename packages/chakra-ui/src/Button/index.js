/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { forwardRef } from "react";
import Icon from "../Icon";
import Spinner from "../Spinner";
import useButtonStyle from "./styles";
import PseudoBox from "../PseudoBox";
import Box from "../Box";

const ButtonIcon = ({ icon, ...props }) => {
  if (typeof icon === "string") {
    return (
      <Icon focusable="false" name={icon} color="currentColor" {...props} />
    );
  }
  return (
    <Box
      as={icon}
      data-custom-icon
      focusable="false"
      color="currentColor"
      {...props}
    />
  );
};

const Button = forwardRef(
  (
    {
      isDisabled,
      isLoading,
      isFullWidth,
      children,
      as: Comp,
      variantColor,
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
    const buttonStyleProps = useButtonStyle({
      variantColor,
      variant,
      size,
    });
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
        {...buttonStyleProps}
        {...rest}
      >
        {leftIcon && !isLoading && (
          <ButtonIcon ml={-1} mr={iconSpacing} icon={leftIcon} />
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
          <ButtonIcon mr={-1} ml={iconSpacing} icon={rightIcon} />
        )}
      </PseudoBox>
    );
  },
);

Button.defaultProps = {
  variantColor: "gray",
  variant: "solid",
  size: "md",
  type: "button",
  iconSpacing: 2,
  as: "button",
};

Button.propTypes = {
  /**
   * The color of the button. Use the colors passed in `theme.colors`.
   */
  variantColor: propTypes.string,
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
  size: propTypes.oneOf(["xs", "sm", "md", "lg"]),
  /**
   * The content of the button.
   */
  children: propTypes.node.isRequired,
  /**
   * If added, the button will show an icon before the button's label.
   * Use the icon key in `theme.icons`
   */
  leftIcon: propTypes.oneOfType([
    propTypes.string,
    propTypes.func,
    propTypes.object,
  ]),
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.icons`
   */
  rightIcon: propTypes.oneOfType([
    propTypes.string,
    propTypes.func,
    propTypes.object,
  ]),
  /**
   * The space between the button icon and label.
   */
  iconSpacing: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

export default Button;
