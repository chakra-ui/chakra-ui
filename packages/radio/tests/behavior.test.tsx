import { fireEvent, render, screen } from "@chakra-ui/test-utils"
import * as React from "react"
import { RadioGroup, Radio } from "../src"

const runTest = () => {
  const one = screen.getByLabelText("One")
  const two = screen.getByLabelText("Two")
  const three = screen.getByLabelText("Three")

  expect(one).toBeChecked()
  expect(two).not.toBeChecked()
  expect(three).not.toBeChecked()

  fireEvent.click(two)

  expect(one).not.toBeChecked()
  expect(two).toBeChecked()
  expect(three).not.toBeChecked()
}

describe("RadioGroup", () => {
  test("uncontrolled", () => {
    const onChange = jest.fn()
    render(
      <RadioGroup name="radio" defaultValue="1" onChange={onChange}>
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
        <Radio value="3">Three</Radio>
      </RadioGroup>,
    )
    runTest()
    expect(onChange).toHaveBeenCalledWith("2")
  })

  test("controlled", () => {
    const Component = () => {
      const [value, setValue] = React.useState("1")
      const onChange = (value: string) => setValue(value)

      return (
        <RadioGroup name="radio" value={value} onChange={onChange}>
          <Radio value="1">One</Radio>
          <Radio value="2">Two</Radio>
          <Radio value="3">Three</Radio>
        </RadioGroup>
      )
    }
    render(<Component />)
    runTest()
  })
})

describe("Radio", () => {
  test("uncontrolled", () => {
    render(
      <>
        <Radio name="radio" value="1" defaultIsChecked>
          One
        </Radio>
        <Radio name="radio" value="2">
          Two
        </Radio>
        <Radio name="radio" value="3">
          Three
        </Radio>
      </>,
    )
    runTest()
  })

  test("controlled", () => {
    const Component = () => {
      const [value, setValue] = React.useState("1")
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)

      return (
        <>
          <Radio
            name="radio"
            value="1"
            isChecked={value === "1"}
            onChange={onChange}
          >
            One
          </Radio>
          <Radio
            name="radio"
            value="2"
            isChecked={value === "2"}
            onChange={onChange}
          >
            Two
          </Radio>
          <Radio
            name="radio"
            value="3"
            isChecked={value === "3"}
            onChange={onChange}
          >
            Three
          </Radio>
        </>
      )
    }
    render(<Component />)
    runTest()
  })
})
