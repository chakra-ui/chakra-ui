import { render, testA11y } from "@chakra-ui/test-utils"
import { Field } from "../field"
import { NativeSelect as Select } from "."

const SelectDemo = (props: Select.RootProps) => {
  const { placeholder = "Select an option", ...restProps } = props
  return (
    <Select.Root {...restProps}>
      <Select.Field color="pink.500" placeholder={placeholder}>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </Select.Field>
      <Select.Icon />
    </Select.Root>
  )
}

test("should pass a11y check", async () => {
  const { container } = render(<SelectDemo />)
  await testA11y(container)
})

test("renders a placeholder option", () => {
  const { container } = render(<SelectDemo />)

  const option = container.querySelector("option[value='']")
  expect(option).toBeInTheDocument()

  expect(option?.textContent).toEqual("Select an option")
})

test("renders an icon by default", () => {
  const { getByRole } = render(<SelectDemo />)

  const icon = getByRole("presentation", { hidden: true })
  expect(icon).toHaveAttribute("aria-hidden", "true")

  expect(icon).toHaveClass("chakra-select__icon")
})

test("renders in disabled state if isDisabled is true", () => {
  const { container } = render(<SelectDemo isDisabled />)

  const select = container.querySelector("select")
  const iconWrapper = container.querySelector(".chakra-select__icon-wrapper")

  expect(select).toBeDisabled()
  expect(iconWrapper).toHaveAttribute("data-disabled", "")
})

test("doesn't render in disabled state if isDisabled is false", () => {
  const { container } = render(<SelectDemo isDisabled={false} />)

  const select = container.querySelector("select")
  const iconWrapper = container.querySelector(".chakra-select__icon-wrapper")

  expect(select).not.toBeDisabled()
  expect(iconWrapper).not.toHaveAttribute("data-disabled")
})

test("renders in disabled state if wrapped by FormControl with isDisabled=true", () => {
  const { container } = render(
    <Field.Root isDisabled>
      <SelectDemo />,
    </Field.Root>,
  )

  const select = container.querySelector("select")
  const iconWrapper = container.querySelector(".chakra-select__icon-wrapper")

  expect(select).toBeDisabled()
  expect(iconWrapper).toHaveAttribute("data-disabled", "")
})
