import "@testing-library/jest-dom/vitest"
import { act, render, screen, waitFor } from "@testing-library/react"
import { StrictMode } from "react"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import {
  type CreateOverlayProps,
  createOverlay,
} from "../src/hooks/use-overlay"

const opens: boolean[] = []

const { Viewport, open, close, removeAll, getSnapshot } = createOverlay(
  (props: { label?: string } & CreateOverlayProps) => {
    opens.push(props.open ?? false)
    return <div data-testid="overlay" data-open={String(props.open)} />
  },
)

describe("createOverlay", () => {
  beforeEach(() => {
    opens.length = 0
  })

  afterEach(() => {
    removeAll()
  })

  it("does not mount the overlay as open on the first commit (StrictMode-safe)", async () => {
    render(
      <StrictMode>
        <Viewport />
      </StrictMode>,
    )

    await act(async () => {
      open("a", {})
    })

    await waitFor(() => {
      expect(screen.getByTestId("overlay")).toHaveAttribute("data-open", "true")
    })

    expect(opens[0]).toBe(false)
    expect(opens.some((o) => o === true)).toBe(true)
  })

  it("applies open from props after mount", async () => {
    render(
      <StrictMode>
        <Viewport />
      </StrictMode>,
    )

    await act(async () => {
      open("a", { label: "hi" })
    })

    await waitFor(() => {
      expect(screen.getByTestId("overlay")).toHaveAttribute("data-open", "true")
    })
  })

  it("passes open=false when the overlay is closed", async () => {
    render(
      <StrictMode>
        <Viewport />
      </StrictMode>,
    )

    await act(async () => {
      open("a", {})
    })

    await waitFor(() => {
      expect(screen.getByTestId("overlay")).toHaveAttribute("data-open", "true")
    })

    await act(async () => {
      void close("a")
    })

    await waitFor(() => {
      expect(screen.getByTestId("overlay")).toHaveAttribute(
        "data-open",
        "false",
      )
    })
  })

  it("exposes a stable getSnapshot of overlay props", async () => {
    render(
      <StrictMode>
        <Viewport />
      </StrictMode>,
    )

    await act(async () => {
      open("x", { label: "one" })
    })

    await waitFor(() => {
      expect(getSnapshot().length).toBe(1)
    })
  })
})
