import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { Portal } from "@chakra-ui/portal"
import {
  chakra,
  PropsOf,
  ThemingProps,
  useComponentDefaults,
} from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import * as React from "react"
import { DialogHookProps, DialogHookReturn, useDialog } from "./Dialog.hook"

type DialogContext = DialogHookReturn &
  Pick<DialogProps, "isCentered" | "scrollBehavior"> &
  Pick<ThemingProps, "variant" | "size">

const [DialogContextProvider, useDialogContext] = createContext<DialogContext>()

export interface DialogProps extends DialogHookProps, ThemingProps {
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
  const defaults = useComponentDefaults("Dialog")

  const {
    children,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose = true,
    isOpen = true,
    scrollBehavior = "outside",
    size = defaults?.size,
    variant = defaults?.variant,
    isCentered,
  } = props

  const context = {
    ...useDialog(props),
    scrollBehavior,
    isCentered,
    size,
    variant,
  }

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
  const {
    getDialogContentProps,
    scrollBehavior,
    variant,
    size,
  } = useDialogContext()

  return (
    <StyledContent
      variant={variant}
      size={size}
      data-chakra-dialog-content=""
      scrollBehavior={scrollBehavior}
      {...getDialogContentProps(props)}
    />
  )
}

type ContentOptions = Pick<DialogProps, "scrollBehavior">

const StyledContent = chakra<"section", ContentOptions>("section", {
  themeKey: "Dialog.Content",
  baseStyle: props => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    width: "100%",
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
    variant,
    size,
  } = useDialogContext()

  return (
    <StyledOverlay
      variant={variant}
      size={size}
      data-chakra-dialog-overlay=""
      scrollBehavior={scrollBehavior}
      isCentered={isCentered}
      {...getDialogOverlayProps(props)}
    />
  )
}

type OverlayOptions = Pick<DialogProps, "isCentered" | "scrollBehavior">

const StyledOverlay = chakra<"div", OverlayOptions>("div", {
  themeKey: "Dialog.Overlay",
  baseStyle: props => ({
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

  useSafeLayoutEffect(() => {
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

  useSafeLayoutEffect(() => {
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
      onClick={onClose}
      position="absolute"
      top="8px"
      right="12px"
      {...props}
    />
  )
}
