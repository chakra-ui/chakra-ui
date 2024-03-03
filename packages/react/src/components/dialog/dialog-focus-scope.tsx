import { usePresence } from "framer-motion"
import { useEffect } from "react"
import { RemoveScroll } from "react-remove-scroll"
import { FocusLock } from "../focus-lock"
import { useDialogContext } from "./dialog-context"
import { useDialogManager } from "./dialog-manager"

interface DialogFocusScopeProps {
  children: any
}

export function DialogFocusScope(props: DialogFocusScopeProps) {
  const {
    autoFocus,
    trapFocus,
    contentRef,
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

  const index = useDialogManager(contentRef, isOpen)

  return (
    <FocusLock
      autoFocus={autoFocus}
      isDisabled={!trapFocus}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      restoreFocus={returnFocusOnClose}
      contentRef={contentRef}
      lockFocusAcrossFrames={lockFocusAcrossFrames}
    >
      <RemoveScroll
        removeScrollBar={!preserveScrollBarGap}
        allowPinchZoom={allowPinchZoom}
        // only block scroll for first dialog
        enabled={index === 1 && blockScrollOnMount}
      >
        {props.children}
      </RemoveScroll>
    </FocusLock>
  )
}
