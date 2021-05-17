import { isBrowser } from "@chakra-ui/utils"
import * as React from "react"
import { render } from "react-dom"
import { ToastMethods, ToastManager } from "./toast-manager"
import type {
  CloseAllToastsOptions,
  ToastId,
  ToastMessage,
  ToastOptions,
} from "./toast.types"

const portalId = "chakra-toast-portal"

class Toaster {
  private createToast?: ToastMethods["notify"]
  private removeAll?: ToastMethods["closeAll"]
  private closeToast?: ToastMethods["close"]
  private updateToast?: ToastMethods["update"]
  private isToastActive?: ToastMethods["isActive"]

  /**
   * Initialize the manager and mount it in the DOM
   * inside the portal node.
   *
   * @todo
   *
   * Update toast constructor to use `PortalManager`'s node or document.body.
   * Once done, we can remove the `zIndex` in `toast.manager.tsx`
   */
  constructor() {
    if (!isBrowser) return

    let portal: HTMLElement
    const existingPortal = document.getElementById(portalId)

    if (existingPortal) {
      portal = existingPortal
    } else {
      const div = document.createElement("div")
      div.id = portalId
      document.body?.appendChild(div)
      portal = div
    }

    render(<ToastManager notify={this.bindFunctions} />, portal)
  }

  private bindFunctions = (methods: ToastMethods) => {
    this.createToast = methods.notify
    this.removeAll = methods.closeAll
    this.closeToast = methods.close
    this.updateToast = methods.update
    this.isToastActive = methods.isActive
  }

  notify = (message: ToastMessage, options: Partial<ToastOptions> = {}) =>
    this.createToast?.(message, options)

  close = (id: ToastId) => {
    this.closeToast?.(id)
  }

  closeAll = (options?: CloseAllToastsOptions) => {
    this.removeAll?.(options)
  }

  update = (id: ToastId, options: Partial<ToastOptions> = {}) => {
    this.updateToast?.(id, options)
  }

  isActive = (id: ToastId) => this.isToastActive?.(id)
}

export const toast = new Toaster()
