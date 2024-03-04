import { act, render, screen } from "@chakra-ui/test-utils"
import { createStandaloneToast } from "."

describe("Standalone Toast", () => {
  test("should render a toast correctly", async () => {
    const { ToastContainer, toast } = createStandaloneToast()
    const title = "Yay!"
    const description = "Something awesome happened"

    render(<ToastContainer />)

    await act(async () => {
      toast({
        title,
        description,
        duration: 4000,
        isClosable: true,
      })
    })

    const allByTitle = await screen.findAllByText(title)
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })
})
