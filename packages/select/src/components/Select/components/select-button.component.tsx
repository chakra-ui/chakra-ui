import { Button, ButtonProps, Box } from "@chakra-ui/react"
import React from "react"
import { runIfFn } from "@chakra-ui/utils"
import { MaybeRenderPropElement } from "@chakra-ui/react-utils"
import { useSelectContext, useSelectStyles } from "../select.component"
import useSelectButton from "../hooks/use-select-button.hook"

export interface SelectButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  children: React.ReactNode
  leftIcon?: MaybeRenderPropElement<boolean>
  rightIcon?: MaybeRenderPropElement<boolean>
}

const SelectButton = React.forwardRef<HTMLButtonElement, SelectButtonProps>(
  (
    { leftIcon, rightIcon, children, sx, onClick, ...restProps },
    forwardRef,
  ) => {
    const styles = useSelectStyles()
    const { isOpen = false } = useSelectContext()
    const buttonProps = useSelectButton({ onClick, forwardRef })

    const renderLeftIcon = () => {
      if (!leftIcon) {
        return
      }

      return runIfFn(leftIcon, isOpen)
    }
    const renderRightIcon = () => {
      if (!rightIcon) {
        return
      }

      return runIfFn(rightIcon, isOpen)
    }

    return (
      <Button
        className="chakra-select__select-button"
        sx={{ ...styles.button, ...sx }}
        leftIcon={renderLeftIcon()}
        rightIcon={renderRightIcon()}
        {...buttonProps}
        {...restProps}
      >
        <Box className="chakra-select__button-label" as="span">
          {children}
        </Box>
      </Button>
    )
  },
)

SelectButton.displayName = "SelectInput"

export default SelectButton
