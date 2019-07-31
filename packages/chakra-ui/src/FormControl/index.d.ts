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

/**
 * FormControl provides context such as `id`, `isInvalid`, `isRequired`, `isDisabled` to it's children.
 * This context is used by:
 * - `FormLabel`
 * - `FormHelperText`,
 * - `FormValidationText`,
 * - `Input`
 *
 * @example
 * ```jsx
 * <FormControl>
 *   <FormLabel htmlFor="my-input">Email address</FormLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 */
declare const FormControl: FC<FormControlProps>;

export default FormControl;
