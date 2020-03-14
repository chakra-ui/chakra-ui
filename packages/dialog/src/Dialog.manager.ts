import * as React from "react"

/**
 * Proper state management for nested dialogs.
 * Simplified, but inspired by material-ui's ModalManager class.
 */
class DialogManager {
  dialogs: any[]
  constructor() {
    this.dialogs = []
  }

  add(dialog: any) {
    this.dialogs.push(dialog)
  }

  remove(dialog: any) {
    this.dialogs = this.dialogs.filter(_dialog => _dialog !== dialog)
  }

  isTopDialog(dialog: any) {
    const topmostDialog = this.dialogs[this.dialogs.length - 1]
    return topmostDialog === dialog
  }
}

export const manager = new DialogManager()

export function useDialogManager(ref: React.Ref<any>, isOpen?: boolean) {
  React.useEffect(() => {
    isOpen && manager.add(ref)
    return () => {
      manager.remove(ref)
    }
  }, [isOpen, ref])
}
