import { useCheckbox, UseCheckboxProps } from "@chakra-ui/checkbox"
import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/system"
import { cx, dataAttr, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type SwitchProps = Omit<UseCheckboxProps, "isIndeterminate"> &
  Omit<
    PropsOf<typeof chakra.label>,
    "onChange" | "defaultChecked" | "checked"
  > &
  ThemingProps

export const Switch = React.forwardRef(function Switch(
  props: SwitchProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Switch", props)
  const { className, ...rest } = omitThemingProps(props)
  const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
    rest,
  )

  const input = getInputProps({ ref })
  const checkbox = getCheckboxProps() as any

  return (
    <chakra.label
      className={cx("chakra-switch", className)}
      {...htmlProps}
      __css={{
        display: "inline-block",
        verticalAlign: "middle",
        ...styles.Container,
      }}
    >
      <input className="chakra-switch__input" {...input} />
      <chakra.div
        {...checkbox}
        className="chakra-switch__track"
        __css={{
          display: "inline-flex",
          flexShrink: 0,
          justifyContent: "flex-start",
          boxSizing: "content-box",
          cursor: "pointer",
          ...styles.Track,
        }}
      >
        <chakra.div
          __css={styles.Thumb}
          className="chakra-switch__thumb"
          data-checked={dataAttr(state.isChecked)}
          data-hover={dataAttr(state.isHovered)}
        />
      </chakra.div>
    </chakra.label>
  )
})

if (__DEV__) {
  Switch.displayName = "Switch"
}
