/**
 * Credit goes to `framer-motion` of this useful utilities.
 * License can be found here: https://github.com/framer/motion
 */

import {
  EventListenerWithPointInfo,
  getPointerEventName,
  wrapPointerEventHandler,
} from "@chakra-ui/utils"
import { EventListenerRef, useEventListener } from "./use-event-listener"

export function usePointerEvent(
  env: EventListenerRef | null,
  eventName: string,
  handler: EventListenerWithPointInfo,
  options?: AddEventListenerOptions,
) {
  return useEventListener(
    getPointerEventName(eventName),
    wrapPointerEventHandler(handler, eventName === "pointerdown"),
    env,
    options,
  )
}
