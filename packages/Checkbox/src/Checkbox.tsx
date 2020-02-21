import { createChakra, PropsOf, SystemProps, chakra } from "@chakra-ui/system"
import { Omit } from "@chakra-ui/utils"
import * as React from "react"
import { CheckboxHookProps, useCheckbox } from "./Checkbox.hook"
import { CheckIcon, MinusIcon } from "./Checkbox.icon"
import { IconProps } from "@chakra-ui/icon"

const ControlBox = createChakra("span", { themeKey: "Checkbox" })

type OmittedCheckboxProps = Omit<
  PropsOf<typeof ControlBox>,
  "onChange" | "defaultChecked"
>

type CustomCheckboxProps = OmittedCheckboxProps &
  Omit<PropsOf<"input">, "size"> &
  CheckboxHookProps & {
    iconColor?: IconProps["color"]
    iconSize?: IconProps["size"]
  }

function CheckboxIcon({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & {
  isChecked?: boolean
  isIndeterminate?: boolean
}) {
  if (isChecked) return <CheckIcon {...props} />
  if (isIndeterminate) return <MinusIcon {...props} />
  return null
}

export const Checkbox = React.forwardRef(
  (props: CustomCheckboxProps, ref: React.Ref<HTMLInputElement>) => {
    const { state, input, checkbox, htmlProps } = useCheckbox(props)

    const { iconSize = 3, iconColor } = props

    const iconProps = {
      size: iconSize,
      color: iconColor,
      transition: "transform 240ms, opacity 240ms",
    }

    return (
      <label>
        <input {...input} ref={ref} />
        <ControlBox
          variantSize="lg"
          variantColor="blue"
          verticalAlign="top"
          {...checkbox}
          {...htmlProps}
        >
          <CheckboxIcon
            isChecked={state.isChecked}
            isIndeterminate={state.isIndeterminate}
            {...iconProps}
          />
        </ControlBox>
        {props.children && (
          <chakra.div
            ml={2}
            fontSize={props.variantSize}
            userSelect="none"
            opacity={props.isDisabled ? 0.4 : 1}
          >
            {props.children}
          </chakra.div>
        )}
      </label>
    )
  },
)
