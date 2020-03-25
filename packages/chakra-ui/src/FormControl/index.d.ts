import { BoxProps } from "../Box";
import * as React from "react";

export interface UseFormControlProps {
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
   * If `true` set the form control to the read only state.
   */
  isReadOnly?: boolean;
}

/**
 * React hook to read from props passed to the `FormControl` component
 * It's mostly used to design custom form control components.
 *
 * @param props props passed to the input control
 */
export function useFormControl(props: UseFormControlProps): UseFormControlProps;

export interface IFormControl extends UseFormControlProps {
  /**
   * Content of the form control.
   */
  children?: React.ReactNode;
}

export type FormControlProps = IFormControl & BoxProps;

/**
 * FormControl provides context such as `isInvalid`, `isRequired`, `isDisabled` to it's children.
 */
declare const FormControl: React.FC<FormControlProps>;

export default FormControl;
