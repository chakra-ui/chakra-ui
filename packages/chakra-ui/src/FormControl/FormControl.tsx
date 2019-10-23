/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext, forwardRef } from "react";
import { Box, BoxProps } from "../Box";

interface FormControlContextValue {
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

const FormControlContext = createContext<FormControlContextValue>({});

export const useFormControl = (props: any) => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce(
    (acc, prop) => {
      /** Giving precedence to `props` over `context` */
      acc[prop] = props[prop];

      if (context) {
        if (props[prop] == null) {
          acc[prop] = context[prop];
        }
      }

      return acc;
    },
    {} as Record<string, any>,
  );
};

export const useFormControlContext = () => {
  const context = useContext(FormControlContext);
  return context;
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
  const context: FormControlContextValue = {
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
