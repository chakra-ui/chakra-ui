import { Button, ButtonProps, chakra } from "@chakra-ui/react"
import React from "react"
import { runIfFn } from "@chakra-ui/utils"
import { MaybeRenderPropElement } from "@chakra-ui/react-utils"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { useSelectContext, useSelectStyles } from "../select.component"
import useSelectButton from "../hooks/use-select-button.hook"

export interface SelectButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  leftIcon?: MaybeRenderPropElement<boolean>
  rightIcon?: MaybeRenderPropElement<boolean>
}

const SelectButton = React.forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    {
      leftIcon: leftIconProp,
      rightIcon: rightIconProp,
      children,
      onClick,
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
    const buttonProps = useSelectButton({ onClick, forwardRef })

    const leftIcon = runIfFn(rightIconProp, isOpen)
    const rightIcon = runIfFn(
      rightIconProp ?? (!hideDefaultChevron ? defaultRightIcon : undefined),
      isOpen,
    )

    return (
      <Button
        className="chakra-select__select-button"
        __css={styles.button}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...buttonProps}
        {...restProps}
      >
        <chakra.span className="chakra-select__button-label">
          {option?.label ?? placeholder}
        </chakra.span>
      </Button>
    )
  },
)

SelectButton.displayName = "SelectInput"

export default SelectButton
