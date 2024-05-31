import { fireEvent, screen } from "@testing-library/react"
import { Field, RadioGroup } from "../src"
import { render } from "./core"

const DemoRadio = (props: RadioGroup.ItemProps) => {
  const { children, ...rest } = props
  return (
    <RadioGroup.Item {...rest}>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText>{children}</RadioGroup.ItemText>
    </RadioGroup.Item>
  )
}

describe("RadioGroup", () => {
  test("works with Radio component", () => {
    render(
      <RadioGroup.Root defaultValue="a">
        <DemoRadio value="a">a</DemoRadio>
        <DemoRadio value="b">b</DemoRadio>
      </RadioGroup.Root>,
    )

    expect(screen.getByLabelText("a")).toBeChecked()
  })

  test("uncontrolled: correctly manages state", () => {
    render(
      <RadioGroup.Root defaultValue="a">
        <DemoRadio value="a">a</DemoRadio>
        <DemoRadio value="b">b</DemoRadio>
      </RadioGroup.Root>,
    )

    expect(screen.getByLabelText("a")).toBeChecked()

    fireEvent.click(screen.getByLabelText("b"))
    expect(screen.getByLabelText("b")).toBeChecked()
  })

  test("Uncontrolled RadioGroup - should not check if group disabled", async () => {
    render(
      <RadioGroup.Root disabled>
        <DemoRadio value="one">One</DemoRadio>
      </RadioGroup.Root>,
    )

    const inputEl = screen.getByRole("radio")
    expect(inputEl).toBeDisabled()
  })

  test("should use unique id when wrapped in Field", () => {
    const { getAllByRole } = render(
      <Field>
        <RadioGroup.Root defaultValue="a">
          <DemoRadio value="a">a</DemoRadio>
          <DemoRadio value="b">b</DemoRadio>
        </RadioGroup.Root>
      </Field>,
    )

    const [input1, input2] = getAllByRole("radio")
    expect(input1.id === input2.id).toBeFalsy()
  })
})
