import { Box, BoxProps } from "@chakra-ui/react"
import { cx, runIfFn } from "@chakra-ui/utils"
import React from "react"
import { MaybeRenderProp } from "@chakra-ui/react-utils"
import {
  SelectOption as SelectOptionInterface,
  SelectValue,
} from "../interfaces/select.interface"
import useSelectOption from "../hooks/use-select-option.hook"
import { useSelectContext, useSelectStyles } from "../select.component"

export interface SelectOptionProps extends BoxProps {
  value: SelectValue
  children: React.ReactNode
  isDisabled?: boolean
  leftIcon?: MaybeRenderProp<boolean>
  rightIcon?: MaybeRenderProp<boolean>
}

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  children,
  leftIcon,
  rightIcon,
  isDisabled,
  sx,
  ...restProps
}) => {
  const styles = useSelectStyles()

  const option: SelectOptionInterface = { value, label: children }
  const { leftIcon: globalLeftIcon, rightIcon: globalRightIcon } =
    useSelectContext()
  const { isSelected, ...optionProps } = useSelectOption(option)

  const renderLeftIcon = (): React.ReactNode | undefined => {
    if (!leftIcon && !globalLeftIcon) {
      return
    }

    return (
      <Box as="span" className="chakra-select__option-icon">
        {runIfFn(leftIcon, isSelected) ??
          runIfFn(globalLeftIcon, { option, isSelected })}
      </Box>
    )
  }

  const renderRightIcon = (): React.ReactNode | undefined => {
    if (!rightIcon && !globalRightIcon) {
      return
    }

    return (
      <Box as="span" className="chakra-select__option-icon">
        {runIfFn(rightIcon, isSelected) ??
          runIfFn(globalRightIcon, { option, isSelected })}
      </Box>
    )
  }

  const renderContent = (): React.ReactNode => {
    if (!leftIcon && !rightIcon && !globalLeftIcon && !globalRightIcon) {
      return children
    }

    return <Box className="chakra-select__option-label">{children}</Box>
  }

  return (
    <Box
      className={cx(
        "chakra-select__select-option",
        isSelected && "chakra-select__option-active",
        isDisabled && "chakra-option-disabled",
      )}
      as="li"
      sx={{ ...styles.option, ...sx }}
      {...optionProps}
      {...restProps}
    >
      {renderLeftIcon()}
      {renderContent()}
      {renderRightIcon()}
    </Box>
  )
}

export default SelectOption
