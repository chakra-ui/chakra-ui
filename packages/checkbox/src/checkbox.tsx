import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  SystemProps,
  ThemingProps,
  useStyleConfig,
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
  const styles = useStyleConfig("Checkbox", { ...group, ...props })
  const realProps = omitThemingProps({ ...group, ...props })

  const { spacing = "0.5rem", className, children, ...rest } = realProps

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
    ...rest,
    isChecked,
    onChange,
  })

  const _className = cx("chakra-checkbox", className)

  return (
    <StyledContainer
      __css={styles.container}
      className={_className}
      {...htmlProps}
    >
      <input className="chakra-checkbox__input" {...getInputProps({ ref })} />
      <StyledControl
        __css={styles.control}
        className="chakra-checkbox__control"
        {...getCheckboxProps()}
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
          __css={styles.label}
          className="chakra-checkbox__label"
          ml={spacing}
          {...getLabelProps()}
          children={children}
        />
      )}
    </StyledContainer>
  )
})

if (__DEV__) {
  Checkbox.displayName = "Checkbox"
}
