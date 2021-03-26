import { EventKeys } from "@chakra-ui/utils"

/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */
export function normalizeEventKey(event: React.KeyboardEvent) {
  const { key, keyCode } = event

  const isArrowKey =
    keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0

  const eventKey = isArrowKey ? `Arrow${key}` : key

  return eventKey as EventKeys
}

export function getRelatedTarget<E extends FocusEvent | React.FocusEvent>(
  event: E,
) {
  return (event.relatedTarget ||
    (event as any).nativeEvent.explicitOriginalTarget ||
    document.activeElement) as HTMLElement
}
