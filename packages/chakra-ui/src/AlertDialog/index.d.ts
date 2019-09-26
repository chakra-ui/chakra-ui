import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { IModal } from "../Modal";
import { Omit } from "../common-types";
import { CloseButtonProps } from "../CloseButton";

interface IAlertDialog extends Omit<IModal, "initialFocusRef"> {
  leastDestructiveRef: React.RefObject<HTMLElement>;
}

export const AlertDialog: React.FC<IAlertDialog>;
export const AlertDialogHeader: React.FC<BoxProps>;
export const AlertDialogBody: React.FC<BoxProps>;
export const AlertDialogContent: React.FC<BoxProps>;
export const AlertDialogOverlay: React.FC<BoxProps>;
export const AlertDialogFooter: React.FC<BoxProps>;
export const AlertDialogCloseButton: React.FC<CloseButtonProps>;
