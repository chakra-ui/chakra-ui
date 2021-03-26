import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react"
import {
  screen,
  fireEvent,
  render,
  renderHook,
  testA11y,
  userEvent,
} from "@chakra-ui/test-utils"
import { act } from "@testing-library/react-hooks"
import { advanceTo, clear } from "jest-date-mock"
import * as React from "react"
import {
  Datepicker,
  DatepickerButtonsContainer,
  DatepickerCloseButton,
  DatepickerFooter,
  DatepickerHeader,
  DatepickerInputFieldEndDate,
  DatepickerInputFieldStartDate,
  DatepickerInputProps,
  DatepickerInputsRow,
  DatepickerMonth,
  DatepickerNextButton,
  DatepickerPrevButton,
  DatepickerRangeInput,
  DatepickerResetButton,
  DatepickerTodayButton,
  defaultDisplayFormat,
  getInputValue,
  useDatepickerInput,
} from "../src"

function renderComponent(props: DatepickerInputProps = {}) {
  return render(
    <>
      <DatepickerRangeInput {...props}>
        <DatepickerInputsRow>
          <DatepickerInputFieldStartDate
            data-testid="start-input"
            placeholder="Start Date"
          />
          <DatepickerInputFieldEndDate
            data-testid="end-input"
            placeholder="End Date"
          />
        </DatepickerInputsRow>
        <Datepicker data-testid="datepicker">
          <DatepickerHeader>
            <DatepickerButtonsContainer>
              <DatepickerPrevButton data-testid="prev-btn" />
              <DatepickerNextButton data-testid="next-btn" />
            </DatepickerButtonsContainer>
            <DatepickerCloseButton data-testid="close-btn" />
          </DatepickerHeader>
          <DatepickerMonth />
          <DatepickerFooter>
            <DatepickerResetButton data-testid="reset-btn" />
            <DatepickerTodayButton data-testid="today-btn" />
          </DatepickerFooter>
        </Datepicker>
      </DatepickerRangeInput>
    </>,
  )
}

/**
 * Get some inspiration here
 * https://github.com/palantir/blueprint/blob/3aa56473d253f5287e0960759bee367a9ff3e045/packages/core/test/controls/numericInputTests.tsx
 * https://github.com/deberoppa7/react-numeric-input/blob/master/src/index.test.js
 */

test("passes a11y test", async () => {
  const { container } = renderComponent()
  await testA11y(container)
})

test("should start with null values", () => {
  const { result } = renderHook(() => useDatepickerInput({}))
  expect(result.current.startDate).toBe(null)
  expect(result.current.endDate).toBe(null)
})

test("should set default start and end date values", () => {
  advanceTo(new Date(2019, 2, 27, 0, 0, 0))

  const startDate = new Date(2019, 2, 27, 0, 0, 0)
  const endDate = new Date(2019, 2, 27, 0, 0, 0)

  renderComponent({
    startDate,
    endDate,
    displayFormat: defaultDisplayFormat,
  })

  const startInput = screen.getByTestId("start-input")
  const endInput = screen.getByTestId("end-input")

  const startString = getInputValue(startDate, defaultDisplayFormat, "")
  const endString = getInputValue(endDate, defaultDisplayFormat, "")

  expect(startInput).toHaveValue(startString)
  expect(endInput).toHaveValue(endString)

  clear()
})

test("should reset invalid value onBlur", () => {
  const { getByTestId } = renderComponent({})

  const startInput = getByTestId("start-input")

  userEvent.type(startInput, "03/20/")

  act(() => {
    fireEvent.blur(startInput)
  })

  expect(startInput).toHaveValue("")
})

test("should be able to type date into inputs", () => {
  const onDatesChange = jest.fn()
  const onFocusChange = jest.fn()
  const { getByTestId } = renderComponent({
    onDatesChange,
    onFocusChange,
  })

  const startInput = getByTestId("start-input") as HTMLInputElement
  const endInput = getByTestId("end-input") as HTMLInputElement

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayString = getInputValue(today, defaultDisplayFormat, "")

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const tomorrowString = getInputValue(tomorrow, defaultDisplayFormat, "")

  act(() => {
    fireEvent.focus(startInput)
    fireEvent.change(startInput, {
      target: { value: todayString },
    })
  })

  expect(startInput).toHaveValue(todayString)
  expect(onDatesChange).toBeCalledWith({
    startDate: today,
    endDate: null,
    focusedInput: "endDate",
  })

  act(() => {
    fireEvent.focus(endInput)
    fireEvent.change(endInput, {
      target: { value: tomorrowString },
    })
  })

  expect(endInput).toHaveValue(tomorrowString)

  // expect(onDatesChange).toBeCalled()
  expect(onDatesChange).toBeCalledWith({
    startDate: today,
    endDate: tomorrow,
    focusedInput: null,
  })
})

test("should derive values from surrounding FormControl", () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()

  render(
    <>
      <DatepickerRangeInput>
        <DatepickerInputsRow>
          <FormControl
            isRequired
            isInvalid
            isDisabled
            isReadOnly
            onFocus={onFocus}
            onBlur={onBlur}
            id="startDateId"
          >
            <FormLabel>Start Date</FormLabel>
            <DatepickerInputFieldStartDate
              placeholder="Start Date"
              data-testid="start-input"
            />
            <FormHelperText>Select a start date</FormHelperText>
          </FormControl>

          <FormControl
            isRequired
            isInvalid
            isDisabled
            isReadOnly
            onFocus={onFocus}
            onBlur={onBlur}
            id="endDateId"
          >
            <FormLabel>End Date</FormLabel>
            <DatepickerInputFieldEndDate
              placeholder="End Date"
              data-testid="end-input"
            />
            <FormHelperText>Select a end date</FormHelperText>
          </FormControl>
        </DatepickerInputsRow>
        <Datepicker data-testid="datepicker" />
      </DatepickerRangeInput>
    </>,
  )

  const startInput = screen.getByTestId("start-input")

  expect(startInput).toHaveAttribute("id", "startDateId")
  expect(startInput).toHaveAttribute("aria-invalid", "true")
  expect(startInput).toHaveAttribute("aria-required", "true")
  expect(startInput).toHaveAttribute("aria-readonly", "true")
  expect(startInput).toHaveAttribute("aria-invalid", "true")
  expect(startInput).toHaveAttribute("aria-describedby")

  act(() => {
    fireEvent.focus(startInput)
  })

  expect(onFocus).toHaveBeenCalled()

  act(() => {
    fireEvent.blur(startInput)
  })

  expect(onBlur).toHaveBeenCalled()

  const endInput = screen.getByTestId("end-input")

  expect(endInput).toHaveAttribute("id", "endDateId")
  expect(endInput).toHaveAttribute("aria-invalid", "true")
  expect(endInput).toHaveAttribute("aria-required", "true")
  expect(endInput).toHaveAttribute("aria-readonly", "true")
  expect(endInput).toHaveAttribute("aria-invalid", "true")
  expect(endInput).toHaveAttribute("aria-describedby")

  act(() => {
    fireEvent.focus(endInput)
  })

  expect(onFocus).toHaveBeenCalled()

  act(() => {
    fireEvent.blur(endInput)
  })

  expect(onBlur).toHaveBeenCalled()
})
