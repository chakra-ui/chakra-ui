import { useCheckbox, UseCheckboxProps } from "@chakra-ui/checkbox"
import {
  chakra,
  PropsOf,
  useMultiStyleConfig,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/system"
import { cx, dataAttr, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

type Omitted = "onChange" | "defaultChecked" | "checked"

export type SwitchProps = Omit<UseCheckboxProps, "isIndeterminate"> &
  Omit<PropsOf<typeof chakra.label>, Omitted> &
  ThemingProps

export const Switch = React.forwardRef(function Switch(
  props: SwitchProps,
  ref: React.Ref<any>,
) {
  const styles = useMultiStyleConfig("Switch", props)
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
        lineHeight: "normal",
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
          ...styles.track,
        }}
      >
        <chakra.div
          __css={styles.thumb}
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
