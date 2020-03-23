import * as React from "react"
import {
  chakra,
  PropsOf,
  useColorModeValue,
  layoutPropNames,
} from "@chakra-ui/system"
import { ControlProps, useField } from "@chakra-ui/form-control"
import { Icon, IconProps } from "@chakra-ui/icon"
import { split } from "@chakra-ui/utils"

type OmittedTypes = "disabled" | "required" | "readOnly"

interface SelectOptions {
  /**
   * The border color when the textarea is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the textarea is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /**
   * If `true`, the textarea element will span the full width of it's parent
   */
  isFullWidth?: boolean
  placeholder?: string
}

type SelectIconWrapperProps = PropsOf<typeof chakra.div>

const SelectIconWrapper = (props: SelectIconWrapperProps) => (
  <chakra.div
    position="absolute"
    display="inline-flex"
    width="1.5rem"
    height="100%"
    alignItems="center"
    justifyContent="center"
    right="0.5rem"
    top="50%"
    pointerEvents="none"
    zIndex={2}
    transform="translateY(-50%)"
    {...props}
  />
)

const StyledSelect = chakra<"select", SelectOptions>("select", {
  themeKey: "Select",
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

export type SelectFieldProps = Omit<
  PropsOf<typeof StyledSelect>,
  OmittedTypes
> &
  ControlProps

export const SelectField = React.forwardRef(
  (props: SelectFieldProps, ref: React.Ref<HTMLSelectElement>) => {
    const fieldProps = useField<HTMLSelectElement>(props)
    return (
      <StyledSelect ref={ref} {...fieldProps}>
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {props.children}
      </StyledSelect>
    )
  },
)

type Props = PropsOf<typeof chakra.div>

export type SelectProps = Props & {
  rootProps?: Omit<Props, "color">
  icon?: React.ElementType
  iconSize?: any
}

export function SelectIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </Icon>
  )
}

export const Select = React.forwardRef(
  (props: SelectProps, ref: React.Ref<HTMLSelectElement>) => {
    const { rootProps, icon = SelectIcon, iconSize = 5, ...rest } = props

    const color = useColorModeValue("inherit", "whiteAlpha.800")
    const opacity = props.isReadOnly || props.isDisabled ? 0.5 : undefined

    const [select, root] = split(rest, layoutPropNames as any)

    return (
      <chakra.div position="relative" {...root} {...rootProps}>
        <SelectField
          appearance="none"
          width="100%"
          paddingBottom="1px"
          paddingRight="2rem"
          ref={ref}
          color={color}
          {...select}
        />
        <SelectIconWrapper opacity={opacity} color={select.color || color}>
          <Icon
            focusable="false"
            aria-hidden
            as={icon}
            width={iconSize}
            height={iconSize}
          />
        </SelectIconWrapper>
      </chakra.div>
    )
  },
)

Select.displayName = "Select"

Select.defaultProps = {
  isFullWidth: true,
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
}
