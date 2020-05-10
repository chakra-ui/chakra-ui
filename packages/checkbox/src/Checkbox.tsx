import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { Omit, __DEV__, cx, dataAttr } from "@chakra-ui/utils"
import * as React from "react"
import { UseCheckboxProps, useCheckbox } from "./Checkbox.hook"
import { CheckboxIcon } from "./Checkbox.icon"
import { IconProps } from "@chakra-ui/icon"
import { useCheckboxGroupContext } from "./CheckboxGroup"

/**
 * Checkbox - Theming
 *
 * To style the checkbox globally, change the styles in
 * `theme.components.Checkbox` under the `Control` key
 */
const StyledControl = chakra("div", {
  themeKey: "Checkbox.Control",
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

const StyledLabel = chakra("div", {
  themeKey: "Checkbox.Label",
})

const StyledWrapper = chakra("label", {
  baseStyle: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative",
  },
})

type Omitted = Omit<
  PropsOf<typeof StyledControl>,
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
    const group = useCheckboxGroupContext()

    const {
      iconSize = "0.625rem",
      labelSpacing = "0.5rem",
      iconColor,
      variant = group?.variant,
      colorScheme = group?.colorScheme,
      size = group?.size,
      className,
      children,
      ...checkboxProps
    } = props

    let isChecked = props.isChecked
    if (group?.value && props.value) {
      isChecked = group.value.includes(props.value)
    }

    let onChange = props.onChange
    if (group?.onChange && props.value) {
      onChange = group.onChange
    }

    const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox({
      ...checkboxProps,
      isChecked,
      onChange,
    })

    /**
     * Prevent the `input` onBlur being fired when you mousedown on the checkbox label
     */
    const stop = (event: React.SyntheticEvent) => {
      event.preventDefault()
      event.stopPropagation()
    }

    const _className = cx("chakra-checkbox", className)

    const theming = { variant, size, colorScheme }

    return (
      <StyledWrapper {...htmlProps} className={_className}>
        <input className="chakra-checkbox__input" {...getInputProps({ ref })} />
        <StyledControl
          className="chakra-checkbox__control"
          {...theming}
          verticalAlign="top"
          {...getCheckboxProps()}
        >
          <CheckboxIcon
            className="chakra-checkbox__icon"
            transition="transform 240ms, opacity 240ms"
            isChecked={state.isChecked}
            isIndeterminate={state.isIndeterminate}
            boxSize={iconSize}
            color={iconColor}
          />
        </StyledControl>
        {children && (
          <StyledLabel
            className="chakra-checkbox__label"
            {...theming}
            marginLeft={labelSpacing}
            userSelect="none"
            onMouseDown={stop}
            onTouchStart={stop}
            data-disabled={dataAttr(state.isDisabled)}
            data-checked={dataAttr(state.isChecked)}
            data-invalid={dataAttr(state.isInvalid)}
            children={children}
          />
        )}
      </StyledWrapper>
    )
  },
)

if (__DEV__) {
  Checkbox.displayName = "Checkbox"
}
