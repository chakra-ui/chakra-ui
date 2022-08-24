import { addPointerEvent } from "@chakra-ui/event-utils"
import { useEffect, useRef } from "react"
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

  const handlers: Partial<PanEventHandlers> = {
    onSessionStart: onPanSessionStart,
    onSessionEnd: onPanSessionEnd,
    onStart: onPanStart,
    onMove: onPan,
    onEnd(event, info) {
      panSession.current = null
      onPanEnd?.(event, info)
    },
  }

  useEffect(() => {
    panSession.current?.updateHandlers(handlers)
  })

  function onPointerDown(event: AnyPointerEvent) {
    panSession.current = new PanEvent(event, handlers, threshold)
  }

  useEffect(() => {
    const node = ref.current
    if (!node || !hasPanEvents) return
    return addPointerEvent(node, "pointerdown", onPointerDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPanEvents])

  useEffect(() => {
    return () => {
      panSession.current?.end()
      panSession.current = null
    }
  }, [])
}
