/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Icon from "../Icon";
import Spinner from "../Spinner";
import useButtonStyle from "./styles";
import PseudoBox from "../PseudoBox";
import Box from "../Box";
import { useVariantColorWarning } from "../utils";

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
      isActive,
      isFullWidth,
      children,
      as: Comp = "button",
      variantColor = "gray",
      leftIcon,
      rightIcon,
      variant = "solid",
      loadingText,
      iconSpacing = 2,
      type = "button",
      size = "md",
      colorMode,
      ...rest
    },
    ref,
  ) => {
    // Wrong usage of `variantColor` prop is quite common
    // Let's add a warning hook that validates the passed variantColor
    useVariantColorWarning("Button", variantColor);

    const buttonStyleProps = useButtonStyle({
      color: variantColor,
      variant,
      size,
      colorMode,
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
        data-active={isActive ? "true" : undefined}
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

Button.displayName = "Button";

export default Button;
