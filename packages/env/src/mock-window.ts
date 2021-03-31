import { ssrDocument } from "./mock-document"

const win = {
  document: ssrDocument,
  navigator: {
    userAgent: "",
  },
  CustomEvent: function CustomEvent() {
    return this
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ""
      },
    }
  },
  Image() {},
  Date() {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {}
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

export const ssrWindow = (win as unknown) as typeof window
