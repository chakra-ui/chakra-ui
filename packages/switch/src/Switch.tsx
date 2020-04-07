import { UseCheckboxProps, useCheckbox } from "@chakra-ui/checkbox"
import { chakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"

/**
 * StyledSwitch
 *
 * Wrapper element around the Switch component
 */
const StyledSwitch = chakra("label", {
  baseStyle: {
    display: "inline-block",
    verticalAlign: "middle",
  },
})

/**
 * Switch Track
 *
 * Element for the Switch track
 *
 * To style the element, change the styles in
 * `theme.components.Switch` under the `Track` key
 */

const StyledTrack = chakra("div", { themeKey: "Switch.Track" })

/**
 * Switch Thumb
 *
 * Element for the Switch thumb
 *
 * To style the element, change the styles in
 * `theme.components.Switch` under the `Thumb` key
 */

const StyledThumb = chakra("div", { themeKey: "Switch.Thumb" })

export type SwitchProps = Omit<UseCheckboxProps, "isIndeterminate"> &
  Omit<PropsOf<typeof StyledSwitch>, "onChange" | "defaultChecked">

export const Switch = React.forwardRef(
  (props: SwitchProps, ref: React.Ref<HTMLInputElement>) => {
    const { colorScheme, size, variant } = props
    const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
      props,
    )

    const themingProps = { colorScheme, size, variant }

    return (
      <StyledSwitch data-chakra-switch="" {...htmlProps}>
        <input data-chakra-switch-input="" {...getInputProps({ ref })} />
        <StyledTrack
          {...themingProps}
          data-chakra-switch-track=""
          {...(getCheckboxProps() as any)}
        >
          <StyledThumb
            {...themingProps}
            data-chakra-switch-thumb=""
            data-checked={state.isChecked ? "" : undefined}
            data-hover={state.isHovered ? "" : undefined}
          />
        </StyledTrack>
      </StyledSwitch>
    )
  },
)

if (__DEV__) {
  Switch.displayName = "Switch"
}
