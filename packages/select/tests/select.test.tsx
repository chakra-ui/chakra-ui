import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { Select } from "../src"

test("should pass a11y check", async () => {
  const { container } = render(
    <Select aria-label="Select Food" placeholder="Select an option">
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
    </Select>,
  )
  await testA11y(container)
})

test("renders a placeholder option", () => {
  const { container } = render(<Select placeholder="Select an option" />)
  const option = container.querySelector("option[value='']") as HTMLElement

  expect(option).toBeInTheDocument()
  expect(option.textContent).toEqual("Select an option")
})

test("renders an icon by default", () => {
  const { getByRole } = render(<Select />)
  const icon = getByRole("presentation", { hidden: true })

  expect(icon).toHaveAttribute("aria-hidden", "true")
  expect(icon).toHaveClass("chakra-select__icon")
})
