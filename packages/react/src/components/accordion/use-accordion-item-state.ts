import { useAccordionItemContext } from "./accordion-context"

/**
 * React hook to get the state and actions of an accordion item
 */
export function useAccordionItemState() {
  const { isOpen, isDisabled, onClose, onOpen } = useAccordionItemContext()
  return { isOpen, onClose, isDisabled, onOpen }
}
