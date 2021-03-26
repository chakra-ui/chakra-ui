import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
} from "@chakra-ui/system"
import { mergeRefs, __DEV__ } from "@chakra-ui/utils"
import React from "react"
import { DatepickerInputProvider } from "./datepicker-input-context"
import {
  useDatepickerInput,
  UseDatepickerInputProps,
} from "./use-datepicker-input"

export interface DatepickerInputProps
  extends UseDatepickerInputProps,
    ThemingProps<"DatepickerInput">,
    Omit<HTMLChakraProps<"div">, keyof UseDatepickerInputProps> {}

/**
 * DatepickerInput - defaults as a single date input
 */
export const DatepickerInput = forwardRef<DatepickerInputProps, "div">(
  (props, ref) => {
    const { htmlProps, ...context } = useDatepickerInput(props)
    const ctx = React.useMemo(() => context, [context])
    const refs = mergeRefs(ref, ctx.containerRef)

    return (
      <DatepickerInputProvider value={ctx}>
        <chakra.div
          ref={refs}
          {...htmlProps}
          __css={{
            position: "relative",
          }}
        />
      </DatepickerInputProvider>
    )
  },
)

DatepickerInput.defaultProps = {
  exactMinBookingDays: true,
}

if (__DEV__) {
  DatepickerInput.displayName = "DatepickerInput"
}

/**
 * DatepickerRangeInput
 */
export const DatepickerRangeInput = forwardRef<DatepickerInputProps, "div">(
  (props, ref) => (
    <DatepickerInput exactMinBookingDays={false} {...props} ref={ref} />
  ),
)

if (__DEV__) {
  DatepickerRangeInput.displayName = "DatepickerRangeInput"
}
