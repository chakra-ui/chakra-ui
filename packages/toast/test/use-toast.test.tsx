import * as React from "react"
import { render, screen, waitFor } from "@chakra-ui/test-utils"
import { ToastProvider, useToast } from "../src"

describe("useToast", () => {
  beforeEach(async () => {
    const toasts = screen.queryAllByRole("listitem")
    await Promise.all(
      toasts.map((toasts) =>
        waitFor(() => expect(toasts).not.toBeInTheDocument()),
      ),
    )
  })

  it("should accept default options", async () => {
    const title = "Yay!"

    const description = "Something awesome happened"

    const TestComponent = () => {
      const toast = useToast()
      return (
        <button onClick={() => toast({ title, description })}>Toast</button>
      )
    }

    const { user } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    const button = await screen.findByText("Toast")
    await user.click(button)

    const allByTitle = await screen.findAllByRole("alert", { name: title })
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })

  it("should override default options", async () => {
    const defaultTitle = "Yay!"
    const defaultDescription = "Something awesome happened"

    const title = "Hooray!"
    const description = "Something splendid happened"

    const TestComponent = () => {
      const toast = useToast({
        title: defaultTitle,
        description: defaultDescription,
      })
      return (
        <button onClick={() => toast({ title, description })}>Toast</button>
      )
    }

    const { user } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    const button = await screen.findByText("Toast")
    await user.click(button)

    const allByTitle = await screen.findAllByRole("alert", { name: title })
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })

  it("should allow promise toast chainings", async () => {
    const loadingTitle = "Toast is loading"
    const successTitle = "Promise resolved"
    const errorTitle = "Error occurred"
    const sleepTime = 200
    const dummyPromise = new Promise<{ payload: string }>((r) =>
      setTimeout(r, sleepTime, { payload: successTitle }),
    )

    const TestComponent = () => {
      const toast = useToast()

      return (
        <button
          onClick={() =>
            toast.promise(dummyPromise, {
              loading: {
                title: loadingTitle,
              },
              success: (data) => ({
                title: data.payload,
              }),
              error: () => ({
                title: errorTitle,
              }),
            })
          }
        >
          Toast
        </button>
      )
    }

    const { user } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    const button = await screen.findByText("Toast")
    await user.click(button)

    const loadingToast = await screen.findByRole("alert", {
      name: loadingTitle,
    })
    expect(loadingToast).toBeInTheDocument()

    const successToast = await screen.findByRole("alert", {
      name: successTitle,
    })
    expect(successToast).toBeInTheDocument()
  })
})
