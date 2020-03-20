import { CheckboxHookProps, useCheckbox } from "@chakra-ui/checkbox"
import { createChakra, PropsOf } from "@chakra-ui/system"
import React from "react"

const StyledRoot = createChakra("label", {
  baseStyle: {
    display: "inline-block",
    verticalAlign: "middle",
  },
})

const StyledTrack = createChakra("div", { themeKey: "Switch.Track" })

const StyledThumb = createChakra("div", { themeKey: "Switch.Thumb" })

export type SwitchProps = Omit<CheckboxHookProps, "isIndeterminate"> &
  Omit<PropsOf<typeof StyledRoot>, "onChange" | "defaultChecked">

export const Switch = React.forwardRef(
  (props: SwitchProps, ref: React.Ref<HTMLInputElement>) => {
    const { variantColor, variantSize, variant } = props
    const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
      props,
    )

    const themingProps = { variantColor, variantSize, variant }

    return (
      <StyledRoot data-chakra-switch="" {...htmlProps}>
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
      </StyledRoot>
    )
  },
)
