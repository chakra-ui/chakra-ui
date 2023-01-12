import { FocusLock } from "@chakra-ui/focus-lock"
import { usePresence } from "framer-motion"
import { useEffect } from "react"
import { RemoveScroll } from "react-remove-scroll"

import { useModalContext } from "./modal"
import { useModalManager } from "./modal-manager"

interface ModalFocusScopeProps {
  /**
   * @type React.ReactElement
   */
  children: React.ReactElement
}

export function ModalFocusScope(props: ModalFocusScopeProps) {
  const {
    autoFocus,
    trapFocus,
    dialogRef,
    initialFocusRef,
    blockScrollOnMount,
    allowPinchZoom,
    finalFocusRef,
    returnFocusOnClose,
    preserveScrollBarGap,
    lockFocusAcrossFrames,
    isOpen,
  } = useModalContext()

  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    if (!isPresent && safeToRemove) {
      setTimeout(safeToRemove)
    }
  }, [isPresent, safeToRemove])

  const index = useModalManager(dialogRef, isOpen)

  return (
    <FocusLock
      autoFocus={autoFocus}
      isDisabled={!trapFocus}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      restoreFocus={returnFocusOnClose}
      contentRef={dialogRef}
      lockFocusAcrossFrames={lockFocusAcrossFrames}
    >
      <RemoveScroll
        removeScrollBar={!preserveScrollBarGap}
        allowPinchZoom={allowPinchZoom}
        // only block scroll for first dialog
        enabled={index === 1 && blockScrollOnMount}
        forwardProps
      >
        {props.children}
      </RemoveScroll>
    </FocusLock>
  )
}
