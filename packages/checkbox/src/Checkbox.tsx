import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { Omit } from "@chakra-ui/utils"
import * as React from "react"
import { CheckboxHookProps, useCheckbox } from "./Checkbox.hook"
import { CheckboxIcon } from "./Checkbox.icon"
import { IconProps } from "@chakra-ui/icon"

const ControlBox = chakra("span", { themeKey: "Checkbox" })

type OmittedCheckboxProps = Omit<
  PropsOf<typeof ControlBox>,
  "onChange" | "defaultChecked"
>

type CustomCheckboxProps = OmittedCheckboxProps &
  Omit<PropsOf<"input">, "size"> &
  CheckboxHookProps & {
    /**
     * The color of the check icon
     */
    iconColor?: IconProps["color"]
    /**
     * The size of the check icon
     * @default 0.75rem
     */
    iconSize?: IconProps["size"]
    /**
     * The spacing between the checkbox and it's label text
     * @default 0.5rem
     */
    labelSpacing?: SystemProps["marginLeft"]
  }

export const Checkbox = React.forwardRef(
  (props: CustomCheckboxProps, ref: React.Ref<HTMLInputElement>) => {
    const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
      props,
    )

    const {
      iconSize = "0.75rem",
      iconColor,
      labelSpacing = "0.5rem",
      variant,
      colorScheme = "blue",
      size = "lg",
    } = props

    return (
      <chakra.label data-chakra-checkbox="" {...htmlProps}>
        <input data-chakra-checkbox-input="" {...getInputProps({ ref })} />
        <ControlBox
          data-chakra-checkbox-control=""
          variant={variant}
          size={size}
          colorScheme={colorScheme}
          verticalAlign="top"
          {...getCheckboxProps()}
        >
          <CheckboxIcon
            data-chakra-checkbox-icon=""
            isChecked={state.isChecked}
            isIndeterminate={state.isIndeterminate}
            size={iconSize}
            color={iconColor}
            transition="transform 240ms, opacity 240ms"
          />
        </ControlBox>
        {props.children && (
          <chakra.div
            data-chakra-checkbox-label=""
            marginLeft={labelSpacing}
            fontSize={props.size}
            userSelect="none"
            opacity={props.isDisabled ? 0.4 : 1}
          >
            {props.children}
          </chakra.div>
        )}
      </chakra.label>
    )
  },
)
