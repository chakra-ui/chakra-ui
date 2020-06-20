import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
} from "../src"

test("Input renders correctly", () => {
  const { asFragment } = render(<Input />)
  expect(asFragment()).toMatchSnapshot()
})

test("Input addons render correctly", () => {
  const { asFragment } = render(
    <InputGroup>
      <InputLeftAddon>https://</InputLeftAddon>
      <Input />
      <InputRightAddon>.com</InputRightAddon>
    </InputGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Elements inside input render correctly", () => {
  const { asFragment } = render(
    <InputGroup>
      <InputLeftElement>
        <span>Hello</span>
      </InputLeftElement>
      <Input />
      <InputRightElement>
        <span>World</span>
      </InputRightElement>
    </InputGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Invalid input renders correctly", () => {
  const { getByTestId } = render(<Input isInvalid data-testid="input" />)
  const input = getByTestId("input")

  expect(input).toHaveAttribute("aria-invalid", "true")
})

test("Disabled input renders correctly", () => {
  const { getByTestId } = render(<Input isDisabled data-testid="input" />)
  const input = getByTestId("input")

  expect(input).toHaveAttribute("disabled")
})

test("Readonly input renders correctly", () => {
  const { getByTestId } = render(<Input isReadOnly data-testid="input" />)
  const input = getByTestId("input")

  expect(input).toHaveAttribute("aria-readonly", "true")
})
