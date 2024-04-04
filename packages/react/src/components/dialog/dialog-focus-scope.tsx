"use client"

import { RemoveScroll } from "react-remove-scroll"
import { FocusLock } from "../focus-lock"
import { useDialogContext } from "./dialog-context"

interface DialogFocusScopeProps {
  children: React.ReactNode
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
    index,
  } = useDialogContext()

  return (
    <FocusLock
      autoFocus={autoFocus}
      disabled={!trapFocus}
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
