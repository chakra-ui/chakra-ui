import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { IModal } from "../Modal";
import { Omit } from "../common-types";

interface IAlertDialog extends Omit<IModal, "initialFocusRef"> {
  leastDestructiveRef: React.RefObject<HTMLElement>;
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
