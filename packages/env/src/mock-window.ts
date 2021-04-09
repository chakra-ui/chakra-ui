import { ssrDocument } from "./mock-document"

const noop = () => {}

const win = {
  document: ssrDocument,
  navigator: {
    userAgent: "",
  },
  CustomEvent: function CustomEvent() {
    return this
  },
  addEventListener: noop,
  removeEventListener: noop,
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ""
      },
    }
  },
  setTimeout: noop,
  clearTimeout: noop,
  matchMedia() {
    return {
      matches: false,
      addListener: noop,
      removeListener: noop,
    }
  },
  requestAnimationFrame(callback: () => void) {
    if (typeof setTimeout === "undefined") {
      callback()
      return null
    }
    return setTimeout(callback, 0)
  },
  cancelAnimationFrame(id: number) {
    if (typeof setTimeout === "undefined") {
      return
    }
    clearTimeout(id)
  },
}

export const ssrWindow = (win as unknown) as Window
