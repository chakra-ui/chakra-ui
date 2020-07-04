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
    transition: "transform 240ms, opacity 240ms",
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

type BaseControlProps = Omit<
  PropsOf<typeof StyledControl>,
  "onChange" | "defaultChecked"
>

type Omitted = "size" | "checked" | "defaultChecked"

export type CheckboxProps = BaseControlProps &
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
      __css={styles.Container}
      className={_className}
      {...htmlProps}
    >
      <input className="chakra-checkbox__input" {...getInputProps({ ref })} />
      <StyledControl
        __css={styles.Control}
        className="chakra-checkbox__control"
        {...getCheckboxProps()}
      >
        <CheckboxIcon
          __css={styles.Icon}
          className="chakra-checkbox__icon"
          isChecked={state.isChecked}
          isIndeterminate={state.isIndeterminate}
        />
      </StyledControl>
      {children && (
        <chakra.div
          __css={styles.Label}
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
