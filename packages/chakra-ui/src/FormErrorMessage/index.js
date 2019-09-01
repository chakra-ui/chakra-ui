/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { useColorMode } from "../ColorModeProvider";
import Flex from "../Flex";
import { useFormControl } from "../FormControl";
import Icon from "../Icon";
import Text from "../Text";

const FormErrorMessage = forwardRef(({ children, icon, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const formControl = useFormControl(props);

  const color = {
    light: "red.500",
    dark: "red.300",
  };

  if (!formControl.isInvalid) {
    return null;
  }

  return (
    <Flex
      ref={ref}
      color={color[colorMode]}
      id={formControl.id ? `${formControl.id}-error-message` : null}
      mt={2}
      fontSize="sm"
      align="center"
      {...props}
    >
      <Icon aria-hidden name={icon || "warning"} mr="0.5em" />
      <Text lineHeight="normal">{children}</Text>
    </Flex>
  );
});

export default FormErrorMessage;
