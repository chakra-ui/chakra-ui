import { RefObject, useEffect, useState } from "react"

/**
 * Proper state management for nested modals.
 * Simplified, but inspired by material-ui's ModalManager class.
 */
class ModalManager {
  modals: Set<HTMLElement>
  constructor() {
    this.modals = new Set()
  }

  add(modal: HTMLElement) {
    this.modals.add(modal)
    return this.modals.size
  }

  remove(modal: HTMLElement) {
    this.modals.delete(modal)
  }

  isTopModal(modal: HTMLElement | null) {
    if (!modal) return false
    const topModal = Array.from(this.modals)[this.modals.size - 1]
    return modal === topModal
  }
}

export const modalManager = new ModalManager()

export function useModalManager(
  ref: RefObject<HTMLElement | null>,
  isOpen?: boolean,
) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    if (isOpen) {
      const index = modalManager.add(node)
      setIndex(index)
    }

    return () => {
      modalManager.remove(node)
      setIndex(0)
    }
  }, [isOpen, ref])

  return index
}
