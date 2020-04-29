import { isBrowser } from "@chakra-ui/utils"
import * as React from "react"
import { render } from "react-dom"
import { Methods, ToastManager } from "./Toast.manager"
import { ToastId, ToastMessage, ToastOptions } from "./Toast.types"

const PORTAL_ID = "chakra-toast-portal"

class Toaster {
  private createToast?: Methods["notify"]
  private removeAll?: Methods["closeAll"]
  private closeToast?: Methods["close"]
  private updateToast?: Methods["update"]
  private isToastActive?: Methods["isActive"]

  constructor() {
    if (!isBrowser) return

    let portal: HTMLElement
    const existingPortal = document.getElementById(PORTAL_ID)

    if (existingPortal) {
      portal = existingPortal
    } else {
      const div = document.createElement("div")
      div.id = PORTAL_ID
      document.body?.appendChild(div)
      portal = div
    }

    render(<ToastManager notify={this.bindFunctions} />, portal)
  }

  private bindFunctions = (methods: Methods) => {
    this.createToast = methods.notify
    this.removeAll = methods.closeAll
    this.closeToast = methods.close
    this.updateToast = methods.update
    this.isToastActive = methods.isActive
  }

  notify = (message: ToastMessage, options: Partial<ToastOptions> = {}) => {
    return this.createToast?.(message, options)
  }

  close = (id: ToastId) => {
    this.closeToast?.(id)
  }

  closeAll = () => {
    this.removeAll?.()
  }

  update = (id: ToastId, options: Partial<ToastOptions> = {}) => {
    this.updateToast?.(id, options)
    window.scrollBy({ top: 10 })
    window.scrollBy({ top: -10 })
  }

  isActive = (id: ToastId) => {
    return this.isToastActive?.(id)
  }
}

export const toast = new Toaster()
