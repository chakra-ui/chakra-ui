/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Box from "../Box";
import { useFormControl } from "../FormControl";
import { useUIMode } from "../ThemeProvider";

export const RequiredIndicator = props => {
  const { mode } = useUIMode();
  const color = { light: "red.500", dark: "red.300" };
  return (
    <Box
      as="span"
      ml={1}
      color={color[mode]}
      aria-hidden="true"
      children="*"
      {...props}
    />
  );
};

export const FormLabel = forwardRef(({ children, ...props }, ref) => {
  const formControl = useFormControl(props);
  return (
    <Box
      ref={ref}
      fontSize="md"
      pr="12px"
      pb="4px"
      opacity={formControl.isDisabled ? "0.4" : "1"}
      fontWeight="medium"
      textAlign="left"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      {...props}
    >
      {children}
      {formControl.isRequired && <RequiredIndicator />}
    </Box>
  );
});

export default FormLabel;
