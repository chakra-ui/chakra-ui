import { useAccordionItemContext } from "./accordion-context"

/**
 * React hook to get the state and actions of an accordion item
 */
export function useAccordionItemState() {
  const { open, disabled, onClose, onOpen } = useAccordionItemContext()
  return { open, onClose, disabled, onOpen }
}
