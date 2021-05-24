import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/utils"
import * as React from "react"

export interface WizardProps extends HTMLChakraProps<"div">, ThemingProps {
  activeStep: number
  orientation?: "vertical" | "horizontal"
  labelOrientation?: "vertical" | "horizontal"
  isLoading?: boolean
  isError?: boolean
}

export const Wizard = forwardRef<WizardProps, "div">(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const styles = useMultiStyleConfig("Wizard", props)

    const {
      className,
      activeStep,
      children,
      orientation,
      labelOrientation,
      isLoading,
      isError,
      ...wizardProps
    } = omitThemingProps(props)

    const childArr = React.Children.toArray(children)

    const stepCount = childArr.length

    return (
      <StylesProvider value={styles}>
        <chakra.div
          ref={ref}
          __css={{
            justifyContent: stepCount === 1 ? "flex-end" : "space-between",
            flexDir: orientation === "vertical" ? "column" : "row",
            ...styles.wizard,
          }}
          {...wizardProps}
          className={cx("chakra-wizard", className)}
        >
          {React.Children.map(children, (child, i) => {
            const isCompletedStep = i < activeStep
            const isLastStep = i === stepCount - 1
            const isCurrentStep = i === activeStep

            const stepProps = {
              index: i,
              colorScheme: props.colorScheme,
              isCompletedStep,
              isCurrentStep,
              isLastStep,
              orientation,
              labelOrientation,
              isLoading,
              isError,
            }

            return React.isValidElement(child)
              ? React.cloneElement(child, stepProps)
              : null
          })}
        </chakra.div>
      </StylesProvider>
    )
  },
)

Wizard.defaultProps = {
  activeStep: 0,
  colorScheme: "green",
  orientation: "horizontal",
}
