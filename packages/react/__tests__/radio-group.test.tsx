import { fireEvent, render, screen } from "@chakra-ui/test-utils"
import { Field } from "../src/components/field"
import {
  RadioGroup,
  UseRadioGroupProps,
  useRadioGroup,
} from "../src/components/radio-group"

const DemoRadio = (props: RadioGroup.ItemProps) => {
  const { children, ...rest } = props
  return (
    <RadioGroup.Item {...rest}>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText>{children}</RadioGroup.ItemText>
    </RadioGroup.Item>
  )
}

test("works with Radio component", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getItemProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <DemoRadio {...getItemProps({ value: "a" })}>a</DemoRadio>
        <DemoRadio {...getItemProps({ value: "b" })}>b</DemoRadio>
      </div>
    )
  }

  const { getByLabelText } = render(<Component defaultValue="a" />)
  expect(getByLabelText("a")).toBeChecked()
})

test("uncontrolled: correctly manages state", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getItemProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <DemoRadio {...getItemProps({ value: "a" })}>a</DemoRadio>
        <DemoRadio {...getItemProps({ value: "b" })}>b</DemoRadio>
      </div>
    )
  }

  const { getByLabelText } = render(<Component defaultValue="a" />)

  expect(getByLabelText("a")).toBeChecked()

  fireEvent.click(getByLabelText("b"))
  expect(getByLabelText("b")).toBeChecked()
})

test("Uncontrolled RadioGroup - should not check if group disabled", async () => {
  render(
    <RadioGroup.Root isDisabled>
      <DemoRadio value="one">One</DemoRadio>
    </RadioGroup.Root>,
  )

  const inputEl = screen.getByRole("radio")
  expect(inputEl).toBeDisabled()
})

test("controlled: correctly manages state", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getItemProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <DemoRadio {...getItemProps({ value: "a" })}>a</DemoRadio>
        <DemoRadio {...getItemProps({ value: "b" })}>b</DemoRadio>
      </div>
    )
  }
  const onChange = vi.fn()
  const { getByLabelText } = render(<Component onChange={onChange} value="a" />)

  expect(getByLabelText("a")).toBeChecked()

  fireEvent.click(getByLabelText("b"))
  expect(onChange).toHaveBeenCalledWith("b")
})

test("setValue action allows setting specific value", () => {
  const Component = () => {
    const { getRootProps, getItemProps, setValue } = useRadioGroup()

    return (
      <>
        <button onClick={() => setValue("a")}>Set</button>
        <div {...getRootProps()}>
          <DemoRadio {...getItemProps({ value: "a" })}>a</DemoRadio>
          <DemoRadio {...getItemProps({ value: "b" })}>b</DemoRadio>
        </div>
      </>
    )
  }
  const { getByText, getByLabelText } = render(<Component />)

  fireEvent.click(getByText(/set/i))
  expect(getByLabelText("a")).toBeChecked()
})

describe("focus action", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getItemProps, focus } = useRadioGroup({
      isNative: true,
      ...props,
    })

    return (
      <>
        <button onClick={focus}>Focus</button>
        <div {...getRootProps()}>
          <label>
            <input
              type="radio"
              {...getItemProps({ value: "a", disabled: true })}
            />
            <span>a</span>
          </label>
          <label>
            <input type="radio" {...getItemProps({ value: "b" })} />
            <span>b</span>
          </label>
          <label>
            <input type="radio" {...getItemProps({ value: "c" })} />
            <span>c</span>
          </label>
        </div>
      </>
    )
  }

  test("focuses first checked input", () => {
    const { getByText, getByLabelText } = render(<Component value="c" />)
    fireEvent.click(getByText(/focus/i))
    expect(document.activeElement).toEqual(getByLabelText("c"))
  })

  test("focuses first enabled input if none checked", () => {
    const { getByText, getByLabelText } = render(<Component />)
    fireEvent.click(getByText(/focus/i))
    expect(document.activeElement).toEqual(getByLabelText("b"))
  })

  test("focuses first enabled input if checked input is disabled", () => {
    const { getByText, getByLabelText } = render(<Component value="a" />)
    fireEvent.click(getByText(/focus/i))
    expect(document.activeElement).toEqual(getByLabelText("b"))
  })
})

test("should use unique id when wrapped in FormControl", () => {
  const Component = () => {
    const { getRootProps, getItemProps, setValue } = useRadioGroup()

    return (
      <Field.Root>
        <button onClick={() => setValue("a")}>Set</button>
        <div {...getRootProps()}>
          <DemoRadio {...getItemProps({ value: "a" })}>a</DemoRadio>
          <DemoRadio {...getItemProps({ value: "b" })}>b</DemoRadio>
        </div>
      </Field.Root>
    )
  }

  const { getAllByRole } = render(<Component />)
  const [input1, input2] = getAllByRole("radio")

  expect(input1.id === input2.id).toBeFalsy()
})
