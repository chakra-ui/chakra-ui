// Credit goes to Diego Haz for this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/createOnKeyDown.ts

import * as React from "react"
import { runIfFn } from "./function"
import { normalizeEventKey } from "./dom"

export type EventKeys =
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter"
  | "Space"
  | "Tab"
  | "Backspace"
  | "Control"
  | "Meta"
  | "Home"
  | "End"
  | "PageDown"
  | "PageUp"
  | "Delete"
  | "Escape"
  | " "
  | "Shift"

export type EventKeyMap = Partial<Record<EventKeys, React.KeyboardEventHandler>>

export interface CreateOnKeyDownOptions {
  keyMap?: EventKeyMap
  onKey?: (event: React.KeyboardEvent) => void
  preventDefault?: boolean | ((event: React.KeyboardEvent) => boolean)
  stopPropagation?: boolean | ((event: React.KeyboardEvent) => boolean)
  onKeyDown?: (event: React.KeyboardEvent) => void
  shouldKeyDown?: (event: React.KeyboardEvent) => boolean
}

export function createOnKeyDown(options: CreateOnKeyDownOptions) {
  const {
    keyMap,
    onKey,
    stopPropagation,
    onKeyDown,
    shouldKeyDown = () => true,
    preventDefault = true,
  } = options

  return (event: React.KeyboardEvent) => {
    if (!keyMap) return

    const finalKeyMap = runIfFn(keyMap, event)
    const shouldPreventDefault = runIfFn(preventDefault, event)
    const shouldStopPropagation = runIfFn(stopPropagation, event)

    const eventKey = normalizeEventKey(event)

    if (eventKey in finalKeyMap) {
      const action = finalKeyMap[eventKey as EventKeys]

      if (typeof action === "function" && shouldKeyDown(event)) {
        if (shouldPreventDefault) event.preventDefault()
        if (shouldStopPropagation) event.stopPropagation()
        onKey?.(event)
        action(event)
        return
      }
    }

    onKeyDown?.(event)
  }
}
