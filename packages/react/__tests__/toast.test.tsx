import { act, render, screen } from "@chakra-ui/test-utils"
import { HiX } from "react-icons/hi"
import { Box, IconButton, Stack, Toast, createToaster } from "../src"

const [Toaster, toast] = createToaster({
  placement: "bottom",
  render(toast) {
    return (
      <Toast.Transition>
        <Toast.Root data-status={toast.status} status={toast.status}>
          <Stack gap="1" flex="1" maxWidth="100%">
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
          </Stack>
          <Box pos="absolute" top="1" insetEnd="1">
            <Toast.CloseTrigger asChild>
              <IconButton
                aria-label="Close"
                size="sm"
                variant="ghost"
                colorPalette="whiteAlpha"
              >
                <HiX />
              </IconButton>
            </Toast.CloseTrigger>
          </Box>
        </Toast.Root>
      </Toast.Transition>
    )
  },
})

describe("Toast", () => {
  test("should accept default options", async () => {
    const title = "Yay!"
    const description = "Something awesome happened"

    const { user } = render(
      <>
        <button onClick={() => toast({ title, description })}>Toast</button>
        <Toaster />
      </>,
    )

    const button = await screen.findByText("Toast")
    await act(() => user.click(button))

    const allByTitle = await screen.findAllByText(title)
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })

  test("should allow promise toast chainings", async () => {
    const loadingTitle = "Toast is loading"
    const successTitle = "Promise resolved"
    const errorTitle = "Error occurred"

    const sleepTime = 500
    const dummyPromise = new Promise<{ payload: string }>((r) =>
      setTimeout(r, sleepTime, { payload: successTitle }),
    )

    const { user } = render(
      <>
        <button
          onClick={() =>
            toast.promise(dummyPromise, {
              loading: { title: loadingTitle },
              success: (data) => ({ title: data.payload }),
              error: () => ({ title: errorTitle }),
            })
          }
        >
          Toast
        </button>
        <Toaster />
      </>,
    )

    const button = screen.getByText("Toast")
    await act(() => user.click(button))

    const loadingText = await screen.findByText(loadingTitle)
    expect(loadingText).toBeInTheDocument()

    const successText = await screen.findByText(successTitle)
    expect(successText).toBeInTheDocument()
  })
})
