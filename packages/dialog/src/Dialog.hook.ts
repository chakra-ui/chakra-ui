import { useIds, useLockBodyScroll } from "@chakra-ui/hooks"
import { callAllHandlers, mergeRefs } from "@chakra-ui/utils"
import * as AriaHidden from "aria-hidden"
import * as React from "react"
import { manager, useDialogManager } from "./Dialog.manager"

export interface DialogHookProps {
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   */
  scrollBehavior?: "inside" | "outside"
  /**
   * If `true`, the modal when be opened.
   */
  isOpen: boolean
  /**
   * The `id` of the modal
   */
  id?: string
  /**
   * Callback invoked to close the modal.
   */
  onClose: (event?: MouseEvent | KeyboardEvent) => void
  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *  @default true
   */
  blockScrollOnMount?: boolean
  /**
   * If `true`, the modal will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean
  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   * @default true
   */
  closeOnEsc?: boolean
  /**
   * Callback fired when the overlay is clicked.
   */
  onOverlayClick?: () => void
  /**
   * Callback fired when the escape key is pressed,
   * `closeOnEsc` is set to `false` and focus is within dialog
   */
  onEscapeKeyDown?: () => void
}

export function useDialog(props: DialogHookProps) {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    blockScrollOnMount = true,
    onOverlayClick: onOverlayClickProp,
  } = props

  const dialogRef = React.useRef<HTMLElement>(null)
  const overlayRef = React.useRef<HTMLElement>(null)

  const [dialogId, headerId, bodyId] = useIds(
    id,
    `chakra-dialog`,
    `chakra-dialog--header`,
    `chakra-dialog--body`,
  )

  useLockBodyScroll(dialogRef, isOpen && blockScrollOnMount)
  useAriaHidden(dialogRef, isOpen)
  useDialogManager(dialogRef, isOpen)

  const mouseDownTarget = React.useRef<EventTarget | null>(null)

  const onMouseDown = React.useCallback((event: React.MouseEvent) => {
    mouseDownTarget.current = event.target
  }, [])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation()
        closeOnEsc && onClose?.()
      }
    },
    [closeOnEsc, onClose],
  )

  const onOverlayClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()

      // Make sure the event starts and ends on the same DOM element.
      if (mouseDownTarget.current !== event.target) return

      onOverlayClickProp?.()

      if (manager.isTopDialog(dialogRef)) {
        closeOnOverlayClick && onClose?.()
      }
    },
    [onClose, closeOnOverlayClick, onOverlayClickProp],
  )

  const [headerMounted, setHeaderMounted] = React.useState(false)
  const [bodyMounted, setBodyMounted] = React.useState(false)

  type DialogContentProps = {
    ref?: React.Ref<any>
    onClick?: React.MouseEventHandler
    role?: string
  }

  type DialogOverlayProps = {
    ref?: React.Ref<any>
    onClick?: React.MouseEventHandler
    onMouseDown?: React.MouseEventHandler
    onKeyDown?: React.KeyboardEventHandler
  }

  return {
    isOpen,
    onClose,
    headerId,
    bodyId,
    setBodyMounted,
    setHeaderMounted,
    getDialogContentProps: (props: DialogContentProps = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, dialogRef),
      id: dialogId,
      role: props.role || "dialog",
      tabIndex: -1,
      "aria-modal": true,
      "aria-labelledby": headerMounted ? headerId : undefined,
      "aria-describedby": bodyMounted ? bodyId : undefined,
      onClick: callAllHandlers(props.onClick, event => event.stopPropagation()),
    }),
    getDialogOverlayProps: (props: DialogOverlayProps = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, overlayRef),
      onClick: callAllHandlers(props.onClick, onOverlayClick),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
    }),
  }
}

export type DialogHookReturn = ReturnType<typeof useDialog>

export function useAriaHidden(
  ref: React.RefObject<HTMLElement>,
  activate: boolean,
) {
  React.useEffect(() => {
    if (!ref.current) return

    let undoAriaHidden: AriaHidden.Undo | null = null
    const elementNode = ref.current

    if (activate && elementNode) {
      undoAriaHidden = AriaHidden.hideOthers(elementNode)
    }

    return () => {
      if (activate && undoAriaHidden) undoAriaHidden()
    }
  }, [activate, ref])
}
