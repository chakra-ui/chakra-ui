import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

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
  const styles = useMultiStyleConfig("Input", props)
  const ownProps = omitThemingProps(props)
  const input = useFormControl<HTMLInputElement>(ownProps)
  const _className = cx("chakra-input", props.className)

  return (
    <chakra.input
      {...input}
      __css={{
        ...styles.field,
        // Workaround to force the following css to be always placed _after_ the all above styes.
        // Otherwise, if css above contains any media queries,
        // they would be moved to the end and increased their priority.
        // See: https://github.com/emotion-js/emotion/issues/1860
        "&&": {
          ".chakra-input__group.chakra-input__group--has-left-element &": {
            paddingLeft: "var(--chakra-input-group-height)",
          },
          ".chakra-input__group.chakra-input__group--has-right-element &": {
            paddingRight: "var(--chakra-input-group-height)",
          },
          ".chakra-input__group.chakra-input__group--has-left-addon &": {
            borderLeftRadius: 0,
          },
          ".chakra-input__group.chakra-input__group--has-right-addon &": {
            borderRightRadius: 0,
          },
        },
      }}
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
