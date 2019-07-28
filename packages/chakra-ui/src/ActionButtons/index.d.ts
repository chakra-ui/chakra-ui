import { RefAttributes, ForwardRefExoticComponent } from "react";
import { ICommonProps } from "../Button";

interface IActionButtons extends ICommonProps {
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  submitText?: string;
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  submitColor?: string;
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  onSubmit: () => void;
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  cancelText?: string;
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  onCancel: () => void;
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  type?: "button" | "submit";
  /**
   * If `true`, disables the accordion header.
   * Note: Pass `_disabled` prop to style the disabled state.
   */
  spacing?: string;
}

export type ActionButtonsProps = IActionButtons &
  BoxProps &
  RefAttributes<HTMLDivElement>;

declare const ActionButtons: ForwardRefExoticComponent<ActionButtonsProps>;

export default ActionButtons;
