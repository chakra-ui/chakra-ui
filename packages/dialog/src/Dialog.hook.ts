import { useIds, useLockBodyScroll } from "@chakra-ui/hooks"
import { callAllHandlers, Dict, mergeRefs } from "@chakra-ui/utils"
import { Undo, hideOthers } from "aria-hidden"
import * as React from "react"
import { manager, useDialogManager } from "./Dialog.manager"

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
  onClose(): void
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
  onOverlayClick?(): void
  /**
   * Callback fired when the escape key is pressed and focus is within dialog
   */
  onEscapeKeyDown?(): void
  /**
   * A11y: If `true`, the siblings of the `Modal` will have `aria-hidden`
   * set to `true` so that screen readers can only see the `Modal`.
   *
   * This is commonly known as making the other elements **inert**
   *
   *  @default true
   */
  useInert?: boolean
}

export function useDialog(props: DialogHookProps) {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    blockScrollOnMount = true,
    useInert = true,
    onOverlayClick: onOverlayClickProp,
    onEscapeKeyDown,
  } = props

  const dialogRef = React.useRef<any>(null)
  const overlayRef = React.useRef<any>(null)

  const [dialogId, headerId, bodyId] = useIds(
    id,
    `chakra-dialog`,
    `chakra-dialog--header`,
    `chakra-dialog--body`,
  )

  /**
   * Hook used to block scrolling once the modal is open
   */
  useLockBodyScroll(dialogRef, isOpen && blockScrollOnMount)
  /**
   * Hook used to polyfill `aria-modal` for older browsers.
   * It uses `aria-hidden` to all other nodes.
   *
   * @see https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
   */
  useAriaHidden(dialogRef, isOpen && useInert)
  /**
   * Hook use to manage multiple or nested dialogs
   */
  useDialogManager(dialogRef, isOpen)

  const mouseDownTarget = React.useRef<EventTarget | null>(null)

  const onMouseDown = React.useCallback((event: React.MouseEvent) => {
    mouseDownTarget.current = event.target
  }, [])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation()

        if (closeOnEsc) {
          onClose?.()
        }

        onEscapeKeyDown?.()
      }
    },
    [closeOnEsc, onClose, onEscapeKeyDown],
  )

  const onOverlayClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()

      /**
       * Make sure the event starts and ends on the same DOM element.
       *
       * This is used to prevent the dialog from closing when you
       * start dragging from the content, and release drag outside the content.
       *
       * We prevent this because it's technically not a considered "click outside"
       */
      if (mouseDownTarget.current !== event.target) return

      /**
       * When you click on the overlay, we want to remove only the topmost dialog
       */
      if (manager.isTopDialog(dialogRef)) {
        if (closeOnOverlayClick) {
          onClose?.()
        }
        onOverlayClickProp?.()
      }
    },
    [onClose, closeOnOverlayClick, onOverlayClickProp],
  )

  const [headerMounted, setHeaderMounted] = React.useState(false)
  const [bodyMounted, setBodyMounted] = React.useState(false)

  return {
    isOpen,
    onClose,
    headerId,
    bodyId,
    setBodyMounted,
    setHeaderMounted,
    getDialogContentProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, dialogRef),
      id: dialogId,
      role: props.role || "dialog",
      tabIndex: -1,
      "aria-modal": true,
      "aria-labelledby": headerMounted ? headerId : undefined,
      "aria-describedby": bodyMounted ? bodyId : undefined,
      onClick: callAllHandlers(props.onClick, (event: React.MouseEvent) =>
        event.stopPropagation(),
      ),
    }),
    getDialogOverlayProps: (props: Dict = {}) => ({
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
  shouldHide: boolean,
) {
  React.useEffect(() => {
    if (!ref.current) return

    let undo: Undo | null = null

    if (shouldHide && ref.current) {
      undo = hideOthers(ref.current)
    }

    return () => {
      if (shouldHide) {
        undo?.()
      }
    }
  }, [shouldHide, ref])
}
