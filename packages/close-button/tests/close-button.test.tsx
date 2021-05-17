import * as React from "react"
import { render, testA11y, screen } from "@chakra-ui/test-utils"
import { CloseButton } from "../src"

it("passes a11y test", async () => {
  await testA11y(<CloseButton />)
})

test("has the proper aria attributes", () => {
  render(<CloseButton />)
  expect(screen.getByLabelText("Close")).toBeInTheDocument()
})
