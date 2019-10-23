// Credit goes to Diego Haz for this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/createOnKeyDown.ts

import * as React from "react";
import { resolveCallback } from "callbacks";

type KeyMap = {
  [key: string]:
    | ((event: React.KeyboardEvent<any>) => any)
    | null
    | false
    | undefined;
};

type Options = {
  keyMap?: KeyMap | ((event: React.KeyboardEvent) => KeyMap);
  onKey?: (event: React.KeyboardEvent) => any;
  preventDefault?: boolean | ((event: React.KeyboardEvent) => boolean);
  stopPropagation?: boolean | ((event: React.KeyboardEvent) => boolean);
  onKeyDown?: (event: React.KeyboardEvent) => void;
  shouldKeyDown?: (event: React.KeyboardEvent) => boolean;
};

export function createOnKeyDown({
  keyMap,
  onKey,
  stopPropagation,
  onKeyDown,
  shouldKeyDown = () => true,
  preventDefault = true,
}: Options = {}) {
  return (event: React.KeyboardEvent) => {
    if (!keyMap) return;

    const finalKeyMap = resolveCallback(keyMap, event);
    const shouldPreventDefault = resolveCallback(preventDefault, event);
    const shouldStopPropagation = resolveCallback(stopPropagation, event);

    if (event.key in finalKeyMap) {
      const action = finalKeyMap[event.key];
      if (typeof action === "function" && shouldKeyDown(event)) {
        if (shouldPreventDefault) event.preventDefault();
        if (shouldStopPropagation) event.stopPropagation();
        if (onKey) onKey(event);
        action(event);
        // Prevent onKeyDown from being called twice for the same keys
        return;
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };
}
