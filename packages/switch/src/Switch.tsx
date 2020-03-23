import { CheckboxHookProps, useCheckbox } from "@chakra-ui/checkbox"
import { chakra, PropsOf } from "@chakra-ui/system"
import React from "react"

const StyledSwitch = chakra("label", {
  baseStyle: {
    display: "inline-block",
    verticalAlign: "middle",
  },
})

const StyledTrack = chakra("div", { themeKey: "Switch.Track" })

const StyledThumb = chakra("div", { themeKey: "Switch.Thumb" })

export type SwitchProps = Omit<CheckboxHookProps, "isIndeterminate"> &
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
