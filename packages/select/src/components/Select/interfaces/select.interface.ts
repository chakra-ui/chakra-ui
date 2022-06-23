import React from "react"
import { MaybeRenderProp } from "@chakra-ui/react-utils"
import { BoxProps } from "@chakra-ui/react"

export type SelectValue = string | number
export type SelectSize = "sm" | "md" | "lg"
export type SelectVariant = "outline" | "filled"

export interface SelectControlProps {
  isOpen?: boolean
  invalid?: boolean
  clearable?: boolean
  isDisabled?: boolean
  required?: boolean
  readonly?: boolean
  defaultValue?: SelectValue
  closeOnSelect?: boolean
  value?: SelectValue
  onOpen?: () => void
  onClose?: () => void
  onChange?: (value: SelectValue) => void
}

export interface SelectRenderProps {
  id?: string
  hideDefaultChevron?: boolean
  placeholder?: string
  /**
   * The icon element to be used in the select on the left
   * The icon can be a static icon or dependent on the open state
   */
  leftIcon?: MaybeRenderProp<SelectOptionIconRenderProps>
  /**
   * The icon element to be used in the select on the right
   * The icon can be a static icon or dependent on the open state
   */
  rightIcon?: MaybeRenderProp<SelectOptionIconRenderProps>
}

export interface SelectStyleProps {
  size?: SelectSize
  variant?: SelectVariant
  rootProps?: Omit<BoxProps, "value" | "onChange">
}

export interface SelectOption {
  value: SelectValue
  label: React.ReactNode
}

export interface SelectChildrenProps {
  isOpen?: boolean
  option?: SelectOption
}

export interface SelectOptionIconRenderProps {
  option: SelectOption
  isSelected: boolean
}
