import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Select } from ".."

test("Select renders correctly", () => {
  const { asFragment } = render(
    <Select placeholder="Select an option">
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
    </Select>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("renders a placeholder option", () => {
  const utils = render(<Select placeholder="Select an option" />)
  const option = utils.container.querySelector(
    "option[value='']",
  ) as HTMLElement

  expect(option).toBeInTheDocument()
  expect(option.textContent).toEqual("Select an option")
})

test("renders an icon by default", () => {
  const utils = render(<Select />)
  const icon = utils.getByRole("presentation", { hidden: true })

  expect(icon).toHaveAttribute("aria-hidden", "true")
  expect(icon).toHaveAttribute("data-chakra-custom-icon", "")
})
