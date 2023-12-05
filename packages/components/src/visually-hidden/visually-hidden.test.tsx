import { render, testA11y } from "@chakra-ui/test-utils"
import { VisuallyHidden } from "."

test("should render correctly", async () => {
  const { getByText } = render(<VisuallyHidden>Click me</VisuallyHidden>)

  expect(getByText(/Click me/i)).toBeInTheDocument()
})

test("should have no accessibility violations", async () => {
  await testA11y(
    <button>
      <VisuallyHidden>Click Me</VisuallyHidden>
      <span>Submit</span>
    </button>,
  )
})

test("should render a visually hidden input", async () => {
  const { getByTestId } = render(
    <VisuallyHidden
      data-testid="input"
      as="input"
      type="checkbox"
      defaultChecked
    />,
  )

  const input = getByTestId("input")

  expect(input).toBeInstanceOf(HTMLInputElement)
  expect(input).toBeChecked()
})
