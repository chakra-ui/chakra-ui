// Credit goes to Diego Haz for this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/createOnKeyDown.ts

import * as React from "react";
import { resolveCallback } from "./callbacks";
import { normalizeEventKey } from "./dom";

type EventKeys =
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
  | "Shift";

type KeyMapReturn = (event?: React.KeyboardEvent) => any;
type KeyMap = Partial<Record<EventKeys, KeyMapReturn>>;

interface Options {
  /**
   * The event keys you'd like to handle
   */
  keyMap?: KeyMap;
  onKey?: (event: React.KeyboardEvent) => any;
  preventDefault?: boolean | ((event: React.KeyboardEvent) => boolean);
  stopPropagation?: boolean | ((event: React.KeyboardEvent) => boolean);
  onKeyDown?: (event: React.KeyboardEvent) => void;
  shouldKeyDown?: (event: React.KeyboardEvent) => boolean;
}

export function createOnKeyDown({
  keyMap,
  onKey,
  stopPropagation,
  onKeyDown,
  shouldKeyDown = () => true,
  preventDefault = true,
}: Options) {
  return (event: React.KeyboardEvent) => {
    if (!keyMap) return;

    const finalKeyMap = resolveCallback(keyMap, event);
    const shouldPreventDefault = resolveCallback(preventDefault, event);
    const shouldStopPropagation = resolveCallback(stopPropagation, event);

    const eventKey = normalizeEventKey(event as any);

    if (eventKey in finalKeyMap) {
      const action = finalKeyMap[eventKey as EventKeys];
      if (typeof action === "function" && shouldKeyDown(event)) {
        if (shouldPreventDefault) event.preventDefault();
        if (shouldStopPropagation) event.stopPropagation();
        if (onKey) onKey(event);
        action(event);
        return;
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };
}
