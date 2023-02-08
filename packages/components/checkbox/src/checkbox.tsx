import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  keyframes,
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

const controlStyles: SystemStyleObject = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "top",
  userSelect: "none",
  flexShrink: 0,
}

const rootStyles: SystemStyleObject = {
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "top",
  position: "relative",
}

const checkAnim = keyframes({
  from: {
    opacity: 0,
    strokeDashoffset: 16,
    transform: "scale(0.95)",
  },
  to: {
    opacity: 1,
    strokeDashoffset: 0,
    transform: "scale(1)",
  },
})

const indeterminateOpacityAnim = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})
const indeterminateScaleAnim = keyframes({
  from: {
    transform: "scaleX(0.65)",
  },
  to: {
    transform: "scaleX(1)",
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
      animation: state.isIndeterminate
        ? `${indeterminateOpacityAnim} 20ms linear, ${indeterminateScaleAnim} 200ms linear`
        : `${checkAnim} 200ms linear`,
      fontSize: iconSize,
      color: iconColor,
      ...styles.icon,
    }),
    [iconColor, iconSize, state.isIndeterminate, styles.icon],
  )

  const clonedIcon = cloneElement(icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked,
  })

  return (
    <chakra.label
      __css={{ ...rootStyles, ...styles.container }}
      className={cx("chakra-checkbox", className)}
      {...getRootProps()}
    >
      <input
        className="chakra-checkbox__input"
        {...getInputProps(inputProps, ref)}
      />
      <chakra.span
        __css={{ ...controlStyles, ...styles.control }}
        className="chakra-checkbox__control"
        {...getCheckboxProps()}
      >
        {clonedIcon}
      </chakra.span>
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
    </chakra.label>
  )
})

Checkbox.displayName = "Checkbox"
