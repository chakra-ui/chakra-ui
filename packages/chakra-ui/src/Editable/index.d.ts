import { ReactNode, FC } from "react";
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
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the component should start with the edit mode active
   * If `true`, the input is shown by default.
   * @default false
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
   * @default false
   */
  selectAllOnFocus?: boolean;
  /**
   * Placeholder text when the value is empty.
   * @default "Click to Edit"
   */
  placeholder?: string;
  /** The content of the EditableText
   *  Ideally only `EditablePreview` and `EditableInput` should
   *  be the children (but you add other elements too)
   */
  children: ReactNode;
}

export type EditableProps = IEditable & BoxProps;

export const EditablePreview: FC<PseudoBoxProps>;

export const EditableInput: FC<PseudoBoxProps>;

declare const Editable: FC<EditableProps>;

export default Editable;
