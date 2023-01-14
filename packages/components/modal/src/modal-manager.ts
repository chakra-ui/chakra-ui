import { RefObject, useEffect, useState } from "react"

/**
 * Proper state management for nested modals.
 * Simplified, but inspired by material-ui's ModalManager class.
 */
class ModalManager {
  modals: Map<HTMLElement, number>
  constructor() {
    this.modals = new Map()
  }

  add(modal: HTMLElement) {
    this.modals.set(modal, this.modals.size + 1)
    return this.modals.size
  }

  remove(modal: HTMLElement) {
    this.modals.delete(modal)
  }

  isTopModal(modal: HTMLElement | null) {
    if (!modal) return false
    return this.modals.get(modal) === this.modals.size
  }
}

export const manager = new ModalManager()

export function useModalManager(ref: RefObject<HTMLElement>, isOpen?: boolean) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    if (isOpen) {
      const index = manager.add(node)
      setIndex(index)
    }

    return () => {
      manager.remove(node)
      setIndex(0)
    }
  }, [isOpen, ref])

  return index
}
