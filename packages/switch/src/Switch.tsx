import { CheckboxHookProps, useCheckbox } from "@chakra-ui/checkbox"
import { createChakra, PropsOf } from "@chakra-ui/system"
import React from "react"

const SwitchRoot = createChakra("label", {
  baseStyle: {
    display: "inline-block",
    verticalAlign: "middle",
  },
})
const SwitchTrack = createChakra("div", { themeKey: "Switch.Track" })
const SwitchThumb = createChakra("div", { themeKey: "Switch.Thumb" })

export type SwitchProps = CheckboxHookProps &
  Omit<PropsOf<typeof SwitchRoot>, "onChange">

export const Switch = React.forwardRef(
  (props: SwitchProps, ref: React.Ref<HTMLInputElement>) => {
    const { variantColor, variantSize } = props
    const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
      props,
    )

    return (
      <SwitchRoot data-chakra-switch="" {...htmlProps}>
        <input data-chakra-switch-input="" {...getInputProps({ ref })} />
        <SwitchTrack
          variantColor={variantColor}
          variantSize={variantSize}
          data-chakra-switch-track=""
          {...(getCheckboxProps() as any)}
        >
          <SwitchThumb
            variantSize={variantSize}
            data-chakra-switch-thumb=""
            data-checked={state.isChecked ? "" : undefined}
            data-hover={state.isHovered ? "" : undefined}
          />
        </SwitchTrack>
      </SwitchRoot>
    )
  },
)

export default Switch
