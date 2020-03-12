import { render } from "react-dom"
import * as React from "react"
import { ToastManager } from "./Toast.manager"
import { ToastMessage, ToastPosition, ToastOptions } from "./Toast.types"

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined"

const PORTAL_ID = "chakra-toast-portal"

function createDiv(attrs: { id: string; className?: string }) {
  const el = document.createElement("div")
  el.id = attrs.id
  return el
}

class Toaster {
  createNotification?: Function
  removeAll?: Function
  closeToast?: Function

  constructor() {
    if (!isBrowser) return
    let portalElement: HTMLElement
    const existingPortalElement = document.getElementById(PORTAL_ID)

    if (existingPortalElement) {
      portalElement = existingPortalElement
    } else {
      const el = createDiv({ id: PORTAL_ID })
      if (document.body != null) {
        document.body.appendChild(el)
      }
      portalElement = el
    }

    render(<ToastManager notify={this.bindNotify} />, portalElement)
  }

  closeAll = () => {
    if (this.removeAll) {
      this.removeAll()
    }
  }

  bindNotify = (fn: Function, removeAll: Function, closeToast: Function) => {
    this.createNotification = fn
    this.removeAll = removeAll
    this.closeToast = closeToast
  }

  notify = (message: ToastMessage, options: Partial<ToastOptions> = {}) => {
    if (this.createNotification) {
      return this.createNotification(message, options)
    }
  }

  close = (id: string, position: ToastPosition) => {
    if (this.closeToast) {
      this.closeToast(id, position)
    }
  }
}

export const toast = new Toaster()
