import * as React from "react";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";
import { Omit } from "../common-types";

interface IEditable {
  /**
   * The value of the Editable in both edit & preview mode
   */
  value?: string;
  /**
   * The initial value of the Editable in both edit & preview mode
   */
  defaultValue?: string;
  /**
   * If `true`, the Editable will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the Editable will start with edit mode by default.
   */
  startWithEditView?: boolean;
  /**
   * If `true`, the read only view, has a `tabIndex` set to `0` so it can recieve focus via the keyboard or click.
   */
  isPreviewFocusable?: boolean;
  /**
   * If `true`, it'll update the value onBlur and turn off the edit mode.
   */
  submitOnBlur?: boolean;
  /**
   * Callback invoked when user changes input.
   */
  onChange?: (newValue: string) => void;
  /**
   * Callback invoked when user cancels input with the `Esc` key.
   * It provides the last confirmed value as argument.
   */
  onCancel?: (previousValue: string) => void;
  /**
   * Callback invoked when user confirms value with `enter` key or by blurring input.
   */
  onSubmit?: (newValue: string) => void;
  /**
   * Callback invoked once the user enters edit mode.
   */
  onEdit?: () => void;
  /**
   * If `true`, the input's text will be highlighted on focus.
   */
  selectAllOnFocus?: boolean;
  /**
   * The placeholder text when the value is empty.
   */
  placeholder?: string;
  /**
   * The content of the EditableText
   * Ideally only `EditablePreview` and `EditableInput` should
   * be the children but you add other elements too
   */
  children: React.ReactNode;
}

export type EditableProps = IEditable & Omit<BoxProps, "onChange" | "onSubmit">;

export const EditablePreview: React.FC<PseudoBoxProps>;

export const EditableInput: React.FC<PseudoBoxProps>;

declare const Editable: React.FC<EditableProps>;

export default Editable;
