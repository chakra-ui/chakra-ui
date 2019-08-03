/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import { forwardRef } from "react";
import Input from "../Input";
import { useUIMode } from "../ThemeProvider";
import Box from "../Box";
import Absolute from "../Absolute";

const Select = forwardRef(
  ({ children, placeholder, wrapperProps, ...rest }, ref) => {
    const { mode } = useUIMode();
    const themedColor = mode === "dark" ? "whiteAlpha.800" : "inherit";
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
        <Absolute
          display="inline-flex"
          right="8px"
          top="50%"
          pointerEvents="none"
          opacity={opacity}
          style={{ zIndex: 2 }}
          transform="translateY(-50%)"
        >
          <Icon name="chevron-down" color="currentColor" size="18px" />
        </Absolute>
      </Box>
    );
  },
);

export default Select;
