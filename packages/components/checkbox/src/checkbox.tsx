import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  PropsOf,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { callAll, cx } from "@chakra-ui/shared-utils"
import { cloneElement, useMemo } from "react"
import { useCheckboxGroupContext } from "./checkbox-context"
import { CheckboxIcon } from "./checkbox-icon"
import { CheckboxOptions, UseCheckboxProps } from "./checkbox-types"
import { useCheckbox } from "./use-checkbox"

const CheckboxControl = chakra("span", {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0,
  },
})

const CheckboxRoot = chakra("label", {
  baseStyle: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative",
  },
})

type CheckboxControlProps = Omit<HTMLChakraProps<"div">, keyof UseCheckboxProps>

type BaseInputProps = Pick<
  PropsOf<"input">,
  "onBlur" | "checked" | "defaultChecked"
>

export interface CheckboxProps
  extends CheckboxControlProps,
    BaseInputProps,
    ThemingProps<"Checkbox">,
    UseCheckboxProps,
    CheckboxOptions {}

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 * @see Docs https://chakra-ui.com/checkbox
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 */
export const Checkbox = forwardRef<CheckboxProps, "input">(function Checkbox(
  props,
  ref,
) {
  const group = useCheckboxGroupContext()

  const mergedProps = { ...group, ...props } as CheckboxProps
  const styles = useMultiStyleConfig("Checkbox", mergedProps)

  const ownProps = omitThemingProps(props)

  const {
    spacing = "0.5rem",
    className,
    children,
    iconColor,
    iconSize,
    icon = <CheckboxIcon />,
    isChecked: isCheckedProp,
    isDisabled = group?.isDisabled,
    onChange: onChangeProp,
    inputProps,
    ...rest
  } = ownProps

  let isChecked = isCheckedProp
  if (group?.value && ownProps.value) {
    isChecked = group.value.includes(ownProps.value)
  }

  let onChange = onChangeProp
  if (group?.onChange && ownProps.value) {
    onChange = callAll(group.onChange, onChangeProp)
  }

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    getRootProps,
  } = useCheckbox({
    ...rest,
    isDisabled,
    isChecked,
    onChange,
  })

  const iconStyles: SystemStyleObject = useMemo(
    () => ({
      opacity: state.isChecked || state.isIndeterminate ? 1 : 0,
      transform:
        state.isChecked || state.isIndeterminate ? "scale(1)" : "scale(0.95)",
      fontSize: iconSize,
      color: iconColor,
      ...styles.icon,
    }),
    [iconColor, iconSize, state.isChecked, state.isIndeterminate, styles.icon],
  )

  const clonedIcon = cloneElement(icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked,
  })

  return (
    <CheckboxRoot
      __css={styles.container}
      className={cx("chakra-checkbox", className)}
      {...getRootProps()}
    >
      <input
        className="chakra-checkbox__input"
        {...getInputProps(inputProps, ref)}
      />
      <CheckboxControl
        __css={styles.control}
        className="chakra-checkbox__control"
        {...getCheckboxProps()}
      >
        {clonedIcon}
      </CheckboxControl>
      {children && (
        <chakra.span
          className="chakra-checkbox__label"
          {...getLabelProps()}
          __css={{
            marginStart: spacing,
            ...styles.label,
          }}
        >
          {children}
        </chakra.span>
      )}
    </CheckboxRoot>
  )
})

Checkbox.displayName = "Checkbox"
