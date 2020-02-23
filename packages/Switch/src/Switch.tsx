import React from "react"
import { useCheckbox, CheckboxHookProps } from "@chakra-ui/checkbox"
import { useMergeRefs } from "@chakra-ui/hooks"
import { createChakra, PropsOf } from "@chakra-ui/system"

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
    const input = getInputProps()
    const checkbox = getCheckboxProps()
    const ownRef = useMergeRefs(ref, input.ref)

    return (
      <SwitchRoot data-chakra-switch="" {...htmlProps}>
        <input
          data-chakra-switch-input=""
          {...input}
          ref={ownRef}
          role="switch"
        />
        <SwitchTrack
          variantColor={variantColor}
          variantSize={variantSize}
          data-chakra-switch-track=""
          {...checkbox}
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
