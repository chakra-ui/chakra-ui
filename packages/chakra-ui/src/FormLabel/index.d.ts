import * as React from "react";
import { BoxProps } from "../Box";

interface ILabelProps {
  isInvalid?: boolean;
  /**
   * This prop is read from the `FormControl` context but can be passed as well.
   * If passed, it'll override the context and give the `label` look disabled
   */
  isDisabled?: boolean;
  children: React.ReactNode;
}

export type FormLabelProps = ILabelProps &
  BoxProps &
  React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * FormLabel is used for form inputs and controls.
 * It reads from the `FormControl` context to handle it's styles for
 * the various form states.
 */
declare const FormLabel: React.ForwardRefExoticComponent<FormLabelProps>;

export default FormLabel;
