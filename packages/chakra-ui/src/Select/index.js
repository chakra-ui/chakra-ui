/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import { forwardRef } from "react";
import Input from "../Input";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";

const Select = forwardRef(
  (
    {
      children,
      size,
      placeholder,
      form,
      onBlur,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onFocus,
      autoFocus,
      isDisabled,
      isInvalid,
      isRequired,
      name,
      id,
      isReadOnly,
      focusBorderColor,
      variant,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      value,
      defaultValue,
      selectProps,
      ...rest
    },
    ref,
  ) => {
    const { colorMode } = useColorMode();
    const themedColor = colorMode === "dark" ? "whiteAlpha.800" : "inherit";
    const opacity = isReadOnly || isDisabled ? 0.5 : null;

    return (
      <Box position="relative" width="100%" color={themedColor} {...rest}>
        <Input
          as="select"
          size={size}
          appearance="none"
          ref={ref}
          pr="2rem"
          pb="px"
          lineHeight="normal"
          {...{
            form,
            placeholder,
            onBlur,
            onKeyDown,
            onKeyUp,
            onKeyPress,
            onFocus,
            autoFocus,
            isDisabled,
            isInvalid,
            isRequired,
            value,
            defaultValue,
            name,
            id,
            isReadOnly,
            focusBorderColor,
            variant,
            "aria-label": ariaLabel,
            "aria-describedby": ariaDescribedby,
          }}
          {...selectProps}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </Input>
        <Box
          position="absolute"
          display="inline-flex"
          width="1.5rem"
          height="100%"
          alignItems="center"
          justifyContent="center"
          right="0.5rem"
          top="50%"
          pointerEvents="none"
          opacity={opacity}
          zIndex={2}
          transform="translateY(-50%)"
        >
          <Icon name="chevron-down" color="currentColor" size="20px" />
        </Box>
      </Box>
    );
  },
);

Select.displayName = "Select";

export default Select;
