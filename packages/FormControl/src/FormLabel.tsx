import { chakra, PropsOf, useModeValue } from "@chakra-ui/system";
import * as React from "react";
import { useFormControlContext } from "./FormControl";

export function RequiredIndicator(props: PropsOf<typeof chakra.span>) {
  const color = useModeValue(`red.500`, `red.300`);
  return (
    <chakra.span
      ml={1}
      color={color}
      aria-hidden="true"
      children="*"
      {...props}
    />
  );
}

export function FormLabel(props: PropsOf<typeof chakra.label>) {
  const formControl = useFormControlContext();
  return (
    <chakra.label
      fontSize="md"
      pr="12px"
      pb="4px"
      opacity={formControl.isDisabled ? 0.4 : 1}
      // fontWeight="medium"
      textAlign="left"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      {...props}
    >
      {props.children}
      {formControl.isRequired && <RequiredIndicator />}
    </chakra.label>
  );
}

FormLabel.displayName = "FormLabel";

export default FormLabel;
