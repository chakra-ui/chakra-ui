import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { useIsomorphicEffect } from "@chakra-ui/hooks"
import { Portal } from "@chakra-ui/portal"
import { chakra, PropsOf } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import * as React from "react"
import { DialogHookProps, DialogHookReturn, useDialog } from "./Dialog.hook"

type DialogContext = DialogHookReturn &
  Pick<DialogProps, "isCentered" | "scrollBehavior">

const [DialogContextProvider, useDialogContext] = createContext<DialogContext>()

export interface DialogProps extends DialogHookProps {
  children?: React.ReactNode
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<any>
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<any>
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   */
  returnFocusOnClose?: boolean
  /**
   *  If `true`, the modal will be centered on screen.
   */
  isCentered?: boolean
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   */
  scrollBehavior?: "inside" | "outside"
}

export function Dialog(props: DialogProps) {
  const {
    children,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose = true,
    isOpen = true,
    scrollBehavior = "outside",
    isCentered,
  } = props

  const context = { ...useDialog(props), scrollBehavior, isCentered }

  if (!isOpen) return null

  return (
    <DialogContextProvider value={context}>
      <Portal>
        <FocusLock
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={returnFocusOnClose}
        >
          {children}
        </FocusLock>
      </Portal>
    </DialogContextProvider>
  )
}

export type DialogContentProps = PropsOf<typeof chakra.div>

export const DialogContent = (props: DialogContentProps) => {
  const { getDialogContentProps, scrollBehavior } = useDialogContext()
  return (
    <StyledContent
      data-chakra-dialog-content=""
      scrollBehavior={scrollBehavior}
      {...getDialogContentProps(props)}
    />
  )
}

const StyledContent = chakra("section", {
  themeKey: "Dialog.Content",
  baseStyle: (props: any) => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    marginY: "3.75rem",
    maxHeight:
      props.scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
    overflow: props.scrollBehavior === "inside" ? "auto" : undefined,
    _focus: {
      outline: 0,
    },
  }),
})

export type DialogOverlayProps = PropsOf<typeof StyledOverlay>

export const DialogOverlay = (props: DialogOverlayProps) => {
  const {
    getDialogOverlayProps,
    scrollBehavior,
    isCentered,
  } = useDialogContext()
  return (
    <StyledOverlay
      data-chakra-dialog-overlay=""
      scrollBehavior={scrollBehavior}
      isCentered={isCentered}
      {...getDialogOverlayProps(props as any)}
    />
  )
}

const StyledOverlay = chakra("div", {
  themeKey: "Dialog.Overlay",
  baseStyle: (props: any) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: props.isCentered ? "center" : "flex-start",
    overflow: props.scrollBehavior === "inside" ? "hidden" : "auto",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  }),
  shouldForwardProp(prop) {
    return !["scrollBehavior", "isCentered"].includes(prop)
  },
})

export type DialogHeaderProps = PropsOf<typeof StyledHeader>

export const DialogHeader = (props: DialogHeaderProps) => {
  const { headerId, setHeaderMounted } = useDialogContext()

  useIsomorphicEffect(() => {
    setHeaderMounted(true)
    return () => setHeaderMounted(false)
  }, [])

  return <StyledHeader data-chakra-dialog-header="" id={headerId} {...props} />
}

const StyledHeader = chakra("header", {
  themeKey: "Dialog.Header",
})

export type DialogBodyProps = PropsOf<"div">

export const DialogBody = (props: DialogBodyProps) => {
  const { bodyId, setBodyMounted } = useDialogContext()

  useIsomorphicEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [])

  return <StyledBody data-chakra-dialog-body="" id={bodyId} {...props} />
}

const StyledBody = chakra("div", { themeKey: "Dialog.Body" })

export const DialogFooter = chakra("footer", {
  themeKey: "Dialog.Footer",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export const DialogCloseButton = (props: CloseButtonProps) => {
  const { onClose } = useDialogContext()
  return (
    <CloseButton
      onClick={onClose as any}
      position="absolute"
      top="8px"
      right="12px"
      {...props}
    />
  )
}
