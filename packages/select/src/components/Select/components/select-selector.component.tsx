import React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { ButtonProps } from "@chakra-ui/react"
import { MaybeRenderPropElement } from "@chakra-ui/react-utils"
import SelectButton from "./select-button.component"
import { useSelectContext } from "../select.component"

export interface SelectSelectorProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  leftIcon?: MaybeRenderPropElement<boolean>
  rightIcon?: MaybeRenderPropElement<boolean>
}

const SelectSelector: React.FC<SelectSelectorProps> = ({
  leftIcon,
  rightIcon,
  ...restProps
}) => {
  const { option, placeholder, hideDefaultChevron } = useSelectContext()

  const defaultRightIcon = (isOpen: boolean) =>
    isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />

  return (
    <SelectButton
      leftIcon={leftIcon}
      rightIcon={
        rightIcon ?? (!hideDefaultChevron ? defaultRightIcon : undefined)
      }
      {...restProps}
    >
      {option?.label ?? placeholder}
    </SelectButton>
  )
}

export default SelectSelector
