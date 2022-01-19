import {
  chakra,
  forwardRef,
  layoutPropNames,
  omitThemingProps,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { callAll, split, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useRadioGroupContext } from "./radio-group"
import { useRadio, UseRadioProps } from "./use-radio"

type Omitted = "onChange" | "defaultChecked" | "checked"
interface BaseControlProps extends Omit<HTMLChakraProps<"div">, Omitted> {}

export interface RadioProps
  extends UseRadioProps,
    ThemingProps<"Radio">,
    BaseControlProps {
  /**
   * The spacing between the checkbox and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: SystemProps["marginLeft"]
  /**
   * If `true`, the radio will occupy the full width of its parent container
   *
   * @deprecated
   * This component defaults to 100% width,
   * please use the props `maxWidth` or `width` to configure
   */
  isFullWidth?: boolean
}

/**
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export const Radio = forwardRef<RadioProps, "input">((props, ref) => {
  const group = useRadioGroupContext()
  const { onChange: onChangeProp, value: valueProp } = props

  const styles = useMultiStyleConfig("Radio", { ...group, ...props })

  const ownProps = omitThemingProps(props)

  const {
    spacing = "0.5rem",
    children,
    isFullWidth,
    isDisabled = group?.isDisabled,
    isFocusable = group?.isFocusable,
    ...rest
  } = ownProps

  let isChecked = props.isChecked
  if (group?.value != null && valueProp != null) {
    isChecked = group.value === valueProp
  }

  let onChange = onChangeProp
  if (group?.onChange && valueProp != null) {
    onChange = callAll(group.onChange, onChangeProp)
  }

  const name = props?.name ?? group?.name

  const {
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    getRootProps,
    htmlProps,
  } = useRadio({
    ...rest,
    isChecked,
    isFocusable,
    isDisabled,
    onChange,
    name,
  })

  const [layoutProps, otherProps] = split(htmlProps, layoutPropNames as any)

  const checkboxProps = getCheckboxProps(otherProps)
  const inputProps = getInputProps({}, ref)
  const labelProps = getLabelProps()
  const rootProps = Object.assign({}, layoutProps, getRootProps())

  const rootStyles = {
    width: isFullWidth ? "full" : undefined,
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    cursor: "pointer",
    ...styles.container,
  }

  const checkboxStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    ...styles.control,
  }

  const labelStyles: SystemStyleObject = {
    userSelect: "none",
    marginStart: spacing,
    ...styles.label,
  }

  return (
    <chakra.label className="chakra-radio" {...rootProps} __css={rootStyles}>
      <input className="chakra-radio__input" {...inputProps} />
      <chakra.span
        className="chakra-radio__control"
        {...checkboxProps}
        __css={checkboxStyles}
      />
      {children && (
        <chakra.span
          className="chakra-radio__label"
          {...labelProps}
          __css={labelStyles}
        >
          {children}
        </chakra.span>
      )}
    </chakra.label>
  )
})

if (__DEV__) {
  Radio.displayName = "Radio"
}
