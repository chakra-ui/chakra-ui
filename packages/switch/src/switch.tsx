import { UseCheckboxProps, useCheckbox } from "@chakra-ui/checkbox"
import { chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import * as React from "react"
import { __DEV__, cx, dataAttr } from "@chakra-ui/utils"

const StyledSwitch = chakra("label", {
  baseStyle: {
    display: "inline-block",
    verticalAlign: "middle",
  },
})

/**
 * Switch Track - Theming
 *
 * To style the switch track globally, change the styles in
 * `theme.components.Switch` under the `Track` key
 */
const StyledTrack = chakra("div", {
  themeKey: "Switch.Track",
  baseStyle: {
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "flex-start",
    boxSizing: "content-box",
    cursor: "pointer",
  },
})

/**
 * Switch Thumb - Theming
 *
 * To style the element, change the styles in
 * `theme.components.Switch` under the `Thumb` key
 */
const StyledThumb = chakra("div", {
  themeKey: "Switch.Thumb",
})

type Omitted = "onChange" | "defaultChecked" | "checked"

export type SwitchProps = Omit<UseCheckboxProps, "isIndeterminate"> &
  Omit<PropsOf<typeof StyledSwitch>, Omitted>

export const Switch = forwardRef<SwitchProps, "input", Omitted>(function Switch(
  props,
  ref,
) {
  const { colorScheme, size, variant, className, ...rest } = props
  const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
    rest,
  )

  const theming = { colorScheme, size, variant }
  const input = getInputProps({ ref })
  const checkbox = getCheckboxProps() as any

  return (
    <StyledSwitch className={cx("chakra-switch", className)} {...htmlProps}>
      <input className="chakra-switch__input" {...input} />
      <StyledTrack className="chakra-switch__track" {...theming} {...checkbox}>
        <StyledThumb
          {...theming}
          className="chakra-switch__thumb"
          data-checked={dataAttr(state.isChecked)}
          data-hover={dataAttr(state.isHovered)}
        />
      </StyledTrack>
    </StyledSwitch>
  )
})

if (__DEV__) {
  Switch.displayName = "Switch"
}
