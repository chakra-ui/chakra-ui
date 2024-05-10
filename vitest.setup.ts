import "@testing-library/jest-dom/vitest"
import { expect } from "vitest"
import "vitest-axe/extend-expect"
import * as matchers from "vitest-axe/matchers"

expect.extend(matchers)

const { getComputedStyle } = window
window.getComputedStyle = (elt) => getComputedStyle(elt)
window.Element.prototype.scrollTo = () => {}
window.scrollTo = () => {}

if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// Workaround https://github.com/jsdom/jsdom/issues/2524#issuecomment-897707183
global.TextEncoder = require("util").TextEncoder

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

window.HTMLCanvasElement.prototype.getContext = vi
  .fn()
  .mockImplementation(() => ({}))
