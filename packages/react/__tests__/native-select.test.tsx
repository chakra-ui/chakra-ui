import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { Field, NativeSelect } from "../src"

const DemoSelect = (props: NativeSelect.RootProps) => {
  return (
    <NativeSelect.Root {...props}>
      <NativeSelect.Field
        aria-label="select"
        color="pink.500"
        placeholder="Select an option"
      >
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}

describe("NativeSelect", () => {
  test("should pass a11y check", async () => {
    const { container } = render(<DemoSelect />)
    await testA11y(container)
  })

  test("renders a placeholder option", () => {
    render(<DemoSelect />)
    const option = screen.getByRole("option", { name: "Select an option" })
    expect(option).toBeInTheDocument()
    expect(option).toHaveTextContent("Select an option")
  })

  test("renders in disabled state if disabled is true", () => {
    render(<DemoSelect disabled />)
    const select = screen.getByRole("combobox")
    expect(select).toBeDisabled()
  })

  test("renders in disabled state if wrapped by Field has disabled=true", () => {
    render(
      <Field.Root disabled>
        <DemoSelect />,
      </Field.Root>,
    )
    const select = screen.getByRole("combobox")
    expect(select).toBeDisabled()
  })
})
