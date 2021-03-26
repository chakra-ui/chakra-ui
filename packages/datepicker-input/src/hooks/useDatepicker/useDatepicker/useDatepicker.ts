import addDays from "date-fns/addDays"
import isAfter from "date-fns/isAfter"
import isBefore from "date-fns/isBefore"
import isSameDay from "date-fns/isSameDay"
import isSameMonth from "date-fns/isSameMonth"
import isWithinRange from "date-fns/isWithinInterval"
import { useCallback, useEffect, useState } from "react"
import {
  canSelectRange,
  getInitialMonths,
  getNextActiveMonth,
  isDateBlocked as isDateBlockedFn,
  isDateHovered as isDateHoveredFn,
  isDateSelected as isDateSelectedFn,
  isEndDate as isEndDateFn,
  isFirstOrLastSelectedDate as isFirstOrLastSelectedDateFn,
  isInUnavailableDates,
  isStartDate as isStartDateFn,
} from "./useDatepicker.utils"

export const START_DATE = "startDate"
export const END_DATE = "endDate"

export type FocusedInput = "startDate" | "endDate" | null

export interface OnDatesChangeProps {
  focusedInput: FocusedInput
  startDate: Date | null
  endDate: Date | null
}

export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface UseDatepickerProps {
  onDatesChange(data: OnDatesChangeProps): void
  minBookingDate?: Date
  maxBookingDate?: Date
  startDate: Date | null
  endDate: Date | null
  focusedInput: FocusedInput
  numberOfMonths?: number
  minBookingDays?: number
  exactMinBookingDays?: boolean
  firstDayOfWeek?: FirstDayOfWeek
  initialVisibleMonth?: Date
  isDateBlocked?(date: Date): boolean
  unavailableDates?: Date[]
  changeActiveMonthOnSelect?: boolean
}

export function useDatepicker({
  startDate,
  endDate,
  focusedInput,
  minBookingDate,
  maxBookingDate,
  onDatesChange,
  initialVisibleMonth,
  exactMinBookingDays = false,
  minBookingDays = 1,
  numberOfMonths = 2,
  firstDayOfWeek = 1,
  isDateBlocked: isDateBlockedProps = () => false,
  unavailableDates = [],
  changeActiveMonthOnSelect = true,
}: UseDatepickerProps) {
  const [activeMonths, setActiveMonths] = useState(() =>
    startDate
      ? getInitialMonths(numberOfMonths, startDate)
      : getInitialMonths(numberOfMonths, initialVisibleMonth || null),
  )
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [focusedDate, setFocusedDate] = useState<Date | null>(startDate)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.addEventListener) {
        window.addEventListener("keydown", handleKeyDown)
      }
    }

    return () => {
      if (window.removeEventListener) {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  })

  const disabledDatesByUser = (date: Date) => {
    return (
      isInUnavailableDates(unavailableDates, date) || isDateBlockedProps(date)
    )
  }

  const onDateFocus = (date: Date) => {
    setFocusedDate(date)

    if (!focusedDate || (focusedDate && !isSameMonth(date, focusedDate))) {
      setActiveMonths(getInitialMonths(numberOfMonths, date))
    }
  }

  const isDateSelected = (date: Date) =>
    isDateSelectedFn(date, startDate, endDate)

  const isFirstOrLastSelectedDate = (date: Date) =>
    isFirstOrLastSelectedDateFn(date, startDate, endDate)

  const isStartDate = (date: Date) => isStartDateFn(date, startDate)

  const isEndDate = (date: Date) => isEndDateFn(date, endDate)

  const isDateBlocked = (date: Date) =>
    isDateBlockedFn({
      date,
      minBookingDate,
      maxBookingDate,
      startDate,
      endDate,
      minBookingDays,
      isDateBlockedFn: disabledDatesByUser,
    })

  const isDateFocused = (date: Date) =>
    focusedDate ? isSameDay(date, focusedDate) : false

  const isDateHovered = (date: Date) =>
    isDateHoveredFn({
      date,
      hoveredDate,
      startDate,
      endDate,
      minBookingDays,
      exactMinBookingDays,
      isDateBlocked: disabledDatesByUser,
    })

  function handleKeyDown(e: KeyboardEvent) {
    if (
      (e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp") &&
      !focusedDate
    ) {
      const activeMonth = activeMonths[0]
      onDateFocus(activeMonth.date)
      setActiveMonths(getInitialMonths(numberOfMonths, activeMonth.date))
    }
  }

  function onResetDates() {
    onDatesChange({
      startDate: null,
      endDate: null,
      focusedInput: START_DATE,
    })
  }

  function onDateSelect(date: Date) {
    if (
      (focusedInput === END_DATE || focusedInput === START_DATE) &&
      minBookingDays > 0 &&
      exactMinBookingDays &&
      canSelectRange({
        minBookingDays,
        exactMinBookingDays,
        minBookingDate,
        maxBookingDate,
        isDateBlocked: disabledDatesByUser,
        startDate: date,
        endDate: null,
      })
    ) {
      onDatesChange({
        startDate: date,
        endDate: addDays(date, minBookingDays - 1),
        focusedInput: null,
      })
    } else if (
      ((focusedInput === END_DATE && startDate && isBefore(date, startDate)) ||
        (focusedInput === START_DATE && endDate && isAfter(date, endDate))) &&
      !exactMinBookingDays &&
      canSelectRange({
        minBookingDays,
        isDateBlocked: disabledDatesByUser,
        startDate: date,
        endDate: null,
      })
    ) {
      onDatesChange({
        endDate: null,
        startDate: date,
        focusedInput: END_DATE,
      })
    } else if (
      focusedInput === START_DATE &&
      !exactMinBookingDays &&
      canSelectRange({
        minBookingDays,
        isDateBlocked: disabledDatesByUser,
        endDate,
        startDate: date,
      })
    ) {
      onDatesChange({
        endDate,
        startDate: date,
        focusedInput: END_DATE,
      })
    } else if (
      focusedInput === START_DATE &&
      !exactMinBookingDays &&
      canSelectRange({
        minBookingDays,
        isDateBlocked: disabledDatesByUser,
        endDate: null,
        startDate: date,
      })
    ) {
      onDatesChange({
        endDate: null,
        startDate: date,
        focusedInput: END_DATE,
      })
    } else if (
      focusedInput === END_DATE &&
      startDate &&
      !isBefore(date, startDate) &&
      !exactMinBookingDays &&
      canSelectRange({
        minBookingDays,
        isDateBlocked: disabledDatesByUser,
        startDate,
        endDate: date,
      })
    ) {
      onDatesChange({
        startDate,
        endDate: date,
        focusedInput: null,
      })
    }

    if (
      focusedInput !== END_DATE &&
      (!focusedDate || (focusedDate && !isSameMonth(date, focusedDate))) &&
      changeActiveMonthOnSelect
    ) {
      setActiveMonths(getInitialMonths(numberOfMonths, date))
    }
  }

  function onDateHover(date: Date | null) {
    if (!date) {
      setHoveredDate(null)
    } else if (date) {
      const isNotBlocked =
        !isDateBlocked(date) || (startDate && isSameDay(date, startDate))
      const isHoveredDateAfterOrEqualMinDate = minBookingDate
        ? !isBefore(date, addDays(minBookingDate, -1))
        : true
      const isHoveredDateBeforeOrEqualMaxDate = maxBookingDate
        ? !isAfter(date, maxBookingDate)
        : true

      // Exact minimal booking days
      const potentialEndDate = addDays(date, minBookingDays - 1)
      const isPotentialEndDateAfterOrEqualMinDate = minBookingDate
        ? !isBefore(potentialEndDate, minBookingDate)
        : true
      const isPotentialEndDateBeforeOrEqualMaxDate = maxBookingDate
        ? !isAfter(potentialEndDate, maxBookingDate)
        : true
      const isExactAndInRange =
        exactMinBookingDays &&
        minBookingDays > 1 &&
        isHoveredDateAfterOrEqualMinDate &&
        isHoveredDateBeforeOrEqualMaxDate &&
        isPotentialEndDateAfterOrEqualMinDate &&
        isPotentialEndDateBeforeOrEqualMaxDate

      // Is date in range
      const isInRange =
        startDate &&
        !endDate &&
        !exactMinBookingDays &&
        isHoveredDateAfterOrEqualMinDate &&
        isHoveredDateBeforeOrEqualMaxDate

      // Is start date hovered and in range
      const isMinBookingDaysInRange =
        minBookingDays > 1 && startDate
          ? isWithinRange(date, {
              start: startDate,
              end: addDays(startDate, minBookingDays - 2),
            })
          : true
      const isStartDateHoveredAndInRange =
        startDate && isSameDay(date, startDate) && isMinBookingDaysInRange

      if (
        isNotBlocked &&
        (isExactAndInRange || isInRange || isStartDateHoveredAndInRange)
      ) {
        setHoveredDate(date)
      } else if (hoveredDate !== null) {
        setHoveredDate(null)
      }
    }
  }

  const goToPreviousMonths = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, -1))
    setFocusedDate(null)
  }, [activeMonths, numberOfMonths])

  const goToPreviousMonthsByOneMonth = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, -1, 1))
    setFocusedDate(null)
  }, [activeMonths, numberOfMonths])

  const goToNextMonths = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, 1))
    setFocusedDate(null)
  }, [activeMonths, numberOfMonths])

  const goToNextMonthsByOneMonth = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, 1, 1))
    setFocusedDate(null)
  }, [activeMonths, numberOfMonths])

  const goToDate = useCallback(
    (date: Date) => {
      setActiveMonths(getInitialMonths(numberOfMonths, date))
      setFocusedDate(null)
    },
    [numberOfMonths],
  )

  const goToPreviousYear = useCallback(
    (numYears: number = 1) => {
      setActiveMonths(
        getNextActiveMonth(
          activeMonths,
          numberOfMonths,
          -(numYears * 12 - numberOfMonths + 1),
        ),
      )
      setFocusedDate(null)
    },
    [activeMonths, numberOfMonths],
  )

  const goToNextYear = useCallback(
    (numYears: number = 1) => {
      setActiveMonths(
        getNextActiveMonth(
          activeMonths,
          numberOfMonths,
          numYears * 12 - numberOfMonths + 1,
        ),
      )
      setFocusedDate(null)
    },
    [activeMonths, numberOfMonths],
  )

  return {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isStartDate,
    isEndDate,
    isDateBlocked,
    numberOfMonths,
    isDateFocused,
    focusedDate,
    hoveredDate,
    onResetDates,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToPreviousMonthsByOneMonth,
    goToNextMonths,
    goToNextMonthsByOneMonth,
    goToDate,
    goToPreviousYear,
    goToNextYear,
  }
}
