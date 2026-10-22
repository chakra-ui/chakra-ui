import { act, screen, waitFor } from "@testing-library/react"
import { ComboboxWithAsyncContent } from "compositions/examples/combobox-with-async-content"
import { render } from "./core/render"

describe("async combobox example", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
      },
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("shows loading and error fallbacks with an empty collection", async () => {
    const initialRequest = Promise.withResolvers<Response>()
    const searchRequest = Promise.withResolvers<Response>()
    const retryRequest = Promise.withResolvers<Response>()
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockReturnValueOnce(initialRequest.promise)
        .mockReturnValueOnce(searchRequest.promise)
        .mockReturnValueOnce(retryRequest.promise),
    )

    const { user } = render(<ComboboxWithAsyncContent />)
    await user.click(screen.getByRole("button", { name: "Toggle suggestions" }))

    const content = screen.getByRole("listbox")
    expect(content).toHaveAttribute("data-empty")
    expect(content).toHaveTextContent("Loading...")
    // jsdom does not apply the layered recipe CSS, so check the override here.
    expect(content).toHaveStyle({ opacity: "1" })

    await act(async () => {
      initialRequest.resolve(Response.json({ results: [] }))
    })
    await waitFor(() => {
      expect(content).not.toHaveTextContent("Loading...")
    })
    expect(content).toHaveAttribute("data-empty")
    expect(content).not.toHaveStyle({ opacity: "1" })

    await user.type(screen.getByRole("combobox"), "x")
    expect(content).toHaveTextContent("Loading...")
    expect(content).toHaveAttribute("data-empty")
    expect(content).toHaveStyle({ opacity: "1" })

    await act(async () => {
      searchRequest.reject(new Error("Network error"))
    })
    await waitFor(() => {
      expect(content).toHaveTextContent("Error fetching")
    })
    expect(content).toHaveAttribute("data-empty")
    expect(content).toHaveStyle({ opacity: "1" })

    await user.type(screen.getByRole("combobox"), "c")
    await act(async () => {
      retryRequest.resolve(
        Response.json({
          results: [{ name: "C-3PO", height: "167", mass: "75" }],
        }),
      )
    })
    expect(await screen.findByRole("option", { name: /C-3PO/ })).toBeVisible()
    expect(content).not.toHaveAttribute("data-empty")
    expect(content).not.toHaveStyle({ opacity: "1" })
  })
})
