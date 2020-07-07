import {
  chakra,
  layoutPropNames,
  PropsOf,
  SystemProps,
  ThemingProps,
} from "@chakra-ui/system/src"
import { cx, split, __DEV__ } from "@chakra-ui/utils/src"
import * as React from "react"
import { useRadioGroupContext } from "./radio-group"
import { useRadio, UseRadioProps } from "./use-radio"

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
    /**
     * If `true`, the radio will occupy the full width of it's parent container
     */
    isFullWidth?: boolean
  }

const StyledWrapper = chakra("label", {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
  },
})

/**
 * Radio
 *
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 *
 * @see Docs https://chakra-ui.com/components/radio
 */
export const Radio = React.forwardRef(function Radio(
  props: RadioProps,
  ref: React.Ref<any>,
) {
  const group = useRadioGroupContext()

  const {
    spacing = "0.5rem",
    colorScheme = group?.colorScheme,
    variant = group?.variant,
    size = group?.size,
    children,
    isFullWidth,
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

  const name = group?.name || props?.name

  const theming = { variant, colorScheme, size }

  const {
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps: rest,
  } = useRadio({ ...radioProps, isChecked, onChange, name })

  const [layoutProps, otherProps] = split(rest, layoutPropNames as any)

  return (
    <StyledWrapper
      className="chakra-radio"
      width={isFullWidth ? "full" : undefined}
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
    </StyledWrapper>
  )
})

if (__DEV__) {
  Radio.displayName = "Radio"
}
