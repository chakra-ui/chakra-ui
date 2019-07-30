import { BoxProps } from "../Box";
import { FC, ReactNode } from "react";

interface IFormLabel extends BoxProps {
  /**
   * Content of the form label.
   */
  children: ReactNode;
}

interface IFormControl {
  /**
   * Id of the form control.
   */
  id?: string;
  /**
   * Name of the form control.
   */
  name?: string;
  /**
   * Content of the form control.
   */
  children?: ReactNode;
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

export const ErrorMessage: FC<BoxProps>;
export const ValidationMessage: FC<BoxProps>;
export const HelperMessage: FC<BoxProps>;
export const RequiredIndicator: FC<BoxProps>;
export const ValidationText: FC<BoxProps>;

declare const FormControl: FC<FormControlProps>;

export default FormControl;
