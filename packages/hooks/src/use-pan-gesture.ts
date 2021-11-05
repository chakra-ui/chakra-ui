import {
  AnyPointerEvent,
  noop,
  PanEventHandler,
  PanSession,
  PanSessionHandlers,
} from "@chakra-ui/utils"
import React, { useEffect, useRef } from "react"
import { usePointerEvent } from "./use-pointer-event"
import { useUnmountEffect } from "./use-unmount-effect"

export interface UsePanGestureProps {
  onPan?: PanEventHandler
  onPanStart?: PanEventHandler
  onPanEnd?: PanEventHandler
  onPanSessionStart?: PanEventHandler
  onPanSessionEnd?: PanEventHandler
  threshold?: number
}

export function usePanGesture(
  ref: React.RefObject<HTMLElement>,
  props: UsePanGestureProps,
) {
  const {
    onPan,
    onPanStart,
    onPanEnd,
    onPanSessionStart,
    onPanSessionEnd,
    threshold,
  } = props

  const hasPanEvents = Boolean(
    onPan || onPanStart || onPanEnd || onPanSessionStart || onPanSessionEnd,
  )

  const panSession = useRef<PanSession | null>(null)

  const handlers: Partial<PanSessionHandlers> = {
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
    panSession.current = new PanSession(event, handlers, threshold)
  }

  usePointerEvent(
    () => ref.current,
    "pointerdown",
    hasPanEvents ? onPointerDown : noop,
  )

  useUnmountEffect(() => {
    panSession.current?.end()
    panSession.current = null
  })
}
