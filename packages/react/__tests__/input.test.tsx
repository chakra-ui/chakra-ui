import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { Group, Input, InputElement } from "../src"

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
    <Group>
      <InputElement placement="start">
        <span>Hello</span>
      </InputElement>
      <Input />
      <InputElement placement="end">
        <span>World</span>
      </InputElement>
    </Group>,
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

test("Input with native size renders correctly", () => {
  render(<Input htmlSize={4} />)
  expect(screen.getByRole("textbox")).toHaveAttribute("size", "4")
})
