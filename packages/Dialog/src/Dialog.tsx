import * as React from "react";
import { createContext, composeEventHandlers } from "@chakra-ui/utils";
import {
  useIds,
  useLockBodyScroll,
  useAriaHidden,
  useMergeRefs,
} from "@chakra-ui/hooks";
import { useOutsideClick, useStackContext } from "./Dialog.utils";
import FocusLock from "./Dialog.focus-lock";
import { createChakra, SystemProps } from "@chakra-ui/system";
import { Portal } from "@chakra-ui/portal";

interface DialogProviderProps {
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

function useDialogProvider(props: DialogProviderProps) {
  const { isOpen, onClose } = props;
  const dialogRef = React.useRef<HTMLElement>(null);
  const overlayRef = React.useRef<HTMLElement>(null);

  const [dialogId, headerId, bodyId] = useIds(
    `chakra-dialog`,
    `chakra-dialog--header`,
    `chakra-dialog--body`,
  );

  useLockBodyScroll(dialogRef, {
    preserveScrollBarGap: true,
    shouldLock: isOpen,
  });

  const modals = useStackContext(dialogRef, isOpen);
  useOutsideClick(dialogRef, overlayRef, modals, onClose);
  useAriaHidden(dialogRef, isOpen);

  return {
    isOpen,
    onClose,
    dialogId,
    dialogRef,
    overlayRef,
    headerId,
    bodyId,
  };
}

type DialogProviderReturn = ReturnType<typeof useDialogProvider>;
const [DialogCtxProvider, useDialogCtx] = createContext<DialogProviderReturn>();

interface DialogProps extends DialogProviderProps {
  children?: React.ReactNode;
}

export function Dialog(props: DialogProps) {
  const context = useDialogProvider(props);

  if (!props.isOpen) return null;

  return (
    <DialogCtxProvider value={context}>
      <Portal>
        <FocusLock restoreFocus children={props.children} />
      </Portal>
    </DialogCtxProvider>
  );
}

function useDialogOverlay(props: any) {
  const { overlayRef } = useDialogCtx();
  const onClick = React.useCallback(event => event.stopPropagation(), []);
  return { ...props, ref: overlayRef, role: "presentation", onClick };
}

function useDialogContent(props: any) {
  const { dialogId, dialogRef, headerId, bodyId, onClose } = useDialogCtx();

  const ref = useMergeRefs(props.ref, dialogRef);

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose && onClose();
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

export const DialogContent = createChakra("section", {
  hook: useDialogContent,
  baseStyle: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    outline: 0,
  },
  attrs: { "data-chakra-dialog": "" },
});

export const DialogOverlay = createChakra("div", {
  baseStyle: {
    pos: "fixed",
    bg: "rgba(0,0,0,0.4)",
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
  },
  hook: useDialogOverlay,
  attrs: { "data-chakra-overlay": "" },
});

// TODO: Move this style to the Dialog.ts in theme
export function getBaseStyle(props: {
  colorMode?: "light" | "dark";
  isCentered?: boolean;
  scrollBehavior?: "inside" | "outside";
}) {
  const { colorMode, isCentered, scrollBehavior } = props;
  const isDark = colorMode === "dark";

  let style: SystemProps = {
    bg: isDark ? "gray.700" : "white",
    color: "inherit",
    shadow: isDark
      ? "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
      : "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
  };

  if (isCentered) {
    style = {
      ...style,
      left: "50%",
      top: "50%",
      transform: "translate3d(-50%, -50%, 0)",
    };
  } else {
    style = {
      ...style,
      left: "50%",
      transform: "translateX(-50%)",
      top: "3.75rem",
      mx: "auto",
    };
  }

  if (scrollBehavior === "inside") {
    style = {
      ...style,
      maxHeight: "calc(100vh - 7.5rem)",
      height: "100%",
      overflow: "hidden",
      top: "3.75rem",
    };
  }

  if (scrollBehavior === "outside") {
    style = {
      ...style,
      overflowY: "auto",
      overflowX: "hidden",
      marginY: "3.75rem",
      top: 0,
    };
  }

  return style;
}
