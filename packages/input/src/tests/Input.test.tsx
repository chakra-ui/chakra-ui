import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
} from ".."

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
