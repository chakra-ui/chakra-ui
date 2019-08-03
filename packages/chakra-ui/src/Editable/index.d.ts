import * as React from "react";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

interface IEditable {
  /**
   * Text value of the controlled input
   */
  value?: string;
  /**
   * Default text value of uncontrolled input.
   */
  defaultValue?: string;
  /**
   * Whether the text can be edited.
   */
  isDisabled?: boolean;
  /**
   * Whether the component should start with the edit mode active
   * If `true`, the input is shown by default.
   */
  isEditing?: boolean;
  /**
   * Callback invoked when user changes input in any way.
   */
  onChange?: () => void;
  /**
   * Callback invoked when user cancels input with the `Esc` key. Receives last confirmed value.
   */
  onCancel?: () => void;
  /**
   * Callback invoked when user confirms value with `enter` key or by blurring input.
   */
  onSubmit?: () => void;
  /**
   * Callback invoked after the user enters edit mode.
   */
  onEdit?: () => void;
  /**
   * If `true`, the input's text will be highlighted on focus.
   */
  selectAllOnFocus?: boolean;
  /**
   * Placeholder text when the value is empty.
   */
  placeholder?: string;
  /**
   * The content of the EditableText
   * Ideally only `EditablePreview` and `EditableInput` should
   * be the children (but you add other elements too)
   */
  children: React.ReactNode;
}

export type EditableProps = IEditable & BoxProps;

export const EditablePreview: React.FC<PseudoBoxProps>;

export const EditableInput: React.FC<PseudoBoxProps>;

declare const Editable: React.FC<EditableProps>;

export default Editable;
