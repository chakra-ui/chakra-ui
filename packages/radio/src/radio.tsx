import {
  chakra,
  layoutPropNames,
  PropsOf,
  SystemProps,
  ThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import { cx, split, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useRadio, UseRadioProps } from "./use-radio"
import { useRadioGroupContext } from "./radio-group"

const StyledControl = chakra("div", {
  themeKey: "Radio.Control",
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
})

const StyledLabel = chakra("div", {
  themeKey: "Radio.Label",
  baseStyle: {
    userSelect: "none",
  },
})

type Omitted = "onChange" | "defaultChecked" | "checked"

type BaseControlProps = Omit<PropsOf<typeof StyledControl>, Omitted>

export type RadioProps = UseRadioProps &
  ThemingProps &
  BaseControlProps & {
    /**
     * The spacing between the checkbox and it's label text
     * @default 0.5rem
     */
    spacing?: SystemProps["marginLeft"]
  }

/**
 * Radio
 *
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 *
 * @see Docs https://chakra-ui.com/components/radio
 */
export const Radio = forwardRef<RadioProps, "input", Omitted>(function Radio(
  props,
  ref,
) {
  const group = useRadioGroupContext()

  const {
    spacing = "0.5rem",
    colorScheme = group?.colorScheme,
    variant = group?.variant,
    size = group?.size,
    children,
    ...radioProps
  } = props

  let isChecked = props.isChecked
  if (group?.value && props.value) {
    isChecked = group.value === props.value
  }

  let onChange = props.onChange
  if (group?.onChange && props.value) {
    onChange = group.onChange
  }

  const theming = { variant, colorScheme, size }

  const {
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps: rest,
  } = useRadio({ ...radioProps, isChecked, onChange })

  const [layoutProps, otherProps] = split(rest, layoutPropNames as any)

  return (
    <chakra.label
      className="chakra-radio"
      display="inline-flex"
      alignItems="center"
      verticalAlign="top"
      {...layoutProps}
    >
      <input className="chakra-radio__input" {...getInputProps({ ref })} />
      <StyledControl
        {...theming}
        {...getCheckboxProps(otherProps)}
        className={cx("chakra-radio__control", props.className)}
      />
      {children && (
        <StyledLabel
          className="chakra-radio__label"
          {...theming}
          {...getLabelProps()}
          marginLeft={spacing}
          children={children}
        />
      )}
    </chakra.label>
  )
})

if (__DEV__) {
  Radio.displayName = "Radio"
}
