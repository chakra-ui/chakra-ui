import React from "react"
import { render, axe } from "@chakra-ui/test-utils"
import { VisuallyHidden } from ".."

test("should render correctly", async () => {
  const { getByText } = render(<VisuallyHidden>Click me</VisuallyHidden>)
  expect(getByText(/Click me/i)).toMatchInlineSnapshot(`
    <span
      style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; width: 1px; margin: -1px; padding: 0px; overflow: hidden; white-space: nowrap; position: absolute;"
    >
      Click me
    </span>
  `)
})

test("should have no accessibility violations", async () => {
  const { container } = render(
    <button>
      <VisuallyHidden>Click Me</VisuallyHidden>
      <span>Submit</span>
    </button>,
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
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
