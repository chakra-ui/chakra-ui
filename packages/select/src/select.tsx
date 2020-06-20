import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  layoutPropNames,
  PropsOf,
  useComponentStyle,
  useCss,
} from "@chakra-ui/system"
import { cx, split, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

interface SelectOptions extends FormControlOptions {
  /**
   * The border color when the select is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the select is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /**
   * If `true`, the select element will span the full width of it's parent
   */
  isFullWidth?: boolean
  /**
   * The placeholder for the select. We render an `<option/>` element that has
   * empty value.
   *
   * ```jsx
   * <option value="">{placeholder}</option>
   * ```
   */
  placeholder?: string
}

const StyledSelect = chakra<"select", SelectOptions>("select", {
  themeKey: "Select",
  baseStyle: {
    appearance: "none",
    width: "100%",
    paddingBottom: "1px",
    paddingRight: "2rem",
  },
  shouldForwardProp: (prop) =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

type Omitted = "disabled" | "required" | "readOnly" | "size"

export type SelectFieldProps = Omit<PropsOf<typeof StyledSelect>, Omitted> & {
  size?: string
}

/**
 * The native `select` element enhanced for accessibility and validation.
 */
export const SelectField = React.forwardRef(function SelectField(
  props: SelectFieldProps,
  ref: React.Ref<any>,
) {
  const { children, placeholder, ...rest } = props
  const fieldProps = useFormControl<HTMLSelectElement>(props)

  return (
    <StyledSelect
      ref={ref}
      {...(rest as any)}
      {...fieldProps}
      className={cx("chakra-select", props.className)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </StyledSelect>
  )
})

if (__DEV__) {
  SelectField.displayName = "SelectField"
}

type RootProps = Omit<PropsOf<typeof chakra.div>, "color">

export interface SelectProps extends SelectFieldProps {
  /**
   * Props to forward to the root `div` element
   */
  rootProps?: RootProps
  /**
   * The icon element to use in the select
   */
  icon?: React.ReactElement<any>
  /**
   * The size of the select dropdown icon
   */
  iconSize?: any
  /**
   * The color of the select dropdown icon
   */
  iconColor?: string
}

/**
 * React component used to select one item from a list of options.
 */
export const Select = React.forwardRef(function Select(
  props: SelectProps,
  ref: React.Ref<any>,
) {
  const {
    rootProps,
    placeholder,
    icon,
    iconSize = "1.25rem",
    iconColor,
    color,
    isFullWidth,
    ...rest
  } = props

  const opacity = props.isDisabled ? 0.5 : undefined
  const [layoutProps, otherProps] = split(rest, layoutPropNames as any[])
  const styles = useComponentStyle({ themeKey: "Select", ...props })

  return (
    <chakra.div
      position="relative"
      width={isFullWidth ? "100%" : "auto"}
      color={color}
      className="chakra-select__wrapper"
      {...layoutProps}
      {...rootProps}
    >
      <SelectField ref={ref} placeholder={placeholder} {...otherProps}>
        {props.children}
      </SelectField>

      <SelectIcon
        opacity={opacity}
        iconSize={iconSize}
        iconColor={iconColor || styles?.color}
        children={icon}
      />
    </chakra.div>
  )
})

if (__DEV__) {
  Select.displayName = "Select"
}

export const DefaultIcon = (props: PropsOf<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    {...props}
    className={cx("chakra-select__icon", props.className)}
  >
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </svg>
)

const SelectIconWrapper = chakra("div", {
  baseStyle: {
    position: "absolute",
    display: "inline-flex",
    width: "1.5rem",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: "0.5rem",
    pointerEvents: "none",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
  },
})

type SelectIconProps = PropsOf<typeof SelectIconWrapper> & {
  iconColor?: string
  iconSize?: string | number
}

function SelectIcon(props: SelectIconProps) {
  const {
    children = <DefaultIcon />,
    iconColor = "inherit",
    iconSize,
    ...rest
  } = props

  const style = useCss({
    color: iconColor,
    width: iconSize,
    height: iconSize,
    fontSize: "1em",
  })

  const clone = React.cloneElement(children as any, {
    role: "presentation",
    focusable: false,
    "aria-hidden": true,
    style,
  })

  return (
    <SelectIconWrapper
      {...rest}
      className={"chakra-select__icon-wrapper"}
      children={clone}
    />
  )
}

if (__DEV__) {
  SelectIcon.displayName = "SelectIcon"
}
