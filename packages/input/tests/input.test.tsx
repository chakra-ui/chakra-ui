import * as React from "react"
import { render, testA11y, screen } from "@chakra-ui/test-utils"
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
} from "../src"

describe("<Input />", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Input />)
    expect(asFragment()).toMatchSnapshot()
  })

  test("passes a11y test", async () => {
    await testA11y(<Input />, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    })
  })

  test("addons render correctly", () => {
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
})
