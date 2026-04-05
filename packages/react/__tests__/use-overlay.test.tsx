import { act, render } from "@testing-library/react"
import * as React from "react"
import { createOverlay } from "../src/hooks/use-overlay"
import type { CreateOverlayProps } from "../src/hooks/use-overlay"

interface MockProps extends CreateOverlayProps {
  title?: string
}

describe("createOverlay", () => {
  test("Viewport renders overlay items with open: false on initial mount (StrictMode safety)", async () => {
    const openValues: boolean[] = []

    const MockOverlay = (props: MockProps) => {
      openValues.push(props.open ?? false)
      return null
    }

    const overlay = createOverlay<MockProps>(MockOverlay)

    const App = () => (
      <React.StrictMode>
        <overlay.Viewport />
      </React.StrictMode>
    )

    render(<App />)

    await act(async () => {
      overlay.open("test", { title: "Test" })
    })

    // The very first render of MockOverlay must be with open: false so that
    // React StrictMode's simulated unmount/remount cycle does not leave the
    // Ark UI scroll-lock in an inconsistent state.
    expect(openValues[0]).toBe(false)

    // After the useEffect fires (deferred open), the overlay must be open.
    expect(openValues[openValues.length - 1]).toBe(true)
  })

  test("closing overlay transitions back to open: false", async () => {
    const openValues: boolean[] = []

    const MockOverlay = (props: MockProps) => {
      openValues.push(props.open ?? false)
      return null
    }

    const overlay = createOverlay<MockProps>(MockOverlay)

    const App = () => <overlay.Viewport />

    render(<App />)

    // Open then close
    await act(async () => {
      overlay.open("a", { title: "A" })
    })

    await act(async () => {
      overlay.close("a")
    })

    // After closing, the last recorded open value must be false
    expect(openValues[openValues.length - 1]).toBe(false)
  })

  test("open and close lifecycle resolves promise", async () => {
    const MockOverlay = (props: MockProps) => {
      if (props.open) {
        // Simulate exit complete immediately
        setTimeout(() => props.onExitComplete?.(), 0)
      }
      return null
    }

    const overlay = createOverlay<MockProps>(MockOverlay)

    render(<overlay.Viewport />)

    let resolved = false

    await act(async () => {
      overlay.open("b", { title: "B" }).then(() => {
        resolved = true
      })
    })

    await act(async () => {
      overlay.close("b", "return-value")
    })

    // The promise resolves once close() is called (setReturnValue is invoked)
    expect(resolved).toBe(true)
  })
})
