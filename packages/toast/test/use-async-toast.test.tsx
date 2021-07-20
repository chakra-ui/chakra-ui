import {
  invoke,
  renderHook,
  screen,
  waitForElementToBeRemoved,
} from "@chakra-ui/test-utils"
import { toast, useAsyncToast } from "../src"

beforeEach(async () => {
  // close all toasts before each tests and wait for them to be removed
  toast.closeAll()

  const toasts = screen.queryAllByRole("listitem")

  await Promise.all(toasts.map((toasts) => waitForElementToBeRemoved(toasts)))
})

test("can accept default options", async () => {
  const title = "Yay!"
  const description = "Something awesome happened"

  const { result } = renderHook(() =>
    useAsyncToast(false, {
      title,
      description,
    }),
  )

  invoke(() => {
    result.current.setLoading(true)
    setTimeout(() => {
      result.current.setLoading(false)
    }, 7000)
  })

  const allByTitle = await screen.findAllByText(title)
  const allByDescription = await screen.findAllByText(description)

  expect(allByTitle).toHaveLength(1)
  expect(allByDescription).toHaveLength(1)
})
