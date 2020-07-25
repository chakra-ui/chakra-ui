import { CheckIcon } from "@chakra-ui/icons"
import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { Transition } from "@chakra-ui/transition"
import * as React from "react"
import {
  ResponsiveArray,
  ResponsiveObject,
} from "../../styled-system/src/utils/types"

export type WizardStepLabelProps = PropsOf<typeof chakra.div> & {
  index: number
  isCompletedStep?: boolean
  isCurrentStep?: boolean
  completedIcon?: React.ComponentType<any>
  activeBgColor?: SystemProps["bgColor"]
  activeColor?:
    | string
    | (string & ResponsiveArray<string>)
    | (string & ResponsiveObject<string>)
    | undefined
  inactiveBgColor?: SystemProps["bgColor"]
  inactiveColor?: SystemProps["color"]
}

const Square = chakra("div", {
  baseStyle: {
    width: "40px",
    height: "40px",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
})

const OuterCircle = chakra("div", {
  baseStyle: {
    width: "38px",
    height: "38px",
    display: "flex",
    borderRadius: "19px",
    alignItems: "center",
    justifyContent: "center",
  },
})

const InnerCircle = chakra("div", {
  baseStyle: {
    width: "36px",
    height: "36px",
    display: "flex",
    borderRadius: "18px",
    alignItems: "center",
    justifyContent: "center",
  },
})

const iconStyles = {
  init: {
    transform: "scale(0)",
  },
  entered: {
    transform: "scale(1)",
  },
  exiting: {
    transform: "scale(0)",
  },
}

const WizardStepLabel = React.forwardRef(function WizardStepLabel(
  {
    children,
    isCompletedStep,
    isCurrentStep,
    index,
    completedIcon: CompletedIcon,
    activeColor,
    activeBgColor,
    inactiveColor,
    inactiveBgColor,
    ...rest
  }: WizardStepLabelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const Icon = React.isValidElement(CompletedIcon) ? CompletedIcon : CheckIcon
  return (
    <Square {...rest} ref={ref}>
      <OuterCircle
        bg={
          isCompletedStep
            ? activeBgColor
            : isCurrentStep
            ? "green.500"
            : "gray.200"
        }
      >
        <InnerCircle
          bg={
            isCompletedStep
              ? activeBgColor
              : isCurrentStep
              ? "gray.200"
              : "gray.100"
          }
        >
          {isCompletedStep ? (
            <Transition in={isCompletedStep} styles={iconStyles}>
              {(style) => (
                <Icon
                  width="20px"
                  height="20px"
                  style={style}
                  color={activeColor}
                />
              )}
            </Transition>
          ) : (
            <chakra.span __css={{ color: isCompletedStep ? "white" : "black" }}>
              {index + 1}
            </chakra.span>
          )}
        </InnerCircle>
      </OuterCircle>
    </Square>
  )
})

export default WizardStepLabel

WizardStepLabel.defaultProps = {
  bg: "gray.100",
  activeColor: "white",
  activeBgColor: "green.300",
  inactiveBgColor: "gray.300",
}
