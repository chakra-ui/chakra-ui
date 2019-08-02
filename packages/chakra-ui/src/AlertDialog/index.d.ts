import * as React from "react";
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
   * The element to automatically set focus on when the `AlertDialog` opens.
   * **🚨This is should point to the least destructive action.**
   *
   * EXAMPLE:
   * If you have two buttons `Delete` and `Cancel` in the `AlertDialog`.
   * The `leastDestructiveRef` should point to `Cancel`
   */
  leastDestructiveRef: React.Ref<{}>;
}

export type AlertDialogProps = IAlertDialog & BoxProps;

/**
 * AlertDialog is a modal dialog that interrupts the user's workflow to communicate an important message and acquire a response.
 */
declare const AlertDialog: React.FC<AlertDialogProps>;

/**
 * The `AlertDialogHeader` contains the title announced by screen readers.
 *
 * It may contain a `Heading` component
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
