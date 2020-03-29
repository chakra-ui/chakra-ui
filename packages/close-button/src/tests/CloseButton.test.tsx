import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { CloseButton } from "../CloseButton"

test("CloseButton renders correctly", () => {
  const { asFragment } = render(<CloseButton />)
  expect(asFragment()).toMatchSnapshot()
})

test("has the proper aria attributes", () => {
  const { getByLabelText } = render(<CloseButton />)
  getByLabelText("Close")
})
