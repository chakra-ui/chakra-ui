import { fireEvent, render, screen, waitFor } from "@chakra-ui/test-utils"
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
const options = {
  isValidCharacter: (v: string) => CUSTOM_FLOATING_POINT_REGEX.test(v),
  parse: (value: string) => value?.replace(",", "."),
  format: (value: string | number) => {
    if (!value) return value.toString()
    return value.toString().replace(".", ",")
  },
}

test("should apply custom format", async () => {
  const { user } = renderComponent({
    defaultValue: 0,
    step: 0.65,
    precision: 2,
    ...options,
  })

  const input = screen.getByTestId("input")
  const incBtn = screen.getByTestId("up-btn")

  expect(input).toHaveValue("0,00")

  await user.click(incBtn)
  expect(input).toHaveValue("0,65")

  await user.click(incBtn)
  expect(input).toHaveValue("1,30")

  await user.click(incBtn)
  expect(input).toHaveValue("1,95")

  const decBtn = screen.getByTestId("down-btn")

  await user.click(decBtn)
  expect(input).toHaveValue("1,30")

  // on blur, value is clamped using precision
  await user.type(input, "1234")
  await waitFor(() => {
    expect(input).toHaveValue("1,301234")
  })

  fireEvent.blur(input)
  expect(input).toHaveValue("1,30")
})
