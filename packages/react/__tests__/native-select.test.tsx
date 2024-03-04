import { render, testA11y } from "@chakra-ui/test-utils"
import { Field } from "../src/components/field"
import { NativeSelect } from "../src/components/native-select"

const DemoSelect = (props: NativeSelect.RootProps) => {
  const { placeholder = "Select an option", ...restProps } = props
  return (
    <NativeSelect.Root {...restProps}>
      <NativeSelect.Field
        aria-label="select"
        color="pink.500"
        placeholder={placeholder}
      >
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </NativeSelect.Field>
      <NativeSelect.Icon />
    </NativeSelect.Root>
  )
}

test("should pass a11y check", async () => {
  const { container } = render(<DemoSelect />)
  await testA11y(container)
})

test("renders a placeholder option", () => {
  const { container } = render(<DemoSelect />)

  const option = container.querySelector("option[value='']")
  expect(option).toBeInTheDocument()

  expect(option?.textContent).toEqual("Select an option")
})

test("renders an icon by default", () => {
  const { getByRole } = render(<DemoSelect />)

  const icon = getByRole("presentation", { hidden: true })
  expect(icon).toHaveAttribute("aria-hidden", "true")

  expect(icon).toHaveClass("chakra-select__icon")
})

test("renders in disabled state if isDisabled is true", () => {
  const { container } = render(<DemoSelect isDisabled />)

  const select = container.querySelector("select")
  const iconWrapper = container.querySelector(".chakra-select__icon-wrapper")

  expect(select).toBeDisabled()
  expect(iconWrapper).toHaveAttribute("data-disabled", "")
})

test("doesn't render in disabled state if isDisabled is false", () => {
  const { container } = render(<DemoSelect isDisabled={false} />)

  const select = container.querySelector("select")
  const iconWrapper = container.querySelector(".chakra-select__icon-wrapper")

  expect(select).not.toBeDisabled()
  expect(iconWrapper).not.toHaveAttribute("data-disabled")
})

test("renders in disabled state if wrapped by FormControl with isDisabled=true", () => {
  const { container } = render(
    <Field.Root isDisabled>
      <DemoSelect />,
    </Field.Root>,
  )

  const select = container.querySelector("select")
  const iconWrapper = container.querySelector(".chakra-select__icon-wrapper")

  expect(select).toBeDisabled()
  expect(iconWrapper).toHaveAttribute("data-disabled", "")
})
