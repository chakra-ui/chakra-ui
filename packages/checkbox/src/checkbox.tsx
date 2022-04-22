import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  PropsOf,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { callAll, cx, Omit, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useCheckboxGroupContext } from "./checkbox-group"
import { CheckboxIcon } from "./checkbox-icon"
import { useCheckbox, UseCheckboxProps } from "./use-checkbox"

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

const Label = chakra("label", {
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
    UseCheckboxProps {
  /**
   * The spacing between the checkbox and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: SystemProps["marginLeft"]
  /**
   * The color of the checkbox icon when checked or indeterminate
   */
  iconColor?: string
  /**
   * The size of the checkbox icon when checked or indeterminate
   */
  iconSize?: string | number
  /**
   * The checked icon to use
   *
   * @type React.ReactElement
   * @default CheckboxIcon
   */
  icon?: React.ReactElement
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 * @see Docs https://chakra-ui.com/checkbox
 */
export const Checkbox = forwardRef<CheckboxProps, "input">((props, ref) => {
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

  const iconStyles: SystemStyleObject = React.useMemo(
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

  const clonedIcon = React.cloneElement(icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked,
  })

  return (
    <Label
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
    </Label>
  )
})

if (__DEV__) {
  Checkbox.displayName = "Checkbox"
}
