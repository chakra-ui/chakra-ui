import { act, render, screen, userEvent } from "@chakra-ui/test-utils"
import * as React from "react"
import { Radio, RadioGroup } from "../src"

const runTest = async () => {
  const one = await screen.findByLabelText("One")
  const two = await screen.findByLabelText("Two")
  const three = await screen.findByLabelText("Three")

  expect(one).toBeChecked()
  expect(two).not.toBeChecked()
  expect(three).not.toBeChecked()

  await act(() => userEvent.click(two))

  expect(one).not.toBeChecked()
  expect(two).toBeChecked()
  expect(three).not.toBeChecked()
}

describe("RadioGroup", () => {
  test("uncontrolled", async () => {
    const onChange = jest.fn()
    render(
      <RadioGroup name="radio" defaultValue="1" onChange={onChange}>
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
        <Radio value="3">Three</Radio>
      </RadioGroup>,
    )
    await runTest()
    expect(onChange).toHaveBeenCalledWith("2")
  })

  test("controlled", async () => {
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
    await runTest()
  })
})

describe("Radio", () => {
  test("uncontrolled", async () => {
    render(
      <Radio name="radio" value="1" defaultChecked>
        One
      </Radio>,
    )
    const one = await screen.findByLabelText("One")
    expect(one).toBeChecked()
  })

  test("controlled", async () => {
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
    await runTest()
  })
})
