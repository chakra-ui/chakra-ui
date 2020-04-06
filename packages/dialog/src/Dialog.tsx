import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { Portal } from "@chakra-ui/portal"
import {
  chakra,
  PropsOf,
  ThemingProps,
  useThemeDefaultProps,
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

/**
 * Dialog
 *
 * React component that provides context, theming, and accessbility properties
 * to all other dialog components.
 *
 * It doesn't render any DOM node.
 */
export function Dialog(props: DialogProps) {
  const defaults = useThemeDefaultProps("Dialog")

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

type ContentOptions = Pick<DialogProps, "scrollBehavior">

/**
 * DialogContent - Theming
 *
 * To style the dialog content globally, change the styles in
 * `theme.components.Dialog` under the `Content` key
 */
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

export type DialogContentProps = PropsOf<typeof StyledContent>

/**
 * DialogContent
 *
 * React component used to group dialog's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal dialog
 */
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

type OverlayOptions = Pick<DialogProps, "isCentered" | "scrollBehavior">

/**
 * DialogOverlay - Theming
 *
 * To style the dialog overlay globally, change the styles in
 * `theme.components.Dialog` under the `Overlay` key
 */
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

export type DialogOverlayProps = PropsOf<typeof StyledOverlay>

/**
 * DialogOverlay
 *
 * React component that renders a backdrop behind the dialog. It's
 * also used as a wrapper for the dialog content for better positioning.
 *
 * @see Docs https://chakra-ui.com/dialog
 */
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

export type DialogHeaderProps = PropsOf<typeof StyledHeader>

/**
 * DialogHeader - Theming
 *
 * To style the dialog header globally, change the styles in
 * `theme.components.Dialog` under the `Header` key
 */
const StyledHeader = chakra("header", {
  themeKey: "Dialog.Header",
})

/**
 * DialogHeader
 *
 * React component that houses the title of the dialog.
 *
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogHeader = (props: DialogHeaderProps) => {
  const { headerId, setHeaderMounted } = useDialogContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-labelledby` automatically
   */
  useSafeLayoutEffect(() => {
    setHeaderMounted(true)
    return () => setHeaderMounted(false)
  }, [])

  return <StyledHeader data-chakra-dialog-header="" id={headerId} {...props} />
}

export type DialogBodyProps = PropsOf<typeof StyledBody>

/**
 * DialogBody - Theming
 *
 * To style the dialog body globally, change the styles in
 * `theme.components.Dialog` under the `Body` key
 */
const StyledBody = chakra("div", { themeKey: "Dialog.Body" })

/**
 * DialogBody
 *
 * React component that houses the main content of the dialog.
 *
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogBody = (props: DialogBodyProps) => {
  const { bodyId, setBodyMounted } = useDialogContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  useSafeLayoutEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [])

  return <StyledBody data-chakra-dialog-body="" id={bodyId} {...props} />
}

/**
 * DialogFooter
 *
 * React component that houses the action buttons of the dialog.
 *
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogFooter = chakra("footer", {
  themeKey: "Dialog.Footer",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

/**
 * DialogCloseButton
 *
 * React component used closes the dialog. You don't need
 * to pass the `onClick` to it, it's reads the `onClose` action from the
 * dialog context.
 */
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
