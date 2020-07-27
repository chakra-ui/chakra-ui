import { CheckboxGroup, Checkbox, CheckboxGroupProps } from "../src"
import { render, fireEvent, testA11Y } from "@chakra-ui/test-utils"
import React from "react"

describe("<CheckboxGroup />", () => {
  test("renders correctly", () => {
    const tools = render(
      <CheckboxGroup defaultValue={["one", "two"]}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </CheckboxGroup>,
    )
    expect(tools.asFragment()).toMatchSnapshot()
  })

  test("passes a11y test", async () => {
    await testA11Y(
      <CheckboxGroup defaultValue={["one", "two"]}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </CheckboxGroup>,
    )
  })

  test("Uncontrolled - default values should be checked", () => {
    const Component = () => {
      return (
        <CheckboxGroup defaultValue={["one", "two"]}>
          <Checkbox value="one">One</Checkbox>
          <Checkbox value="two">Two</Checkbox>
          <Checkbox value="three">Three</Checkbox>
        </CheckboxGroup>
      )
    }
    const tools = render(<Component />)
    const checkboxOne = tools.container.querySelectorAll("input")[0]
    const checkboxTwo = tools.container.querySelectorAll("input")[1]
    const checkboxThree = tools.container.querySelectorAll("input")[2]

    expect(checkboxOne).toBeChecked()
    expect(checkboxTwo).toBeChecked()
    expect(checkboxThree).not.toBeChecked()

    fireEvent.click(checkboxThree)

    expect(checkboxOne).toBeChecked()
    expect(checkboxTwo).toBeChecked()
    expect(checkboxThree).toBeChecked()
  })

  test("Controlled", () => {
    let checked = ["one", "two"]
    const onChange = jest.fn((value) => (checked = value))

    const Component = (props: Omit<CheckboxGroupProps, "children">) => {
      return (
        <CheckboxGroup {...props}>
          <Checkbox value="one">One</Checkbox>
          <Checkbox value="two">Two</Checkbox>
          <Checkbox value="three">Three</Checkbox>
        </CheckboxGroup>
      )
    }
    const tools = render(<Component value={checked} onChange={onChange} />)
    const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
      tools.container.querySelectorAll("input"),
    )

    expect(checkboxOne).toBeChecked()
    expect(checkboxTwo).toBeChecked()
    expect(checkboxThree).not.toBeChecked()

    fireEvent.click(checkboxThree)

    // change props
    tools.rerender(<Component value={checked} onChange={onChange} />)

    expect(onChange).toHaveBeenCalled()
    expect(checked).toEqual(["one", "two", "three"])
  })
})
