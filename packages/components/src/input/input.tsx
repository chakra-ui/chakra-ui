import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { FieldOptions, useField } from "../field"

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
   * The native HTML `size` attribute to be passed to the `input`
   */
  htmlSize?: number
}

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface InputProps
  extends Omit<HTMLChakraProps<"input">, Omitted>,
    InputOptions,
    ThemingProps<"Input">,
    FieldOptions {}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 *
 * @see Docs https://chakra-ui.com/docs/components/input
 */
export const Input = forwardRef<InputProps, "input">(
  function Input(props, ref) {
    const { htmlSize, ...restProps } = props

    const styles = useMultiStyleConfig("Input", restProps)
    const _restProps = omitThemingProps(restProps)

    const inputProps = useField<HTMLInputElement>(_restProps)
    const _className = cx("chakra-input", props.className)

    return (
      <chakra.input
        size={htmlSize}
        {...inputProps}
        __css={styles.field}
        ref={ref}
        className={_className}
      />
    )
  },
)

Input.displayName = "Input"

// This is used in `input-group.tsx`
Input.id = "Input"
