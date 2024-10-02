import { addPointerEvent } from "@chakra-ui/utils"
import { useEffect, useRef } from "react"
import { useLatestRef } from "../use-latest-ref"
import { PanEvent } from "./pan-event"
import { AnyPointerEvent, PanEventHandler, PanEventHandlers } from "./types"

export interface UsePanEventProps {
  onPan?: PanEventHandler
  onPanStart?: PanEventHandler
  onPanEnd?: PanEventHandler
  onPanSessionStart?: PanEventHandler
  onPanSessionEnd?: PanEventHandler
  threshold?: number
}

export function usePanEvent(
  ref: React.RefObject<HTMLElement>,
  options: UsePanEventProps,
) {
  const {
    onPan,
    onPanStart,
    onPanEnd,
    onPanSessionStart,
    onPanSessionEnd,
    threshold,
  } = options

  const hasPanEvents = Boolean(
    onPan || onPanStart || onPanEnd || onPanSessionStart || onPanSessionEnd,
  )

  const panSession = useRef<PanEvent | null>(null)

  const handlersRef = useLatestRef<Partial<PanEventHandlers>>({
    onSessionStart: onPanSessionStart,
    onSessionEnd: onPanSessionEnd,
    onStart: onPanStart,
    onMove: onPan,
    onEnd(event, info) {
      panSession.current = null
      onPanEnd?.(event, info)
    },
  })

  useEffect(() => {
    panSession.current?.updateHandlers(handlersRef.current)
  })

  useEffect(() => {
    const node = ref.current

    if (!node || !hasPanEvents) return

    function onPointerDown(event: AnyPointerEvent) {
      panSession.current = new PanEvent(event, handlersRef.current, threshold)
    }

    return addPointerEvent(node, "pointerdown", onPointerDown)
  }, [ref, hasPanEvents, handlersRef, threshold])

  useEffect(() => {
    return () => {
      panSession.current?.end()
      panSession.current = null
    }
  }, [])
}
