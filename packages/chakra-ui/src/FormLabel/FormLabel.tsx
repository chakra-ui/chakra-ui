/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { Box, BoxProps } from "@chakra-ui/layout";
import { useFormControl } from "../FormControl";
import { useColorMode } from "@chakra-ui/theme";

interface FormLabelOptions {
  isInvalid?: boolean;
  /**
   * This prop is read from the `FormControl` context but can be passed as well.
   * If passed, it'll override the context and give the `label` look disabled
   */
  isDisabled?: boolean;
  children: React.ReactNode;
}

export type FormLabelProps<P, T> = FormLabelOptions &
  BoxProps<P, T> &
  React.LabelHTMLAttributes<any>;

export const RequiredIndicator = (props: BoxProps) => {
  const { colorMode } = useColorMode();
  const color = { light: "red.500", dark: "red.300" };
  return (
    <Box
      as="span"
      ml={1}
      color={color[colorMode]}
      aria-hidden="true"
      children="*"
      {...props}
    />
  );
};

const FormLabel = forwardRef(function FormLabel<P, T extends HTMLElement>(
  { children, ...props }: FormLabelProps<P, T>,
  ref: React.Ref<T>,
) {
  const formControl = useFormControl(props);
  return (
    <Box
      ref={ref}
      fontSize="md"
      pr="12px"
      pb="4px"
      opacity={formControl.isDisabled ? 0.4 : 1}
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
}) as <P, T extends HTMLElement>(
  props: FormLabelProps<P, T>,
) => React.ReactElement<FormLabelProps<P, T>>;

export default FormLabel;
