import {
  invoke,
  renderHook,
  screen,
  waitForElementToBeRemoved,
} from "@chakra-ui/test-utils"
import { toast, useToast } from "../src"

beforeEach(async () => {
  // close all toasts before each tests and wait for them to be removed
  toast.closeAll()

  const toasts = screen.queryAllByTestId("toast")

  await Promise.all(toasts.map((toasts) => waitForElementToBeRemoved(toasts)))
})

test("can accept default options", async () => {
  const title = "Yay!"
  const description = "Something awesome happened"

  const { result } = renderHook(() =>
    useToast({
      title,
      description,
    }),
  )

  invoke(() => {
    result.current()
  })

  const allByTitle = await screen.findAllByText(title)
  const allByDescription = await screen.findAllByText(description)

  expect(allByTitle).toHaveLength(1)
  expect(allByDescription).toHaveLength(1)
})

test("can override default options", async () => {
  const defaultTitle = "Yay!"
  const defaultDescription = "Something awesome happened"

  const { result } = renderHook(() =>
    useToast({
      title: defaultTitle,
      description: defaultDescription,
    }),
  )

  const title = "Hooray!"
  const description = "Something splendid happened"

  invoke(() => {
    result.current({ title, description })
  })

  const allByTitle = await screen.findAllByText(title)
  const allByDescription = await screen.findAllByText(description)

  expect(allByTitle).toHaveLength(1)
  expect(allByDescription).toHaveLength(1)
})
