import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import React from "react"
import InputMask from "react-input-mask"
import { useDatepickerInputContext } from "./datepicker-input-context"
import { END_DATE, FocusedInput, START_DATE } from "./hooks/useDatepicker"
import {
  useDatepickerInputField,
  UseDatepickerInputFieldProps,
} from "./use-datepicker-input-field"

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /**
   * If `true`, the input element will span the full width of its parent
   *
   * @deprecated
   * This component defaults to 100% width,
   *  please use the props `maxWidth` or `width` to configure
   */
  isFullWidth?: boolean

  /**
   * defines if the input is a startDate or an endDate
   * @default
   * inputType = "startDate"
   */
  inputType?: FocusedInput
}

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface DatepickerInputFieldProps
  extends UseDatepickerInputFieldProps,
    Omit<HTMLChakraProps<"input">, Omitted>,
    InputOptions,
    ThemingProps<"Input"> {}

export const DatepickerInputField = forwardRef<
  DatepickerInputFieldProps,
  "input"
>(({ inputType = START_DATE, ...props }, ref) => {
  const { inputMaskChar, displayFormat } = useDatepickerInputContext()

  const styles = useMultiStyleConfig("Input", props)

  const { getInputProps, htmlProps } = useDatepickerInputField(props, inputType)

  const ownProps = omitThemingProps(props)
  const inputProps = getInputProps(ownProps, ref)
  const _className = cx("chakra-input", props.className)

  const {
    value,
    disabled,
    readOnly,
    onChange,
    onFocus,
    onClick,
    onBlur,
    ...input
  } = inputProps

  return (
    <StylesProvider value={styles}>
      <InputMask
        mask={displayFormat.replace(/([Myd])/g, "9")}
        maskChar={inputMaskChar}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
      >
        {(inputMaskProps: any) => {
          return (
            <chakra.input
              {...htmlProps}
              __css={styles.field}
              className={_className}
              disabled={disabled}
              readOnly={readOnly}
              {...input}
              {...inputMaskProps}
            />
          )
        }}
      </InputMask>
    </StylesProvider>
  )
})

export const DatepickerInputFieldStartDate = forwardRef(
  (props: Omit<DatepickerInputFieldProps, "inputType">, ref) => (
    <DatepickerInputField {...props} ref={ref} inputType={START_DATE} />
  ),
)

export const DatepickerInputFieldEndDate = forwardRef(
  (props: Omit<DatepickerInputFieldProps, "inputType">, ref) => (
    <DatepickerInputField {...props} ref={ref} inputType={END_DATE} />
  ),
)

if (__DEV__) {
  DatepickerInputField.displayName = "DatepickerInputField"
  DatepickerInputFieldStartDate.displayName = "DatepickerInputFieldStartDate"
  DatepickerInputFieldEndDate.displayName = "DatepickerInputFieldEndDate"
}
