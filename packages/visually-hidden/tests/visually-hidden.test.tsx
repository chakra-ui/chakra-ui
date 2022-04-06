import * as React from "react"

import { render, testA11y, screen } from "@chakra-ui/test-utils"
import { VisuallyHidden } from "../src"

test("should render correctly", async () => {
  render(<VisuallyHidden>Click me</VisuallyHidden>)

  expect(screen.getByText(/Click me/i)).toMatchInlineSnapshot(`
    .emotion-0 {
      border: 0px;
      clip: rect(0px, 0px, 0px, 0px);
      height: 1px;
      width: 1px;
      margin: -1px;
      padding: 0px;
      overflow: hidden;
      white-space: nowrap;
      position: absolute;
    }

    <span
      class="emotion-0"
    >
      Click me
    </span>
  `)
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
  render(
    <VisuallyHidden
      data-testid="input"
      as="input"
      type="checkbox"
      defaultChecked
    />,
  )

  const input = screen.getByTestId("input")

  expect(input).toBeInstanceOf(HTMLInputElement)
  expect(input).toBeChecked()
})
