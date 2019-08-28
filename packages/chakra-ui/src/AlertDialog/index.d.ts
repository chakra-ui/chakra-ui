import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

interface IAlertDialog {
  /**
   * If true, the `AlertDialog` will open
   */
  isOpen?: boolean;
  /**
   * The function to close the `AlertDialog`
   */
  onClose?: () => void;
  /**
   * The content of the AlertDialog.
   *
   * Should Ideally be `AlertDialogHeader`, `AlertDialogBody`, `AlertDialogFooter`
   */
  children: React.ReactNode;
  /**
   * The zIndex of the AlertDialog.
   */
  zIndex: StyledSystem.ZIndexProps;
  /**
   * The background color of the overlay.
   */
  overlayBg: StyledSystem.BackgroundColorProps;
  /**
   * The size of the AlertDialog
   */
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  /**
   * If `true`, the `AlertDialog` will be centered on screen
   */
  isCentered?: boolean;
  /**
   * The least destructive element to automatically set focus on when the `AlertDialog` opens.
   */
  leastDestructiveRef: React.Ref<{}>;
}

export type AlertDialogProps = IAlertDialog & BoxProps;

/**
 * AlertDialog component is used interrupt the user with a mandatory confirmation or action.
 */
declare const AlertDialog: React.FC<AlertDialogProps>;

/**
 * The `AlertDialogHeader` contains the title announced by screen readers.
 */
export const AlertDialogHeader: React.FC<BoxProps>;

/**
 * The `AlertDialogBody` contains the description announced by screen readers.
 */
export const AlertDialogBody: React.FC<BoxProps>;

/**
 * The `AlertDialogFooter` contains the actions of the dialog.
 */
export const AlertDialogFooter: React.FC<BoxProps>;

export default AlertDialog;
