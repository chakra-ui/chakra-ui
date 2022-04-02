import {
  invoke,
  renderHook,
  screen,
  waitForElementToBeRemoved,
} from "@chakra-ui/test-utils"
import { ToastProvider, useToast } from "../src"

describe("useToast", () => {
  beforeEach(async () => {
    const toasts = screen.queryAllByRole("listitem")
    await Promise.all(toasts.map((toasts) => waitForElementToBeRemoved(toasts)))
  })

  it("should accept default options", async () => {
    const title = "Yay!"

    const description = "Something awesome happened"

    const { result } = renderHook(
      () =>
        useToast({
          title,
          description,
        }),
      {
        wrapper: ToastProvider,
      },
    )

    screen.debug()

    invoke(() => {
      result.current({ title: "ok" })
    })

    screen.debug()

    const allByTitle = screen.findAllByRole("alert", { name: title })
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })

  it("should override default options", async () => {
    const defaultTitle = "Yay!"
    const defaultDescription = "Something awesome happened"

    const { result } = renderHook(
      () =>
        useToast({
          title: defaultTitle,
          description: defaultDescription,
        }),
      { wrapper: ToastProvider },
    )

    const title = "Hooray!"
    const description = "Something splendid happened"

    invoke(() => {
      result.current({ title, description })
    })

    const allByTitle = await screen.findAllByRole("alert", { name: title })
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })
})
