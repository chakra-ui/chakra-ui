import { renderHook, act } from "@testing-library/react-hooks"
import { useDay } from "../src/hooks/useDatepicker"

const date = new Date(2019, 2, 1, 0, 0, 0)
const dayRef = {
  current: {
    focus: jest.fn(),
  },
}

test("should execute onClick callback", () => {
  const onDateSelect = jest.fn()
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect,
      focusedDate: null,
      isDateSelected: jest.fn(),
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  act(() => {
    result.current.onClick()
  })

  expect(onDateSelect).toBeCalled()
})

test("should not execute onClick callback, because day is disabled", () => {
  const onDateSelect = jest.fn()
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect,
      focusedDate: null,
      isDateSelected: jest.fn(),
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: () => true,
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  act(() => {
    result.current.onClick()
  })

  expect(result.current.disabledDate).toBe(true)
  expect(onDateSelect).not.toBeCalled()
})

test("should not allow date to be selected when supplied as unavailable", () => {
  const onDateSelect = jest.fn()
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect,
      focusedDate: null,
      isDateSelected: jest.fn(),
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: () => true,
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [new Date()],
    }),
  )

  act(() => {
    result.current.onClick()
  })

  expect(result.current.disabledDate).toBe(true)
  expect(onDateSelect).not.toBeCalled()
})

test("should be active", () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect: jest.fn(),
      focusedDate: null,
      isDateSelected: () => true,
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  expect(result.current.isSelected).toBe(true)
})

test("should be active first or last day", () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect: jest.fn(),
      focusedDate: null,
      isDateSelected: jest.fn(),
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: () => true,
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  expect(result.current.isSelectedStartOrEnd).toBe(true)
})

test("should be within range", () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect: jest.fn(),
      focusedDate: null,
      isDateSelected: jest.fn(),
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: () => true,
      isDateBlocked: jest.fn(),
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  expect(result.current.isWithinHoverRange).toBe(true)
})

test("tabIndex should be 0", () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect: jest.fn(),
      focusedDate: null,
      isDateSelected: jest.fn(),
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  expect(result.current.tabIndex).toBe(0)
})

test("should be unfocused", () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect: jest.fn(),
      focusedDate: date,
      isDateSelected: jest.fn(),
      isDateFocused: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  expect(result.current.tabIndex).toBe(-1)
})

test("should be focused", () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      // @ts-ignore
      dayRef,
      onDateSelect: jest.fn(),
      focusedDate: date,
      isDateSelected: jest.fn(),
      isDateFocused: () => true,
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateFocus: jest.fn(),
      onDateHover: jest.fn(),
      unavailableDates: [],
    }),
  )

  expect(result.current.tabIndex).toBe(0)
})
