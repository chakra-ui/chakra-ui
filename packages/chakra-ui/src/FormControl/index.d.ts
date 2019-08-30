import { BoxProps } from "../Box";
import * as React from "react";

interface IFormLabel extends BoxProps {
  /**
   * Content of the form label.
   */
  children: React.ReactNode;
}

interface IFormControl {
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
}

export type FormControlProps = IFormControl & BoxProps;

export const ErrorMessage: React.FC<BoxProps>;
export const ValidationMessage: React.FC<BoxProps>;
export const HelperMessage: React.FC<BoxProps>;
export const RequiredIndicator: React.FC<BoxProps>;
export const ValidationText: React.FC<BoxProps>;

/**
 * FormControl provides context such as `isInvalid`, `isRequired`, `isDisabled` to it's children.
 */
declare const FormControl: React.FC<FormControlProps>;

export default FormControl;
