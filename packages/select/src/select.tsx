import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  layoutPropNames,
  omitThemingProps,
  GetProps,
  useMultiStyleConfig,
  ThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import { cx, split, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface SelectFieldProps
  extends Omit<GetProps<typeof chakra.select>, Omitted> {
  size?: string
  isDisabled?: boolean
}

export const SelectField = forwardRef<SelectFieldProps, "select">(
  function SelectField(props, ref) {
    const { children, placeholder, className, isDisabled, ...rest } = props
    const select = useFormControl<HTMLSelectElement>(rest)

    return (
      <chakra.select
        {...select}
        {...(rest as any)}
        ref={ref}
        paddingRight="2rem"
        className={cx("chakra-select", className)}
        disabled={isDisabled}
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

type RootProps = Omit<GetProps<typeof chakra.div>, "color">

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
export const Select = forwardRef<SelectProps, "select">((props, ref) => {
  const styles = useMultiStyleConfig("Select", props)

  const { rootProps, placeholder, icon, color, ...rest } = omitThemingProps(
    props,
  )

  const [layoutProps, otherProps] = split(rest, layoutPropNames as string[])

  const rootStyles = {
    width: "100%",
    height: "fit-content",
    position: "relative",
    color,
  }

  return (
    <chakra.div
      className="chakra-select__wrapper"
      __css={rootStyles}
      {...layoutProps}
      {...rootProps}
    >
      <SelectField
        ref={ref}
        placeholder={placeholder}
        {...otherProps}
        __css={styles.field}
      >
        {props.children}
      </SelectField>

      <SelectIcon
        data-disabled={props.isDisabled}
        children={icon}
        color={color}
        __css={styles.icon}
      />
    </chakra.div>
  )
})

if (__DEV__) {
  Select.displayName = "Select"
}

export const DefaultIcon: React.FC<GetProps<"svg">> = (props) => (
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

type SelectIconProps = GetProps<typeof IconWrapper>

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
    <IconWrapper
      {...rest}
      className="chakra-select__icon-wrapper"
      children={clone}
    />
  )
}

if (__DEV__) {
  SelectIcon.displayName = "SelectIcon"
}
