/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import { forwardRef } from "react";
import Input from "../Input";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";

const Select = forwardRef(
  ({ children, placeholder, wrapperProps, ...rest }, ref) => {
    const { colorMode } = useColorMode();
    const themedColor = colorMode === "dark" ? "whiteAlpha.800" : "inherit";
    const opacity = rest.isReadOnly || rest.isDisabled ? 0.5 : 1;

    return (
      <Box
        position="relative"
        width="100%"
        color={themedColor}
        {...wrapperProps}
      >
        <Input
          as="select"
          appearance="none"
          ref={ref}
          style={{ paddingRight: 24, paddingBottom: "unset", ...rest.style }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </Input>
        <Box
          position="absolute"
          display="inline-flex"
          right="8px"
          top="50%"
          pointerEvents="none"
          opacity={opacity}
          style={{ zIndex: 2 }}
          transform="translateY(-50%)"
        >
          <Icon name="chevron-down" color="currentColor" size="18px" />
        </Box>
      </Box>
    );
  },
);

export default Select;
