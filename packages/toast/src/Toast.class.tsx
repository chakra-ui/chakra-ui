import { render } from "react-dom"
import * as React from "react"
import { ToastManager } from "./Toast.manager"
import { ToastMessage, ToastPosition, ToastOptions } from "./Toast.types"

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined"

const PORTAL_ID = "chakra-toast-portal"

class Toaster {
  createToast?: Function
  removeAll?: Function
  closeToast?: Function

  constructor() {
    if (!isBrowser) return
    let portalElement: HTMLElement
    const existingPortalElement = document.getElementById(PORTAL_ID)

    if (existingPortalElement) {
      portalElement = existingPortalElement
    } else {
      const el = document.createElement("div")
      el.id = PORTAL_ID
      document.body?.appendChild(el)
      portalElement = el
    }

    render(<ToastManager notify={this.bindNotify} />, portalElement)
  }

  closeAll = () => this.removeAll?.()

  bindNotify = (
    createToast: Function,
    removeAll: Function,
    closeToast: Function,
  ) => {
    this.createToast = createToast
    this.removeAll = removeAll
    this.closeToast = closeToast
  }

  notify = (message: ToastMessage, options: Partial<ToastOptions> = {}) =>
    this.createToast?.(message, options)

  close = (id: string, position: ToastPosition) => {
    this.closeToast?.(id, position)
  }
}

export const toast = new Toaster()
