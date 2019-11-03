/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { useFormControl } from "../FormControl";
import { useColorMode } from "../ColorModeProvider";
import { Text, TextProps } from "../Text";

const FormHelperText = forwardRef(function FormHelperText<
  P,
  T extends HTMLElement
>(props: TextProps<P, T>, ref: React.Ref<T>) {
  const { colorMode } = useColorMode();
  const formControl = useFormControl(props);
  const color = { light: "gray.500", dark: "whiteAlpha.600" };

  return (
    <Text
      mt={2}
      ref={ref}
      id={formControl.id ? `${formControl.id}-help-text` : null}
      color={color[colorMode]}
      lineHeight="normal"
      fontSize="sm"
      {...props}
    />
  );
}) as <P, T extends HTMLElement>(
  props: TextProps<P, T>,
) => React.ReactElement<TextProps<P, T>>;

export default FormHelperText;
