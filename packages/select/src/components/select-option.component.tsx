import { cx, runIfFn, __DEV__ } from "@chakra-ui/utils"
import React from "react"
import { MaybeRenderProp } from "@chakra-ui/react-utils"
import { chakra, ChakraProps } from "@chakra-ui/system"
import { Box } from "@chakra-ui/layout"
import {
  SelectOption as SelectOptionInterface,
  SelectOptionIconRenderProps,
  SelectValue,
} from "../select.interface"
import useSelectOption from "../hooks/use-select-option.hook"
import { useSelectContext, useSelectStyles } from "../select"

export interface SelectOptionProps extends ChakraProps {
  value: SelectValue
  children: React.ReactNode
  isDisabled?: boolean
  leftIcon?: MaybeRenderProp<boolean>
  rightIcon?: MaybeRenderProp<boolean>
}

interface SelectOptionIconProps {
  icon?: MaybeRenderProp<boolean>
  globalIcon?: MaybeRenderProp<SelectOptionIconRenderProps>
  isSelected: boolean
  option: SelectOptionInterface
}

const SelectOptionIcon: React.FC<SelectOptionIconProps> = ({
  icon,
  globalIcon,
  option,
  isSelected,
}) => {
  if (!icon && !globalIcon) return null
  return (
    <chakra.span className="chakra-select__option-icon">
      {runIfFn(icon, isSelected) ?? runIfFn(globalIcon, { option, isSelected })}
    </chakra.span>
  )
}

interface SelectOptionContentProps {
  leftIcon?: MaybeRenderProp<boolean>
  rightIcon?: MaybeRenderProp<boolean>
  globalLeftIcon?: MaybeRenderProp<SelectOptionIconRenderProps>
  globalRightIcon?: MaybeRenderProp<SelectOptionIconRenderProps>
  children: React.ReactNode
}

const SelectOptionContent: React.FC<SelectOptionContentProps> = ({
  leftIcon,
  rightIcon,
  globalLeftIcon,
  globalRightIcon,
  children,
}) => {
  if (!leftIcon && !rightIcon && !globalLeftIcon && !globalRightIcon) {
    return <>{children}</>
  }

  return <Box className="chakra-select__option-label">{children}</Box>
}

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  children,
  leftIcon,
  rightIcon,
  isDisabled,
  ...restProps
}) => {
  const styles = useSelectStyles()

  const option: SelectOptionInterface = { value, label: children }
  const { leftIcon: globalLeftIcon, rightIcon: globalRightIcon } =
    useSelectContext()
  const { isSelected, ...optionProps } = useSelectOption(option)

  return (
    <chakra.li
      className={cx(
        "chakra-select__option",
        isSelected && "chakra-select__option-active",
        isDisabled && "chakra-select__option-disabled",
      )}
      __css={styles.option}
      {...optionProps}
      {...restProps}
    >
      <SelectOptionIcon
        icon={leftIcon}
        globalIcon={globalLeftIcon}
        isSelected={isSelected}
        option={option}
      />
      <SelectOptionContent
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        globalLeftIcon={globalLeftIcon}
        globalRightIcon={globalRightIcon}
      >
        {children}
      </SelectOptionContent>
      <SelectOptionIcon
        icon={rightIcon}
        globalIcon={globalRightIcon}
        isSelected={isSelected}
        option={option}
      />
    </chakra.li>
  )
}

if (__DEV__) {
  SelectOption.displayName = "SelectOption"
}

export default SelectOption
