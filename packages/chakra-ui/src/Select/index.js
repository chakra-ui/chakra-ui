/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import { forwardRef } from "react";
import Input from "../Input";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import splitProps from "./utils";

const SelectIconWrapper = forwardRef(function SelectIconWrapper(props, ref) {
  return (
    <Box
      ref={ref}
      position="absolute"
      display="inline-flex"
      width="1.5rem"
      height="100%"
      alignItems="center"
      justifyContent="center"
      right="0.5rem"
      top="50%"
      pointerEvents="none"
      zIndex={2}
      transform="translateY(-50%)"
      {...props}
    />
  );
});

const SelectInput = forwardRef(function SelectInput(
  { placeholder, children, ...rest },
  ref,
) {
  return (
    <Input
      as="select"
      appearance="none"
      ref={ref}
      pr="2rem"
      pb="px"
      lineHeight="normal"
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </Input>
  );
});

const Select = forwardRef(({ rootProps, icon, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const color = colorMode === "dark" ? "whiteAlpha.800" : "inherit";
  const opacity = props.isReadOnly || props.isDisabled ? 0.5 : null;

  const [root, select] = splitProps(props);

  return (
    <Box
      position="relative"
      width="100%"
      color={color}
      {...root}
      {...rootProps}
    >
      <SelectInput ref={ref} {...select} />
      <SelectIconWrapper opacity={opacity}>
        {icon || <Icon name="chevron-down" color="currentColor" size="20px" />}
      </SelectIconWrapper>
    </Box>
  );
});

Select.displayName = "Select";

export default Select;
