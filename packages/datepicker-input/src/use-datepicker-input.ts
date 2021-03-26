import { useDisclosure, useEventListener } from "@chakra-ui/hooks"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  dayLabelFormatFn,
  END_DATE,
  FirstDayOfWeek,
  FocusedInput,
  monthLabelFormatFn,
  OnDatesChangeProps,
  START_DATE,
  useDatepicker,
  weekdayLabelFormatFn,
} from "./hooks/useDatepicker"

export const defaultDisplayFormat = "MM/dd/yyyy"

export interface UseDatepickerInputProps {
  /**
   * The initial `date` value used for the start date field
   */
  startDate?: Date | null
  /**
   * The initial `date` value used for the end date field
   */
  endDate?: Date | null
  /**
   * The max date the date picker will allow to be selected
   */
  maxBookingDate?: Date
  /**
   * The min date the date picker will allow to be selected
   */
  minBookingDate?: Date
  /**
   * The minimum number of days must be selected
   */
  minBookingDays?: number
  /**
   * If `true`, the input cannot select more days than the `minBookingDays` amount
   */
  exactMinBookingDays?: boolean
  /**
   * The first day of the week
   *
   * @default 0
   */
  firstDayOfWeek?: FirstDayOfWeek
  /**
   * Set the default focusedInput to be `startDate` or `endDate`
   *
   * @default null
   */
  focusedInput?: FocusedInput
  /**
   * Set the initial visable month to be shown in the date picker
   */
  initialVisibleMonth?: Date
  /**
   * Callback function to determin if the date is blocked
   *
   * It is used to set the day(s) unavailable
   *
   * @param date
   */
  isDateBlocked?(date: Date): boolean
  /**
   * array of dates that are not selectable
   */
  unavailableDates?: Date[]
  /**
   * The `dateFormat` is used to parse the date object into a string and set the value
   * of the input field
   */
  displayFormat?: string
  /**
   * number of months to show in the date picker
   *
   * @default 1
   */
  numberOfMonths?: number
  /**
   * If `true`, change active month when a date is selected
   */
  changeActiveMonthOnSelect?: boolean
  /**
   * If `true`, manually set the showDatepicker
   */
  showDatepicker?: boolean
  /**
   * Callback handler for single date picker when `startDate` is changed
   * @param date
   */
  onDateChange?(date: Date | null): void
  /**
   * Callback handler for date range picker when `startDate`, `endDate`, `focusedInput` are changed
   * @param data
   */
  onDatesChange?(data: OnDatesChangeProps): void
  /**
   * Callback handler for when the focusInput changes
   * @param focusedInput
   */
  onFocusChange?(focusedInput: FocusedInput): void
  /**
   * Callback handler for when the datepicker onClose is called
   */
  onClose?(): void
  /**
   * Callback handler for when the datepicker onOpen is called
   */
  onOpen?(): void
  /**
   * Placeholder character for the input mask
   * @default "_"
   */
  inputMaskChar?: string

  /**
   * should focus the input when date picker is changed or clicked
   */
  focusInputOnChange?: boolean

  /** String Formatters */
  dayLabelFormat?: (date: Date) => string
  weekdayLabelFormat?: (date: Date) => string
  monthLabelFormat?: (date: Date) => string
}

export function useDatepickerInput(props: UseDatepickerInputProps) {
  const {
    startDate: startDateProp = null,
    endDate: endDateProp = null,
    displayFormat = defaultDisplayFormat,
    exactMinBookingDays = false,
    firstDayOfWeek: firstDayOfWeekProp = 0,
    focusedInput: focusedInputProp = null,
    isDateBlocked: isDateBlockedProp = () => false,
    showDatepicker: showDatepickerProp = false,
    unavailableDates = [],
    changeActiveMonthOnSelect = true,
    initialVisibleMonth,
    maxBookingDate,
    minBookingDate,
    minBookingDays,
    dayLabelFormat = dayLabelFormatFn,
    weekdayLabelFormat = weekdayLabelFormatFn,
    monthLabelFormat = monthLabelFormatFn,
    onClose: onCloseProp = () => {},
    onOpen: onOpenProp = () => {},
    onDateChange: onDateChangeProp = () => {},
    onDatesChange: onDatesChangeProp = () => {},
    onFocusChange: onFocusChangeProp = () => {},
    numberOfMonths: numberOfMonthsDefaultProp = 1,
    inputMaskChar = "_",
    focusInputOnChange = true,
    /**
     * all the remaining props are for the container
     */
    ...htmlProps
  } = props

  const startDateInputRef = useRef<HTMLInputElement>(null)
  const endDateInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  const [startDate, setStartDate] = useState<Date | null>(startDateProp)
  const [endDate, setEndDate] = useState<Date | null>(endDateProp)
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(
    focusedInputProp,
  )

  const [numberOfMonthsProp, setNumberOfMonthsProp] = useState(
    numberOfMonthsDefaultProp,
  )

  const [showDatepicker, setShowDatepicker] = useState(showDatepickerProp)

  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen: showDatepickerProp,
    isOpen: showDatepicker,
    onClose: () => {
      setShowDatepicker(false)
      changeFocusedInput(null)
      onCloseProp()
    },
    onOpen: () => {
      setShowDatepicker(true)
      onOpenProp()
    },
  })

  useEffect(() => {
    setNumberOfMonthsProp(numberOfMonthsDefaultProp)
  }, [numberOfMonthsDefaultProp])

  /**
   * onDatesChange is executed when both dates (if date range) or startDate (if single) are selected
   */
  function onDatesChange(data: OnDatesChangeProps) {
    setEndDate(data.endDate)
    setStartDate(data.startDate)
    setFocusedInput(data.focusedInput)

    // callbacks
    onDateChangeProp(data.startDate)
    onDatesChangeProp(data)
  }

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isStartDate,
    isEndDate,
    isDateBlocked,
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
    numberOfMonths,
  } = useDatepicker({
    startDate,
    endDate,
    changeActiveMonthOnSelect,
    exactMinBookingDays,
    focusedInput,
    initialVisibleMonth,
    unavailableDates,
    maxBookingDate,
    minBookingDate,
    minBookingDays,
    onDatesChange,
    numberOfMonths: numberOfMonthsProp,
    firstDayOfWeek: firstDayOfWeekProp,
    isDateBlocked: isDateBlockedProp,
  })

  /**
   * Focus changes when user clicks on an input or date is selected
   */
  const changeFocusedInput = useCallback(
    (newFocusInput: FocusedInput) => {
      if (newFocusInput === null) {
        setFocusedInput(null)
      } else if (newFocusInput === END_DATE && startDate) {
        setFocusedInput(END_DATE)
      } else {
        setFocusedInput(START_DATE)
      }
    },
    [startDate],
  )

  useEffect(() => {
    onFocusChangeProp(focusedInput)

    if (focusedInput) {
      onOpen()
    } else {
      onClose()
    }
  }, [focusedInput, onClose, onFocusChangeProp, onOpen, startDate])

  /**
   * When user clicks outside of dateicker, hide the datepicker
   */
  const onClickOutsideHandler = useCallback(
    (event: Event) => {
      if (
        focusedInput !== null &&
        containerRef &&
        !containerRef.current?.contains(event.target as any)
      ) {
        changeFocusedInput(null)
      }
    },
    [focusedInput, changeFocusedInput],
  )

  useEventListener("click", onClickOutsideHandler)

  return {
    // Default Props
    inputMaskChar,
    htmlProps,

    // States
    startDate,
    endDate,
    focusedInput,

    // Refs
    containerRef,
    startDateInputRef,
    endDateInputRef,

    // useDisclosure
    isOpen,
    onClose,
    onOpen,

    // Formatters
    dayLabelFormat,
    displayFormat,
    monthLabelFormat,
    weekdayLabelFormat,

    // UseDatepickerReturn
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

    // used for inputs
    changeFocusedInput,
    focusInputOnChange,
  }
}

export type UseDatepickerInputReturn = ReturnType<typeof useDatepickerInput>
