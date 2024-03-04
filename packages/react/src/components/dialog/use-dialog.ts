import { mergeRefs } from "@chakra-ui/hooks"
import { callAllHandlers } from "@chakra-ui/utils"
import { PropGetter } from "@chakra-ui/utils/prop-types"
import { useCallback, useRef, useState } from "react"
import { dialogManager, useDialogManager } from "./dialog-manager"
import { useAriaHidden, useIds } from "./use-aria-hidden"

export interface UseDialogProps {
  /**
   * The `role` attribute of the dialog
   */
  role?: "dialog" | "alertdialog"
  /**
   * If `true`, the dialog will be open.
   */
  isOpen: boolean
  /**
   * The `id` of the dialog
   */
  id?: string
  /**
   * Callback invoked to close the dialog.
   */
  onClose(): void
  /**
   * If `true`, the dialog will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean
  /**
   * If `true`, the dialog will close when the `Esc` key is pressed
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
  onEsc?(): void
  /**
   * A11y: If `true`, the siblings of the `dialog` will have `aria-hidden`
   * set to `true` so that screen readers can only see the `dialog`.
   *
   * This is commonly known as making the other elements **inert**
   *
   * @default true
   */
  useInert?: boolean
}

export function useDialog(props: UseDialogProps) {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    useInert = true,
    onOverlayClick: onOverlayClickProp,
    onEsc,
    role = "dialog",
  } = props

  const contentRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLElement>(null)

  const [dialogId, headerId, bodyId] = useIds(
    id,
    `chakra-dialog`,
    `chakra-dialog--header`,
    `chakra-dialog--body`,
  )

  const index = useDialogManager(contentRef, isOpen)

  useAriaHidden(contentRef, isOpen && useInert)

  const mouseDownTarget = useRef<EventTarget | null>(null)

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    mouseDownTarget.current = event.target
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation()

        if (closeOnEsc) {
          onClose?.()
        }

        onEsc?.()
      }
    },
    [closeOnEsc, onClose, onEsc],
  )

  const [headerMounted, setHeaderMounted] = useState(false)
  const [bodyMounted, setBodyMounted] = useState(false)

  const getContentProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      role,
      ...props,
      ref: mergeRefs(ref, contentRef),
      id: dialogId,
      tabIndex: -1,
      "aria-modal": true,
      "aria-labelledby": headerMounted ? headerId : undefined,
      "aria-describedby": bodyMounted ? bodyId : undefined,
      onClick: callAllHandlers(props.onClick, (event: React.MouseEvent) =>
        event.stopPropagation(),
      ),
    }),
    [bodyId, bodyMounted, dialogId, headerId, headerMounted, role],
  )

  const onOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      /**
       * Make sure the event starts and ends on the same DOM element.
       *
       * This is used to prevent the dialog from closing when you
       * start dragging from the content, and release drag outside the content.
       *
       * We prevent this because it is technically not a considered "click outside"
       */
      if (mouseDownTarget.current !== event.target) return

      /**
       * When you click on the overlay, we want to remove only the topmost dialog
       */
      if (!dialogManager.isTopMost(contentRef.current)) return

      if (closeOnOverlayClick) {
        onClose?.()
      }

      onOverlayClickProp?.()
    },
    [onClose, closeOnOverlayClick, onOverlayClickProp],
  )

  const getPositionerProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, overlayRef),
      onClick: callAllHandlers(props.onClick, onOverlayClick),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
    }),
    [onKeyDown, onMouseDown, onOverlayClick],
  )

  return {
    isOpen,
    onClose,
    headerId,
    bodyId,
    setBodyMounted,
    setHeaderMounted,
    contentRef,
    overlayRef,
    getContentProps,
    getPositionerProps,
    index,
  }
}

export type UseDialogReturn = ReturnType<typeof useDialog>
