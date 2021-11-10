import { render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { Input, InputGroup, InputLeftElement, InputRightElement } from "../src"

test("passes a11y test", async () => {
  await testA11y(<Input />, {
    axeOptions: {
      rules: {
        label: { enabled: false },
      },
    },
  })
})

test("Elements inside input render correctly", () => {
  const { getByText } = render(
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
  expect(getByText("Hello")).toBeInTheDocument()
  expect(getByText("World")).toBeInTheDocument()
})

test("Invalid input renders correctly", () => {
  render(<Input isInvalid />)

  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
})

test("Disabled input renders correctly", () => {
  render(<Input isDisabled />)

  expect(screen.getByRole("textbox")).toHaveAttribute("disabled")
})

test("Readonly input renders correctly", () => {
  render(<Input isReadOnly />)

  expect(screen.getByRole("textbox")).toHaveAttribute("aria-readonly", "true")
})
