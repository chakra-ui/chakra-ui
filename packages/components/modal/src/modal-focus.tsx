import { FocusLock } from "@chakra-ui/focus-lock"
import { usePresence } from "framer-motion"
import { useEffect } from "react"
import { RemoveScroll } from "react-remove-scroll"

import { useModalContext } from "./modal"

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
  } = useModalContext()

  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    if (!isPresent && safeToRemove) {
      setTimeout(safeToRemove)
    }
  }, [isPresent, safeToRemove])

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
        enabled={blockScrollOnMount}
        forwardProps
      >
        {props.children}
      </RemoveScroll>
    </FocusLock>
  )
}
