import { renderHook } from "@testing-library/react-hooks"
import { format } from "date-fns"
import { useMonth, getDays, getWeekdayLabels } from "../src/hooks/useDatepicker"

describe("getWeekdayLabels", () => {
  test("should return week days start with monday", () => {
    expect(getWeekdayLabels()).toEqual([
      "Mo",
      "Tu",
      "We",
      "Th",
      "Fr",
      "Sa",
      "Su",
    ])
  })
  test("should return week days start with sunday", () => {
    expect(getWeekdayLabels({ firstDayOfWeek: 0 })).toEqual([
      "Su",
      "Mo",
      "Tu",
      "We",
      "Th",
      "Fr",
      "Sa",
    ])
  })
  test("should return week days start with saturday", () => {
    expect(getWeekdayLabels({ firstDayOfWeek: 6 })).toEqual([
      "Sa",
      "Su",
      "Mo",
      "Tu",
      "We",
      "Th",
      "Fr",
    ])
  })
})

describe("getDays", () => {
  test("should return days for april 2019", () => {
    const { result } = renderHook(() => getDays({ year: 2019, month: 3 }))
    expect(result.current.length).toBe(30)
    expect(typeof result.current[0]).toBe("object")
    // @ts-ignore
    expect(result.current[0].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current[result.current.length - 1].dayLabel).toBe("30")
  })

  test("should return days for april 2019 start with sunday", () => {
    const { result } = renderHook(() =>
      getDays({ year: 2019, month: 3, firstDayOfWeek: 0 }),
    )
    expect(result.current.length).toBe(31)
    expect(typeof result.current[0]).toBe("number")
    expect(typeof result.current[1]).toBe("object")
    // @ts-ignore
    expect(result.current[1].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current[result.current.length - 1].dayLabel).toBe("30")
  })

  test("should return days for march 2019", () => {
    const { result } = renderHook(() => getDays({ year: 2019, month: 2 }))
    expect(result.current.length).toBe(35)
    expect(typeof result.current[0]).toBe("number")
    expect(typeof result.current[3]).toBe("number")
    expect(typeof result.current[4]).toBe("object")
    // @ts-ignore
    expect(result.current[4].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current[result.current.length - 1].dayLabel).toBe("31")
  })

  test("should return days for september 2019", () => {
    const { result } = renderHook(() => getDays({ year: 2019, month: 8 }))
    expect(result.current.length).toBe(36)
    expect(typeof result.current[0]).toBe("number")
    expect(typeof result.current[5]).toBe("number")
    expect(typeof result.current[6]).toBe("object")
    // @ts-ignore
    expect(result.current[6].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current[result.current.length - 1].dayLabel).toBe("30")
  })

  test("should return days for march 2019 start with sunday", () => {
    const { result } = renderHook(() =>
      getDays({ year: 2019, month: 2, firstDayOfWeek: 0 }),
    )
    expect(result.current.length).toBe(36)
    expect(typeof result.current[0]).toBe("number")
    expect(typeof result.current[4]).toBe("number")
    expect(typeof result.current[5]).toBe("object")
    // @ts-ignore
    expect(result.current[5].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current[result.current.length - 1].dayLabel).toBe("31")
  })

  test("should return days for march 2019 start with saturday", () => {
    const { result } = renderHook(() =>
      getDays({ year: 2019, month: 2, firstDayOfWeek: 6 }),
    )
    expect(result.current.length).toBe(37)
    expect(typeof result.current[0]).toBe("number")
    expect(typeof result.current[5]).toBe("number")
    expect(typeof result.current[6]).toBe("object")
    // @ts-ignore
    expect(result.current[6].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current[result.current.length - 1].dayLabel).toBe("31")
  })
})

describe("useMonth", () => {
  test("should return days for april 2019", () => {
    const { result } = renderHook(() => useMonth({ year: 2019, month: 3 }))

    // Days
    expect(result.current.days.length).toBe(30)
    expect(typeof result.current.days[0]).toBe("object")
    // @ts-ignore
    expect(result.current.days[0].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "30",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Mo")
    expect(result.current.weekdayLabels[6]).toBe("Su")

    // Month Label
    expect(result.current.monthLabel).toBe("April 2019")
  })

  test("should return days for april 2019 start with sunday", () => {
    const { result } = renderHook(() =>
      useMonth({ year: 2019, month: 3, firstDayOfWeek: 0 }),
    )

    // Days
    expect(result.current.days.length).toBe(31)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[1]).toBe("object")
    // @ts-ignore
    expect(result.current.days[1].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "30",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Su")
    expect(result.current.weekdayLabels[6]).toBe("Sa")
  })

  test("should return days for march 2019", () => {
    const { result } = renderHook(() => useMonth({ year: 2019, month: 2 }))

    // Days
    expect(result.current.days.length).toBe(35)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[3]).toBe("number")
    expect(typeof result.current.days[4]).toBe("object")
    // @ts-ignore
    expect(result.current.days[4].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "31",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Mo")
    expect(result.current.weekdayLabels[6]).toBe("Su")

    // Month Label
    expect(result.current.monthLabel).toBe("March 2019")
  })

  test("should return days for march 2019 start with sunday", () => {
    const { result } = renderHook(() =>
      useMonth({ year: 2019, month: 2, firstDayOfWeek: 0 }),
    )

    // Days
    expect(result.current.days.length).toBe(36)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[4]).toBe("number")
    expect(typeof result.current.days[5]).toBe("object")
    // @ts-ignore
    expect(result.current.days[5].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "31",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Su")
    expect(result.current.weekdayLabels[6]).toBe("Sa")
  })

  test("should return days for march 2019 start with saturday", () => {
    const { result } = renderHook(() =>
      useMonth({ year: 2019, month: 2, firstDayOfWeek: 6 }),
    )

    // Days
    expect(result.current.days.length).toBe(37)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[5]).toBe("number")
    expect(typeof result.current.days[6]).toBe("object")
    // @ts-ignore
    expect(result.current.days[6].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "31",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Sa")
    expect(result.current.weekdayLabels[6]).toBe("Fr")
  })

  test("should return days for september 2019", () => {
    const { result } = renderHook(() => useMonth({ year: 2019, month: 8 }))

    // Days
    expect(result.current.days.length).toBe(36)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[1]).toBe("number")
    expect(typeof result.current.days[2]).toBe("number")
    expect(typeof result.current.days[3]).toBe("number")
    expect(typeof result.current.days[4]).toBe("number")
    expect(typeof result.current.days[5]).toBe("number")
    // @ts-ignore
    expect(result.current.days[6].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "30",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Mo")
    expect(result.current.weekdayLabels[6]).toBe("Su")

    // Month Label
    expect(result.current.monthLabel).toBe("September 2019")
  })

  test("should return days for september 2019 start with wednesday", () => {
    const { result } = renderHook(() =>
      useMonth({ year: 2019, month: 8, firstDayOfWeek: 3 }),
    )

    // Days
    expect(result.current.days.length).toBe(34)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[1]).toBe("number")
    expect(typeof result.current.days[2]).toBe("number")
    expect(typeof result.current.days[3]).toBe("number")
    // @ts-ignore
    expect(result.current.days[4].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "30",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("We")
    expect(result.current.weekdayLabels[6]).toBe("Tu")

    // Month Label
    expect(result.current.monthLabel).toBe("September 2019")
  })

  test("should return days for october 2019 start with friday", () => {
    const { result } = renderHook(() =>
      useMonth({ year: 2019, month: 9, firstDayOfWeek: 5 }),
    )
    // Days
    expect(result.current.days.length).toBe(35)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[1]).toBe("number")
    expect(typeof result.current.days[2]).toBe("number")
    expect(typeof result.current.days[3]).toBe("number")
    // @ts-ignore
    expect(result.current.days[4].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "31",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Fr")
    expect(result.current.weekdayLabels[6]).toBe("Th")

    // Month Label
    expect(result.current.monthLabel).toBe("October 2019")
  })

  test("should return right formats", () => {
    const { result } = renderHook(() =>
      useMonth({
        year: 2019,
        month: 2,
        firstDayOfWeek: 6,
        dayLabelFormat: (date: Date) => format(date, "dd"),
        weekdayLabelFormat: (date: Date) => format(date, "iiiiii"),
        monthLabelFormat: (date: Date) => format(date, "MMMM yyyy"),
      }),
    )

    // Days
    expect(result.current.days.length).toBe(37)
    expect(typeof result.current.days[0]).toBe("number")
    expect(typeof result.current.days[5]).toBe("number")
    expect(typeof result.current.days[6]).toBe("object")
    // @ts-ignore
    expect(result.current.days[6].dayLabel).toBe("01")
    // @ts-ignore
    expect(result.current.days[result.current.days.length - 1].dayLabel).toBe(
      "31",
    )

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7)
    expect(result.current.weekdayLabels[0]).toBe("Sa")
    expect(result.current.weekdayLabels[6]).toBe("Fr")
  })
})
