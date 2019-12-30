/** @jsx jsx */
import { Box, BoxProps } from "@chakra-ui/layout";
import { jsx } from "@emotion/core";
import React, { forwardRef } from "react";

interface FormControlContext {
  [k: string]: any;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

interface FormControlOptions {
  /**
   * Content of the form control.
   */
  children?: React.ReactNode;
  /**
   * If `true` set the form control to the invalid state.
   */
  isInvalid?: boolean;
  /**
   * If `true` set the form control to be required.
   */
  isRequired?: boolean;
  /**
   * If `true` set the form control to the disabled state.
   */
  isDisabled?: boolean;
  /**
   * If `true` set the form control to the readonly state.
   */
  isReadOnly?: boolean;
}

const FormControlContext = React.createContext<FormControlContext | null>(null);
const useFormControlContext = () => React.useContext(FormControlContext);

export const useFormControl = (props: any) => {
  const context = useFormControlContext();
  if (!context) return props;

  const output: Record<string, any> = {};
  for (const prop in context) {
    output[prop] = props[prop];

    if (context && props[prop] == null) {
      output[prop] = context[prop];
    }
  }
  return output;
};

export type FormControlProps<P, T> = FormControlOptions & BoxProps<P, T>;

const FormControl = forwardRef(function FormControl<P, T extends HTMLElement>(
  {
    isInvalid,
    isRequired,
    isDisabled,
    isReadOnly,
    ...rest
  }: FormControlProps<P, T>,
  ref: React.Ref<T>,
) {
  const context = {
    isRequired,
    isDisabled,
    isInvalid,
    isReadOnly,
  };

  return (
    <FormControlContext.Provider value={context}>
      <Box role="group" ref={ref} {...rest} />
    </FormControlContext.Provider>
  );
}) as <P, T extends HTMLElement>(
  props: FormControlProps<P, T>,
) => React.ReactElement<FormControlProps<P, T>>;

export default FormControl;
