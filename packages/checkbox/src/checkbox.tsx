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
    _disabled: {
      cursor: "not-allowed",
    },
  },
})

type Omitted =
  | "size"
  | "checked"
  | "defaultChecked"
  | "onChange"
  | "onBlur"
  | "value"

type StyledControlProps = Omit<PropsOf<typeof StyledControl>, Omitted>

type BaseCheckboxProps = Pick<
  PropsOf<"input">,
  "onBlur" | "checked" | "defaultChecked"
>

export interface CheckboxProps
  extends StyledControlProps,
    BaseCheckboxProps,
    ThemingProps,
    UseCheckboxProps {
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
export const Checkbox = forwardRef<CheckboxProps, "input">(function Checkbox(
  props,
  ref,
) {
  const group = useCheckboxGroupContext()

  const mergedProps = { ...group, ...props } as CheckboxProps
  const styles = useMultiStyleConfig("Checkbox", mergedProps)

  const ownProps = omitThemingProps(mergedProps)
  const { spacing = "0.5rem", className, children, ...rest } = ownProps

  let isChecked = ownProps.isChecked
  if (group?.value && ownProps.value) {
    isChecked = group.value.includes(ownProps.value)
  }

  let onChange = ownProps.onChange
  if (group?.onChange && ownProps.value) {
    onChange = group.onChange
  }

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    htmlProps,
  } = useCheckbox({
    ...rest,
    isChecked,
    onChange,
  })

  const _className = cx("chakra-checkbox", className)

  const inputProps = getInputProps({}, ref)
  const labelProps = getLabelProps()
  const checkboxProps = getCheckboxProps()

  const iconStyles = {
    opacity: state.isChecked || state.isIndeterminate ? 1 : 0,
    transform:
      state.isChecked || state.isIndeterminate ? "scale(1)" : "scale(0.95)",
    transition: "transform 200ms",
    ...styles.icon,
  }

  return (
    <StyledContainer
      __css={styles.container}
      data-disabled={state.isDisabled}
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
          __css={iconStyles}
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
