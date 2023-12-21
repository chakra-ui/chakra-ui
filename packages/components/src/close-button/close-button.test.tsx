import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { CloseButton } from "."

test("passes a11y test", async () => {
  await testA11y(<CloseButton />)
})

test("has the proper aria attributes", () => {
  render(<CloseButton />)
  expect(screen.getByLabelText("Close")).toBeInTheDocument()
})
