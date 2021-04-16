import {
  AnyPointerEvent,
  noop,
  PanHandler,
  PanSession,
  PanSessionHandlers,
} from "@chakra-ui/utils"
import React, { useEffect, useRef } from "react"
import { usePointerEvent } from "./use-pointer-event"
import { useUnmountEffect } from "./use-unmount-effect"

type UsePanSessionOptions = {
  onPan?: PanHandler
  onPanStart?: PanHandler
  onPanEnd?: PanHandler
  onPanSessionStart?: PanHandler
}

export function usePanSession(
  ref: React.RefObject<HTMLElement>,
  props: UsePanSessionOptions,
) {
  const { onPan, onPanStart, onPanEnd, onPanSessionStart } = props

  const hasPanEvents = Boolean(
    onPan || onPanStart || onPanEnd || onPanSessionStart,
  )
  const panSession = useRef<PanSession | null>(null)

  const handlers: Partial<PanSessionHandlers> = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd(event, info) {
      panSession.current = null
      onPanEnd?.(event, info)
    },
  }

  useEffect(() => {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers)
    }
  })

  function onPointerDown(event: AnyPointerEvent) {
    panSession.current = new PanSession(event, handlers)
  }

  usePointerEvent(
    () => ref.current,
    "pointerdown",
    hasPanEvents ? onPointerDown : noop,
  )

  useUnmountEffect(() => panSession.current?.end())
}
