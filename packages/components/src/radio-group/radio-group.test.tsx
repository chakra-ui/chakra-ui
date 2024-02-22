import { fireEvent, render, waitFor } from "@chakra-ui/test-utils"
import { RadioGroup, UseRadioGroupProps, useRadioGroup } from "."
import { Field } from "../field"

const RadioDemo = (props: RadioGroup.ItemProps) => {
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
        <RadioDemo {...getItemProps({ value: "a" })}>a</RadioDemo>
        <RadioDemo {...getItemProps({ value: "b" })}>b</RadioDemo>
      </div>
    )
  }
  const utils = render(<Component defaultValue="a" />)

  expect(utils.getByLabelText("a")).toBeChecked()
})

test("uncontrolled: correctly manages state", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getItemProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <RadioDemo {...getItemProps({ value: "a" })}>a</RadioDemo>
        <RadioDemo {...getItemProps({ value: "b" })}>b</RadioDemo>
      </div>
    )
  }

  const utils = render(<Component defaultValue="a" />)

  // checks default value by default
  expect(utils.getByLabelText("a")).toBeChecked()

  // changes checked on click
  fireEvent.click(utils.getByLabelText("b"))
  expect(utils.getByLabelText("b")).toBeChecked()
})

test("Uncontrolled RadioGroup - should not check if group disabled", async () => {
  const Component = () => (
    <RadioGroup.Root isDisabled isFocusable={false}>
      <RadioDemo value="one">One</RadioDemo>
      <RadioDemo value="one-focus" isFocusable>
        One Focusable
      </RadioDemo>
      <RadioDemo value="two" isDisabled>
        Two
      </RadioDemo>
      <RadioDemo value="two-focus" isDisabled isFocusable>
        Two Focusable
      </RadioDemo>
      <RadioDemo value="three" isDisabled={false}>
        Three
      </RadioDemo>
    </RadioGroup.Root>
  )
  const { container } = render(<Component />)
  const [radioOne, radioOneFocusable, radioTwo, radioTwoFocusable, radioThree] =
    Array.from(container.querySelectorAll("input"))

  const [
    radioOneSpan,
    radioOneSpanFocusable,
    radioTwoSpan,
    radioTwoSpanFocusable,
    radioThreeSpan,
  ] = Array.from(container.querySelectorAll(".chakra-radio__control"))

  // since `RadioGroup` has `isDisabled={true}` all radio spans should be disabled
  expect(radioOneSpan).toHaveAttribute("data-disabled", "")
  expect(radioOneSpanFocusable).toHaveAttribute("data-disabled", "")
  expect(radioTwoSpan).toHaveAttribute("data-disabled", "")
  expect(radioTwoSpanFocusable).toHaveAttribute("data-disabled", "")
  expect(radioThreeSpan).not.toHaveAttribute("data-disabled") // radioThree isn't disabled at all

  // to be truly disabled on the input field the condition `!isFocusable && isDisabled` has to be truthy
  expect(radioOne).toBeDisabled()
  expect(radioOneFocusable).not.toBeDisabled() // because it is still focusable
  expect(radioTwo).toBeDisabled()
  expect(radioTwoFocusable).not.toBeDisabled() // because it is still focusable
  expect(radioThree).not.toBeDisabled()

  fireEvent.click(radioOne)
  await waitFor(() => expect(radioOne).not.toBeChecked())
  fireEvent.click(radioOneFocusable)
  await waitFor(() => expect(radioOneFocusable).not.toBeChecked())
  fireEvent.click(radioTwo)
  await waitFor(() => expect(radioTwo).not.toBeChecked())
  fireEvent.click(radioTwoFocusable)
  await waitFor(() => expect(radioTwoFocusable).not.toBeChecked())
  fireEvent.click(radioThree)
  expect(radioThree).toBeChecked()
})

test("controlled: correctly manages state", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getItemProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <RadioDemo {...getItemProps({ value: "a" })}>a</RadioDemo>
        <RadioDemo {...getItemProps({ value: "b" })}>b</RadioDemo>
      </div>
    )
  }
  const onChange = vi.fn()
  const utils = render(<Component onChange={onChange} value="a" />)

  // has value prop checked
  expect(utils.getByLabelText("a")).toBeChecked()

  // calls the onChange callback with newly-selected value
  fireEvent.click(utils.getByLabelText("b"))
  expect(onChange).toHaveBeenCalledWith("b")
})

test("setValue action allows setting specific value", () => {
  const Component = () => {
    const { getRootProps, getItemProps, setValue } = useRadioGroup()

    return (
      <>
        <button onClick={() => setValue("a")}>Set</button>
        <div {...getRootProps()}>
          <RadioDemo {...getItemProps({ value: "a" })}>a</RadioDemo>
          <RadioDemo {...getItemProps({ value: "b" })}>b</RadioDemo>
        </div>
      </>
    )
  }
  const utils = render(<Component />)

  fireEvent.click(utils.getByText(/set/i))
  expect(utils.getByLabelText("a")).toBeChecked()
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
    const utils = render(<Component value="c" />)
    fireEvent.click(utils.getByText(/focus/i))
    expect(document.activeElement).toEqual(utils.getByLabelText("c"))
  })

  test("focuses first enabled input if none checked", () => {
    const utils = render(<Component />)
    fireEvent.click(utils.getByText(/focus/i))
    expect(document.activeElement).toEqual(utils.getByLabelText("b"))
  })

  test("focuses first enabled input if checked input is disabled", () => {
    const utils = render(<Component value="a" />)
    fireEvent.click(utils.getByText(/focus/i))
    expect(document.activeElement).toEqual(utils.getByLabelText("b"))
  })
})

test("has the proper role", () => {
  const Component = () => {
    const { getRootProps } = useRadioGroup()
    return <div {...getRootProps()} />
  }
  const utils = render(<Component />)

  utils.getByRole("radiogroup")
})

test("should use unique id when wrapped in FormControl", () => {
  const Component = () => {
    const { getRootProps, getItemProps, setValue } = useRadioGroup()

    return (
      <Field.Root>
        <button onClick={() => setValue("a")}>Set</button>
        <div {...getRootProps()}>
          <RadioDemo {...getItemProps({ value: "a" })}>a</RadioDemo>
          <RadioDemo {...getItemProps({ value: "b" })}>b</RadioDemo>
        </div>
      </Field.Root>
    )
  }

  const { getAllByRole } = render(<Component />)
  const [input1, input2] = getAllByRole("radio")

  expect(input1.id === input2.id).toBeFalsy()
})
