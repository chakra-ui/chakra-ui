/* eslint-disable jsx-a11y/label-has-associated-control */
import { fireEvent, render, userEvent } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "../src"

function renderComponent(props: NumberInputProps = {}) {
  return render(
    <>
      <label htmlFor="input">Select number:</label>
      <NumberInput id="input" data-testid="root" {...props}>
        <NumberInputField data-testid="input" />
        <NumberInputStepper data-testid="group">
          <NumberIncrementStepper children="+" data-testid="up-btn" />
          <NumberDecrementStepper children="-" data-testid="down-btn" />
        </NumberInputStepper>
      </NumberInput>
    </>,
  )
}

const CUSTOM_FLOATING_POINT_REGEX = /^[Ee0-9+\-.,]$/
const testNumberInputCustomFormat = {
  isValidCharacter: (v: string) => CUSTOM_FLOATING_POINT_REGEX.test(v),
  parseValue: (value: string) => value?.replace(",", "."),
  formatValue: (value: string | number) => {
    if (!value) return value.toString()
    return value.toString().replace(".", ",")
  },
}

it("should apply custom format", () => {
  const { getByTestId } = renderComponent({
    defaultValue: 0,
    step: 0.65,
    precision: 2,
    ...testNumberInputCustomFormat,
  })

  const input = getByTestId("input")
  const incBtn = getByTestId("up-btn")
  const decBtn = getByTestId("down-btn")

  expect(input).toHaveValue("0,00")
  userEvent.click(incBtn)
  expect(input).toHaveValue("0,65")
  userEvent.click(incBtn)
  expect(input).toHaveValue("1,30")
  userEvent.click(incBtn)
  expect(input).toHaveValue("1,95")
  userEvent.click(decBtn)
  expect(input).toHaveValue("1,30")

  // on blur, value is clamped using precision
  userEvent.type(input, "1234")
  expect(input).toHaveValue("1,301234")
  fireEvent.blur(input)
  expect(input).toHaveValue("1,30")
})
