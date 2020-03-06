import { useAriaHidden, useIds, useLockBodyScroll } from "@chakra-ui/hooks"
import { callAllHandlers, mergeRefs } from "@chakra-ui/utils"
import * as React from "react"
import { useOutsideClick, useStackContext } from "./Dialog.utils"

export interface DialogHookProps {
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
}

export function useDialog(props: DialogHookProps) {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
  } = props
  const dialogRef = React.useRef<HTMLElement>(null)
  const overlayRef = React.useRef<HTMLElement>(null)

  const [dialogId, headerId, bodyId] = useIds(
    id,
    `chakra-dialog`,
    `chakra-dialog--header`,
    `chakra-dialog--body`,
  )

  useLockBodyScroll(dialogRef, isOpen)

  const modals = useStackContext(dialogRef, isOpen)
  useOutsideClick({
    ref: dialogRef,
    overlayRef,
    dialogs: modals,
    callback: onClose,
    enabled: closeOnOverlayClick,
  })
  useAriaHidden(dialogRef, isOpen)

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!closeOnEsc) return

        event.stopPropagation()
        onClose?.()
      }
    },
    [onClose, closeOnEsc],
  )

  const onOverlayClick = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation()
  }, [])

  const [headerMounted, setHeaderMounted] = React.useState(false)
  const [bodyMounted, setBodyMounted] = React.useState(false)

  type DialogContentProps = {
    ref?: React.Ref<any>
    onKeyDown?: React.KeyboardEventHandler
  }

  type DialogOverlayProps = {
    ref?: React.Ref<any>
    onClick?: React.MouseEventHandler
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
      role: "dialog",
      tabIndex: -1,
      "aria-modal": true,
      "aria-labelledby": headerMounted ? headerId : undefined,
      "aria-describedby": bodyMounted ? bodyId : undefined,
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    }),
    getDialogOverlayProps: (props: DialogOverlayProps = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, overlayRef),
      role: "presentation",
      onClick: callAllHandlers(props.onClick, onOverlayClick),
    }),
  }
}

export type DialogHookReturn = ReturnType<typeof useDialog>
