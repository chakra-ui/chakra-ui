import {
  chakra,
  layoutPropNames,
  PropsOf,
  SystemProps,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
} from "@chakra-ui/system"
import { cx, split, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useRadioGroupContext } from "./radio-group"
import { useRadio, UseRadioProps } from "./use-radio"

type BaseControlProps = Omit<
  PropsOf<typeof chakra.div>,
  "onChange" | "defaultChecked" | "checked"
>

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
  const styles = useStyleConfig("Radio", { ...group, ...props })

  const {
    spacing = "0.5rem",
    children,
    isFullWidth,
    ...radioProps
  } = omitThemingProps(props)

  let isChecked = props.isChecked
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

  return (
    <chakra.label
      className="chakra-radio"
      {...layoutProps}
      __css={{
        width: isFullWidth ? "full" : undefined,
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "top",
      }}
    >
      <input className="chakra-radio__input" {...getInputProps({ ref })} />
      <chakra.div
        className={cx("chakra-radio__control", props.className)}
        {...getCheckboxProps(otherProps)}
        __css={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          ...styles.Control,
        }}
      />
      {children && (
        <chakra.div
          className="chakra-radio__label"
          {...getLabelProps()}
          __css={{
            userSelect: "none",
            ml: spacing,
            ...styles.Label,
          }}
          children={children}
        />
      )}
    </chakra.label>
  )
})

if (__DEV__) {
  Radio.displayName = "Radio"
}
