import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx, Omit, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useCheckboxGroupContext } from "./checkbox-group"
import { CheckboxIcon } from "./checkbox.icon"
import { useCheckbox, UseCheckboxProps } from "./use-checkbox"

const StyledControl = chakra("div", {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0,
  },
})

const StyledContainer = chakra("label", {
  baseStyle: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative",
  },
})

type Omitted = "size" | "checked" | "defaultChecked" | "onChange"

type StyledControlProps = Omit<PropsOf<typeof StyledControl>, Omitted>

export type CheckboxProps = StyledControlProps &
  Omit<PropsOf<"input">, Omitted> &
  ThemingProps &
  UseCheckboxProps & {
    /**
     * The spacing between the checkbox and it's label text
     * @default 0.5rem
     */
    spacing?: SystemProps["marginLeft"]
  }

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 * @see Docs https://chakra-ui.com/components/checkbox
 */
export const Checkbox = forwardRef<CheckboxProps>(function Checkbox(
  props,
  ref,
) {
  const group = useCheckboxGroupContext()

  const merged = { ...group, ...props }
  const styles = useMultiStyleConfig("Checkbox", merged)
  const realProps = omitThemingProps(merged)

  const { spacing = "0.5rem", className, children, ...otherProps } = realProps

  let isChecked = realProps.isChecked
  if (group?.value && realProps.value) {
    isChecked = group.value.includes(realProps.value)
  }

  let onChange = realProps.onChange
  if (group?.onChange && realProps.value) {
    onChange = group.onChange
  }

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps,
  } = useCheckbox({
    ...otherProps,
    isChecked,
    onChange,
  })

  const _className = cx("chakra-checkbox", className)

  const inputProps = getInputProps({}, ref)
  const labelProps = getLabelProps()
  const checkboxProps = getCheckboxProps()

  return (
    <StyledContainer
      __css={styles.container}
      className={_className}
      {...htmlProps}
    >
      <input className="chakra-checkbox__input" {...inputProps} />
      <StyledControl
        __css={styles.control}
        className="chakra-checkbox__control"
        {...checkboxProps}
      >
        <CheckboxIcon
          __css={styles.icon}
          className="chakra-checkbox__icon"
          isChecked={state.isChecked}
          isIndeterminate={state.isIndeterminate}
        />
      </StyledControl>
      {children && (
        <chakra.div
          className="chakra-checkbox__label"
          {...labelProps}
          children={children}
          __css={{
            ml: spacing,
            ...styles.label,
          }}
        />
      )}
    </StyledContainer>
  )
})

if (__DEV__) {
  Checkbox.displayName = "Checkbox"
}
