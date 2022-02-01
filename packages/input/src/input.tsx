import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
  PropsOf,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

interface NativeInputOptions {
  /**
   * The native HTML `size` attribute to be passed to the `input`
   */
  htmlSize?: number
}

interface NativeInputProps extends PropsOf<"input">, NativeInputOptions {}

const NativeInput = React.forwardRef(
  (props: NativeInputProps, ref: React.Ref<any>) => {
    const { htmlSize, ...rest } = props
    return <input size={htmlSize} ref={ref} {...rest} />
  },
)

interface InputOptions extends NativeInputOptions {
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
}

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface InputProps
  extends Omit<HTMLChakraProps<"input">, Omitted>,
    InputOptions,
    ThemingProps<"Input">,
    FormControlOptions {}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = forwardRef<InputProps, "input">((props, ref) => {
  const { htmlSize, ...rest } = props

  const styles = useMultiStyleConfig("Input", rest)
  const ownProps = omitThemingProps(rest)
  const input = useFormControl<HTMLInputElement>(ownProps)
  const _className = cx("chakra-input", props.className)

  // This is used to remove the default width=100% when size is set, which otherwise conflicts
  const { width, ...fieldStyles } = styles.field
  const cssStyles = htmlSize ? { ...fieldStyles } : { ...styles.field }

  return (
    <chakra.input
      as={NativeInput}
      htmlSize={htmlSize}
      {...input}
      __css={{ ...cssStyles }}
      ref={ref}
      className={_className}
    />
  )
})

if (__DEV__) {
  Input.displayName = "Input"
}

// This is used in `input-group.tsx`
Input.id = "Input"
