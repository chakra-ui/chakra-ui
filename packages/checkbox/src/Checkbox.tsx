import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { Omit, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { UseCheckboxProps, useCheckbox } from "./Checkbox.hook"
import { CheckboxIcon } from "./Checkbox.icon"
import { IconProps } from "@chakra-ui/icon"

/**
 * Checkbox - Theming
 *
 * To style the checkbox globally, change the styles in
 * `theme.components.Checkbox`
 */
const StyledCheckbox = chakra("span", {
  themeKey: "Checkbox",
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0,
    transition: "transform 240ms, opacity 240ms",
  },
})

type Omitted = Omit<
  PropsOf<typeof StyledCheckbox>,
  "onChange" | "defaultChecked"
>

export type CheckboxProps = Omitted &
  Omit<PropsOf<"input">, "size"> &
  UseCheckboxProps & {
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

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 * @see Docs https://chakra-ui.com/checkbox
 */
export const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref: React.Ref<HTMLInputElement>) => {
    const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
      props,
    )

    const {
      iconSize = "0.75rem",
      labelSpacing = "0.5rem",
      iconColor,
      variant,
      colorScheme,
      size,
    } = props

    /**
     * Prevent the `input` onBlur being fired when you mousedown on the checkbox label
     */
    const stop = (event: React.SyntheticEvent) => {
      event.preventDefault()
      event.stopPropagation()
    }

    return (
      <chakra.label
        cursor="pointer"
        display="inline-flex"
        alignItems="center"
        verticalAlign="top"
        data-chakra-checkbox=""
        {...htmlProps}
      >
        <chakra.div position="relative">
          <input data-chakra-checkbox-input="" {...getInputProps({ ref })} />
        </chakra.div>
        <StyledCheckbox
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
          />
        </StyledCheckbox>
        {props.children && (
          <chakra.div
            data-chakra-checkbox-label=""
            marginLeft={labelSpacing}
            fontSize={props.size}
            userSelect="none"
            onMouseDown={stop}
            onTouchStart={stop}
            opacity={props.isDisabled ? 0.4 : 1}
          >
            {props.children}
          </chakra.div>
        )}
      </chakra.label>
    )
  },
)

if (__DEV__) {
  Checkbox.displayName = "Checkbox"
}
