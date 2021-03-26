import { chakra, HTMLChakraProps, useStyles } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import { isToday as isTodayDate } from "date-fns"
import React, { useMemo, useRef } from "react"
import { useDatepickerInputContext } from "./datepicker-input-context"
import { useDay, useMonth, UseMonthProps } from "./hooks/useDatepicker"

/**
 * DatepickerMonth - core Month component
 * shows single or multiple months
 */
export interface DatepickerMonthProps extends HTMLChakraProps<"div"> {}

export const DatepickerMonth = (props: DatepickerMonthProps) => {
  const styles = useStyles()
  const { activeMonths } = useDatepickerInputContext()

  return (
    <chakra.div {...props} __css={{ ...styles.monthsContainer }}>
      {activeMonths.map(({ month, year }) => (
        <Month key={`${month}-${year}`} month={month} year={year} />
      ))}
    </chakra.div>
  )
}

if (__DEV__) {
  DatepickerMonth.displayName = "DatepickerMonth"
}

/**
 * Month
 */
interface MonthProps extends Pick<UseMonthProps, "month" | "year"> {}

const Month = ({ month, year }: MonthProps) => {
  const styles = useStyles()
  const context = useDatepickerInputContext()
  const { days, weekdayLabels, monthLabel } = useMonth({
    ...context,
    month,
    year,
  })

  return (
    <chakra.div __css={{ ...styles.monthContainer }}>
      <chakra.div display="flex">
        <chakra.div __css={{ ...styles.monthLabel }}>{monthLabel}</chakra.div>
      </chakra.div>
      <chakra.div
        display="grid"
        gridTemplateColumns="repeat(7, minmax(0, 1fr))"
      >
        {weekdayLabels.map((weekdayLabel) => (
          <chakra.div
            key={weekdayLabel}
            __css={{ display: "flex", ...styles.weekdayLabel }}
          >
            {weekdayLabel}
          </chakra.div>
        ))}
      </chakra.div>
      <chakra.div
        display="grid"
        gridTemplateColumns="repeat(7, minmax(0, 1fr))"
      >
        {days.map((day, index) =>
          typeof day === "object" ? (
            <Day
              key={`${monthLabel}-${day.dayLabel}-${index}`}
              date={day.date}
              day={day.dayLabel}
            />
          ) : (
            <div key={index} />
          ),
        )}
      </chakra.div>
    </chakra.div>
  )
}

if (__DEV__) {
  Month.displayName = "Month"
}

/**
 * Day
 */
interface DayProps {
  date: Date
  day: string
}

const Day = ({ day, date }: DayProps) => {
  const dayRef = useRef<any>()
  const styles = useStyles()

  const context = useDatepickerInputContext()

  const {
    disabledDate,
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    ...context,
    dayRef,
    date,
  })

  const isToday = useMemo(() => isTodayDate(date), [date])
  const isSelectedStart = context.isStartDate(date)
  const isSelectedEnd = context.isEndDate(date)

  const buttonStyle = useMemo(
    () =>
      getDayStyle(
        {
          disabledDate,
          isSelected,
          isSelectedStart,
          isSelectedEnd,
          isSelectedStartOrEnd,
          isWithinHoverRange,
          isToday,
        },
        {
          base: styles.dayBase,
          disabled: styles.dayDisabled,
          normal: styles.dayNormal,
          hoverRange: styles.dayHoverRange,
          selected: styles.daySelected,
          selectedStartOrEnd: styles.daySelectedStartOrEnd,
          selectedStart: styles.daySelectedStart,
          selectedEnd: styles.daySelectedEnd,
          today: styles.dayToday,
        },
      ),
    [
      disabledDate,
      isSelected,
      isSelectedEnd,
      isSelectedStart,
      isSelectedStartOrEnd,
      isToday,
      isWithinHoverRange,
      styles,
    ],
  )

  const containerStyle = useMemo(
    () =>
      getDayStyle(
        {
          disabledDate,
          isSelected,
          isSelectedStart,
          isSelectedEnd,
          isSelectedStartOrEnd,
          isWithinHoverRange,
          isToday,
        },
        {
          base: styles.dayBaseContainer,
          disabled: styles.dayDisabledContainer,
          normal: styles.dayNormalContainer,
          hoverRange: styles.dayHoverRangeContainer,
          selected: styles.daySelectedContainer,
          selectedStartOrEnd: styles.daySelectedStartOrEndContainer,
          selectedStart: styles.daySelectedStartContainer,
          selectedEnd: styles.daySelectedEndContainer,
          today: styles.dayTodayContainer,
        },
      ),
    [
      disabledDate,
      isSelected,
      isSelectedEnd,
      isSelectedStart,
      isSelectedStartOrEnd,
      isToday,
      isWithinHoverRange,
      styles,
    ],
  )

  return (
    <chakra.div __css={{ ...containerStyle }}>
      <chakra.button
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        tabIndex={tabIndex}
        disabled={disabledDate}
        __css={{ ...buttonStyle }}
      >
        {day}
      </chakra.button>
    </chakra.div>
  )
}

if (__DEV__) {
  Day.displayName = "Day"
}

function getDayStyle<T extends object>(
  dayProps: {
    disabledDate?: boolean
    isSelected?: boolean
    isSelectedStart?: boolean
    isSelectedStartOrEnd?: boolean
    isSelectedEnd?: boolean
    isWithinHoverRange?: boolean
    isToday?: boolean
  },
  styles: {
    disabled: T
    base: T
    normal: T
    hoverRange: T
    selected: T
    selectedStartOrEnd: T
    selectedStart: T
    selectedEnd: T
    today: T
  },
) {
  const {
    isSelected,
    disabledDate,
    isWithinHoverRange,
    isSelectedStartOrEnd,
    isSelectedStart,
    isSelectedEnd,
    isToday,
  } = dayProps

  let style = styles.base

  if (isToday) {
    style = { ...style, ...styles.today }
  }

  if (disabledDate) {
    return { ...style, ...styles.disabled }
  }

  if (!isSelected && !isWithinHoverRange) {
    style = { ...style, ...styles.normal }
  }

  if (isToday) {
    style = { ...style, ...styles.today }
  }

  if (isWithinHoverRange) {
    style = { ...style, ...styles.hoverRange }
  }
  if (isSelected) {
    style = { ...style, ...styles.selected }
  }
  if (isSelectedStartOrEnd) {
    style = { ...style, ...styles.selectedStartOrEnd }
  }
  if (isSelectedStart) {
    style = { ...style, ...styles.selectedStart }
  }
  if (isSelectedEnd) {
    style = { ...style, ...styles.selectedEnd }
  }
  return style
}
