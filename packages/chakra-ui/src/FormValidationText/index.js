/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useUIMode } from "../ThemeProvider";
import { useFormControl } from "../FormControl";
import Icon from "../Icon";
import Flex from "../Flex";
import Text from "../Text";
import { forwardRef } from "react";

export const FormValidationText = forwardRef(
  ({ children, icon, ...props }, ref) => {
    const { mode } = useUIMode();
    const formControl = useFormControl(props);

    const invalidColor = {
      light: "red.500",
      dark: "red.300"
    };
    const invalidProps = {
      icon: "warning",
      color: invalidColor[mode]
    };

    const validColor = { light: "green.500", dark: "green.200" };
    const validProps = {
      icon: "check-circle",
      color: validColor[mode]
    };

    const validationProps = formControl.isInvalid ? invalidProps : validProps;

    return (
      <Flex
        ref={ref}
        color={validationProps.color}
        mt={2}
        fontSize="sm"
        alignItems="center"
        {...props}
      >
        <Icon aria-hidden name={validationProps.icon} mr="0.5em" />
        <Text lineHeight="normal">{children}</Text>
      </Flex>
    );
  }
);

export default FormValidationText;
