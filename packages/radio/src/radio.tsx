import {
  chakra,
  layoutPropNames,
  PropsOf,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
} from "@chakra-ui/system"
import { cx, split, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useRadioGroupContext } from "./radio-group"
import { useRadio, UseRadioProps } from "./use-radio"

type Omitted = "onChange" | "defaultChecked" | "checked"
type BaseControlProps = Omit<PropsOf<typeof chakra.div>, Omitted>

export type RadioProps = UseRadioProps &
  ThemingProps &
  BaseControlProps & {
    /**
     * The spacing between the checkbox and it's label text
     * @default 0.5rem
     */
    spacing?: SystemProps["marginLeft"]
    /**
     * If `true`, the radio will occupy the full width of it's parent container
     */
    isFullWidth?: boolean
  }

/**
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 * @see Docs https://chakra-ui.com/components/radio
 */
export const Radio = React.forwardRef(function Radio(
  props: RadioProps,
  ref: React.Ref<any>,
) {
  const group = useRadioGroupContext()
  const styles = useMultiStyleConfig("Radio", { ...group, ...props })

  const {
    spacing = "0.5rem",
    children,
    isFullWidth,
    ...radioProps
  } = omitThemingProps(props)

  let isChecked = props.isChecked || false
  if (group?.value && props.value) {
    isChecked = group.value === props.value
  }

  let onChange = props.onChange
  if (group?.onChange && props.value) {
    onChange = group.onChange
  }

  const name = group?.name || props?.name

  const {
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps: rest,
  } = useRadio({ ...radioProps, isChecked, onChange, name })

  const [layoutProps, otherProps] = split(rest, layoutPropNames as any)

  const checkboxProps = getCheckboxProps(otherProps)
  const inputProps = getInputProps({}, ref)
  const labelProps = getLabelProps()

  const rootStyles = {
    width: isFullWidth ? "full" : undefined,
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
  }

  const checkboxStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    ...styles.control,
  }

  const labelStyles = {
    userSelect: "none",
    ml: spacing,
    ...styles.label,
  }

  return (
    <chakra.label className="chakra-radio" {...layoutProps} __css={rootStyles}>
      <input className="chakra-radio__input" {...inputProps} />
      <chakra.div
        className="chakra-radio__control"
        {...checkboxProps}
        __css={checkboxStyles}
      />
      {children && (
        <chakra.div
          className="chakra-radio__label"
          {...labelProps}
          __css={labelStyles}
          children={children}
        />
      )}
    </chakra.label>
  )
})

if (__DEV__) {
  Radio.displayName = "Radio"
}
