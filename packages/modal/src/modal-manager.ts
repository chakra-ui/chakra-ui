import { useEffect, Ref } from "react"

type HTMLElementRef = Ref<HTMLElement>

/**
 * Proper state management for nested modals.
 * Simplified, but inspired by material-ui's ModalManager class.
 */
class ModalManager {
  modals: HTMLElementRef[] = []

  add(modal: HTMLElementRef) {
    this.modals.push(modal)
  }

  remove(modal: HTMLElementRef) {
    this.modals = this.modals.filter((_modal) => _modal !== modal)
  }

  isTopModal(modal: HTMLElementRef) {
    const topmostModal = this.modals[this.modals.length - 1]
    return topmostModal === modal
  }
}

export const manager = new ModalManager()

export function useModalManager(ref: HTMLElementRef, isOpen?: boolean) {
  useEffect(() => {
    isOpen && manager.add(ref)
    return () => {
      manager.remove(ref)
    }
  }, [isOpen, ref])
}
