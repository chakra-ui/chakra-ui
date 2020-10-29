import { RefObject, useEffect, useRef } from "react"
import { useLatestRef } from "./use-latest-ref"

interface UseOutsideClickOptions {
  ref: RefObject<HTMLElement>
  handler: (e: Event) => void
}

/**
 * Example, used in components like Dialogs and Popovers so they can close
 * when a user clicks outside them.
 */
export function useOutsideClick(props: UseOutsideClickOptions) {
  const { ref, handler } = props
  const savedHandler = useLatestRef(handler)

  const stateRef = useRef({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
  })

  const state = stateRef.current

  useEffect(() => {
    const onPointerDown: any = (e: PointerEvent) => {
      if (isValidEvent(e, ref)) {
        state.isPointerDown = true
      }
    }

    const onMouseUp: any = (event: MouseEvent) => {
      if (state.ignoreEmulatedMouseEvents) {
        state.ignoreEmulatedMouseEvents = false
        return
      }

      if (state.isPointerDown && handler && isValidEvent(event, ref)) {
        state.isPointerDown = false
        savedHandler.current?.(event)
      }
    }

    const onTouchEnd = (event: TouchEvent) => {
      state.ignoreEmulatedMouseEvents = true
      if (handler && state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false
        savedHandler.current?.(event)
      }
    }

    document.addEventListener("mousedown", onPointerDown, true)
    document.addEventListener("mouseup", onMouseUp, true)
    document.addEventListener("touchstart", onPointerDown, true)
    document.addEventListener("touchend", onTouchEnd, true)

    return () => {
      document.removeEventListener("mousedown", onPointerDown, true)
      document.removeEventListener("mouseup", onMouseUp, true)
      document.removeEventListener("touchstart", onPointerDown, true)
      document.removeEventListener("touchend", onTouchEnd, true)
    }
  }, [handler, ref, state.ignoreEmulatedMouseEvents, state.isPointerDown])
}

function isValidEvent(event: any, ref: React.RefObject<HTMLElement>) {
  const target = event.target as HTMLElement
  if (event.button > 0) return false
  // if the event target is no longer in the document
  if (target) {
    const ownerDocument = target.ownerDocument
    if (!ownerDocument || !ownerDocument.body.contains(target)) {
      return false
    }
  }

  return ref.current && !ref.current.contains(target)
}
