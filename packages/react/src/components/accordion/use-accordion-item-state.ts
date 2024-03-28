"use client"

import { useAccordionItemContext } from "./accordion-context"

export function useAccordionItemState() {
  const { open, disabled, onClose, onOpen } = useAccordionItemContext()
  return { open, onClose, disabled, onOpen }
}
