import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  forwardRef,
  layoutPropNames,
  omitThemingProps,
  PropsOf,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx, mergeWith, split, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface SelectFieldProps
  extends Omit<PropsOf<typeof chakra.select>, Omitted> {
  size?: string
  isDisabled?: boolean
}

export const SelectField = forwardRef<SelectFieldProps, "select">(
  function SelectField(props, ref) {
    const { children, placeholder, className, ...rest } = props
    const ownProps = useFormControl<HTMLSelectElement>(rest)

    return (
      <chakra.select
        {...ownProps}
        ref={ref}
        className={cx("chakra-select", className)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </chakra.select>
    )
  },
)

if (__DEV__) {
  SelectField.displayName = "SelectField"
}

interface RootProps extends Omit<PropsOf<typeof chakra.div>, "color"> {}

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
  /**
   * The size (width and height) of the icon
   */
  iconSize?: string
  /**
   * The color of the icon
   */
  iconColor?: string
}

export interface SelectProps
  extends SelectFieldProps,
    ThemingProps,
    SelectOptions {
  /**
   * Props to forward to the root `div` element
   */
  rootProps?: RootProps
  /**
   * The icon element to use in the select
   */
  icon?: React.ReactElement<any>
}

/**
 * React component used to select one item from a list of options.
 */
export const Select = forwardRef<SelectProps, "select">(function Select(
  props,
  ref,
) {
  const styles = useMultiStyleConfig("Select", props)

  const {
    rootProps,
    placeholder,
    icon,
    color,
    height,
    h,
    minH,
    minHeight,
    iconColor,
    iconSize,
    ...rest
  } = omitThemingProps(props)

  const [layoutProps, otherProps] = split(rest, layoutPropNames as any[])

  const rootStyles: SystemStyleObject = {
    width: "100%",
    height: "fit-content",
    position: "relative",
    color,
  }

  const fieldStyles: SystemStyleObject = mergeWith({}, styles.field, {
    pr: "2rem",
    _focus: { zIndex: "unset" },
  })

  return (
    <chakra.div
      className="chakra-select__wrapper"
      __css={rootStyles}
      {...layoutProps}
      {...rootProps}
    >
      <SelectField
        ref={ref}
        height={h ?? height}
        minH={minH ?? minHeight}
        placeholder={placeholder}
        {...otherProps}
        __css={fieldStyles}
      >
        {props.children}
      </SelectField>

      <SelectIcon
        data-disabled={props.isDisabled}
        color={iconColor || color}
        __css={styles.icon}
        {...(iconSize && { fontSize: iconSize })}
      >
        {icon}
      </SelectIcon>
    </chakra.div>
  )
})

if (__DEV__) {
  Select.displayName = "Select"
}

export const DefaultIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </svg>
)

const IconWrapper = chakra("div", {
  baseStyle: {
    position: "absolute",
    display: "inline-flex",
    width: "1.5rem",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: "0.5rem",
    pointerEvents: "none",
    top: "50%",
    transform: "translateY(-50%)",
  },
})

type SelectIconProps = PropsOf<typeof IconWrapper>

const SelectIcon: React.FC<SelectIconProps> = (props) => {
  const { children = <DefaultIcon />, ...rest } = props

  const clone = React.cloneElement(children as any, {
    role: "presentation",
    className: "chakra-select__icon",
    focusable: false,
    "aria-hidden": true,
    // force icon to adhere to `IconWrapper` styles
    style: {
      width: "1em",
      height: "1em",
      color: "currentColor",
    },
  })

  return (
    <IconWrapper {...rest} className="chakra-select__icon-wrapper">
      {React.isValidElement(children) ? clone : null}
    </IconWrapper>
  )
}

if (__DEV__) {
  SelectIcon.displayName = "SelectIcon"
}
