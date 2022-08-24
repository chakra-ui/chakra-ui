import * as React from "react"
import { render, screen, act } from "@chakra-ui/test-utils"
import { createStandaloneToast } from "../src"

describe("Standalone Toast", () => {
  it("should render a toast correctly", async () => {
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
