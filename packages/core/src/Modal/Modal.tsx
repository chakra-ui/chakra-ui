import * as React from "react";
import { createContext, composeEventHandlers } from "@chakra-ui/utils";
import {
  useIds,
  useLockBodyScroll,
  useAriaHidden,
  useMergeRefs,
} from "@chakra-ui/hooks";
import useOutsideClick from "./useOutsideClick";
import useStackContext from "./useStackingContext";
import ModalFocusLock from "./ModalFocusLock";
import { createChakra } from "@chakra-ui/system";
import { Layer } from "../Layers";

interface ModalProviderProps {
  /**
   * If `true`, the modal when be opened.
   */
  isOpen: boolean;
  /**
   * The `id` of the modal
   */
  id?: string;
  /**
   * Callback invoked to close the modal.
   */
  onClose: (event?: MouseEvent | KeyboardEvent) => void;
}

function useModalProvider(props: ModalProviderProps) {
  const { isOpen, onClose } = props;
  const dialogRef = React.useRef<HTMLElement>(null);

  const [dialogId, headerId, bodyId] = useIds(
    `__chakra-dialog`,
    `__chakra-dialog--header`,
    `__chakra-dialog--body`,
  );

  useLockBodyScroll(dialogRef, {
    preserveScrollBarGap: true,
    shouldLock: isOpen,
  });

  const modals = useStackContext(dialogRef, isOpen);
  useOutsideClick(dialogRef, modals, onClose);
  useAriaHidden(dialogRef, isOpen);

  return {
    isOpen,
    onClose,
    dialogId,
    dialogRef,
    headerId,
    bodyId,
  };
}

type ModalProviderReturn = ReturnType<typeof useModalProvider>;
const [ModalProvider, useModalContext] = createContext<ModalProviderReturn>();

interface ModalProps extends ModalProviderProps {
  children?: React.ReactNode;
}

export function Modal(props: ModalProps) {
  const context = useModalProvider(props);

  if (!props.isOpen) return null;

  return (
    <ModalProvider value={context}>
      <Layer>
        <ModalFocusLock restoreFocus children={props.children} />
      </Layer>
    </ModalProvider>
  );
}

function useModalBackdrop(props: any) {
  const onClick = React.useCallback(event => event.stopPropagation(), []);
  return { ...props, onClick };
}

function useModalDialog(props: any) {
  const { dialogId, dialogRef, headerId, bodyId, onClose } = useModalContext();

  const ref = useMergeRefs(props.ref, dialogRef);

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        if (onClose) {
          onClose();
        }
      }
    },
    [onClose],
  );

  return {
    ...props,
    id: dialogId,
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    ref,
    role: "dialog",
    tabIndex: 0,
    "aria-modal": true,
    "aria-labelledby": headerId,
    "aria-describedby": bodyId,
  };
}

export const ModalDialog = createChakra("section", {
  hook: useModalDialog,
  dataAttr: "--chakra-dialog",
});

export const ModalOverlay = createChakra("div", {
  hook: useModalBackdrop,
});

ModalOverlay.defaultProps = {
  role: "presentation",
};
