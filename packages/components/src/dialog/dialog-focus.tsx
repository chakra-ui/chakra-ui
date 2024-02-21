import { usePresence } from "framer-motion"
import { useEffect } from "react"
import { RemoveScroll } from "react-remove-scroll"
import { FocusLock } from "../focus-lock"
import { useDialogContext } from "./dialog-context"
import { useDialogManager } from "./dialog-manager"

interface DialogFocusScopeProps {
  /**
   * @type React.ReactElement
   */
  children: React.ReactElement
}

export function DialogFocusScope(props: DialogFocusScopeProps) {
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
  } = useDialogContext()

  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    if (!isPresent && safeToRemove) {
      setTimeout(safeToRemove)
    }
  }, [isPresent, safeToRemove])

  const index = useDialogManager(dialogRef, isOpen)

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
