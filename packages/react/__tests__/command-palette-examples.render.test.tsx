import * as stories from "../__stories__/command-palette.stories"
import { render } from "./core/render"

const { default: _meta, ...examples } = stories

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverStub)
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ results: [] }) }),
    ),
  )
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe("command palette example stories", () => {
  for (const [name, Example] of Object.entries(examples)) {
    it(`renders ${name}`, () => {
      const { unmount } = render(<Example />)
      unmount()
    })
  }
})
