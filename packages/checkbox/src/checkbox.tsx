import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { callAll, cx, Omit, __DEV__, dataAttr } from "@chakra-ui/utils"
import * as React from "react"
import { useCheckboxGroupContext } from "./checkbox-group"
import { CheckboxIcon } from "./checkbox-icon"
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

type StyledControlProps = Omit<HTMLChakraProps<"div">, Omitted>

type BaseInputProps = Pick<
  PropsOf<"input">,
  "onBlur" | "checked" | "defaultChecked"
>

export interface CheckboxProps
  extends StyledControlProps,
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
}

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 * @see Docs https://chakra-ui.com/docs/form/checkbox
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
    icon: Icon = <CheckboxIcon />,
    isChecked: isCheckedProp,
    onChange: onChangeProp,
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

  const iconStyles: SystemStyleObject = {
    opacity: state.isChecked || state.isIndeterminate ? 1 : 0,
    transform:
      state.isChecked || state.isIndeterminate ? "scale(1)" : "scale(0.95)",
    transition: "transform 200ms",
    fontSize: iconSize,
    color: iconColor,
    ...styles.icon,
  }

  const clonedIcon = React.cloneElement(Icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked,
  })

  return (
    <StyledContainer
      __css={styles.container}
      data-disabled={dataAttr(state.isDisabled)}
      className={_className}
      {...htmlProps}
    >
      <input className="chakra-checkbox__input" {...inputProps} />
      <StyledControl
        __css={styles.control}
        className="chakra-checkbox__control"
        {...checkboxProps}
      >
        {clonedIcon}
      </StyledControl>
      {children && (
        <chakra.div
          className="chakra-checkbox__label"
          {...labelProps}
          __css={{
            marginStart: spacing,
            ...styles.label,
          }}
        >
          {children}
        </chakra.div>
      )}
    </StyledContainer>
  )
})

if (__DEV__) {
  Checkbox.displayName = "Checkbox"
}
