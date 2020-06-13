import { fireEvent, render } from "@chakra-ui/test-utils"
import * as React from "react"
import { Radio, useRadioGroup, UseRadioGroupProps } from "../src"

test("RadioGroup renders correctly", () => {
  const Component = () => {
    const { getRootProps, getRadioProps } = useRadioGroup({ isNative: true })

    return (
      <div {...getRootProps()}>
        <label>
          <input type="radio" {...getRadioProps({ value: "a" })} />
          <span>a</span>
        </label>
        <label>
          <input type="radio" {...getRadioProps({ value: "b" })} />
          <span>b</span>
        </label>
      </div>
    )
  }
  const { asFragment } = render(<Component />)
  expect(asFragment()).toMatchSnapshot()
})

test("works with Radio component", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getRadioProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <Radio {...getRadioProps({ value: "a" })}>a</Radio>
        <Radio {...getRadioProps({ value: "b" })}>b</Radio>
      </div>
    )
  }
  const utils = render(<Component defaultValue="a" />)

  expect(utils.getByLabelText("a")).toBeChecked()
})

test("uncontrolled: correctly manages state", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getRadioProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <Radio {...getRadioProps({ value: "a" })}>a</Radio>
        <Radio {...getRadioProps({ value: "b" })}>b</Radio>
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

test("controlled: correctly manages state", () => {
  const Component = (props: UseRadioGroupProps = {}) => {
    const { getRootProps, getRadioProps } = useRadioGroup(props)

    return (
      <div {...getRootProps()}>
        <Radio {...getRadioProps({ value: "a" })}>a</Radio>
        <Radio {...getRadioProps({ value: "b" })}>b</Radio>
      </div>
    )
  }
  const onChange = jest.fn()
  const utils = render(<Component onChange={onChange} value="a" />)

  // has value prop checked
  expect(utils.getByLabelText("a")).toBeChecked()

  // calls the onChange callback with newly-selected value
  fireEvent.click(utils.getByLabelText("b"))
  expect(onChange).toHaveBeenCalledWith("b")
})

test("setValue action allows setting specific value", () => {
  const Component = () => {
    const { getRootProps, getRadioProps, setValue } = useRadioGroup()

    return (
      <>
        <button onClick={() => setValue("a")}>Set</button>
        <div {...getRootProps()}>
          <Radio {...getRadioProps({ value: "a" })}>a</Radio>
          <Radio {...getRadioProps({ value: "b" })}>b</Radio>
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
    const { getRootProps, getRadioProps, focus } = useRadioGroup({
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
              {...getRadioProps({ value: "a", disabled: true })}
            />
            <span>a</span>
          </label>
          <label>
            <input type="radio" {...getRadioProps({ value: "b" })} />
            <span>b</span>
          </label>
          <label>
            <input type="radio" {...getRadioProps({ value: "c" })} />
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
