import React from "react"
import { runIfFn, __DEV__ } from "@chakra-ui/utils"
import { MaybeRenderPropElement } from "@chakra-ui/react-utils"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { Button, ButtonProps } from "@chakra-ui/button"
import { chakra } from "@chakra-ui/system"
import { useSelectContext, useSelectStyles } from "../select"
import useSelectTrigger from "../hooks/use-select-trigger.hook"

export interface SelectButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  leftIcon?: MaybeRenderPropElement<boolean>
  rightIcon?: MaybeRenderPropElement<boolean>
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      leftIcon: leftIconProp,
      rightIcon: rightIconProp,
      children,
      onClick,
      sx,
      ...restProps
    },
    forwardRef,
  ) => {
    const styles = useSelectStyles()
    const {
      isOpen = false,
      option,
      placeholder,
      hideDefaultChevron,
    } = useSelectContext()

    const defaultRightIcon = (isOpen: boolean) =>
      isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
    const buttonProps = useSelectTrigger({ onClick, forwardRef })

    const leftIcon = runIfFn(leftIconProp, isOpen)
    const rightIcon = runIfFn(
      rightIconProp ?? (!hideDefaultChevron ? defaultRightIcon : undefined),
      isOpen,
    )

    return (
      <Button
        className="chakra-select__trigger"
        __css={{ ...styles.trigger, ...sx }}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...buttonProps}
        {...restProps}
      >
        <chakra.span className="chakra-select__trigger-label">
          {option?.label ?? placeholder}
        </chakra.span>
      </Button>
    )
  },
)

if (__DEV__) {
  SelectTrigger.displayName = "SelectTrigger"
}

export default SelectTrigger
