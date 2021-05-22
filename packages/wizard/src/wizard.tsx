import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import * as React from "react"

export interface WizardProps extends HTMLChakraProps<"div">, ThemingProps {
  activeStep: number
  orientation?: "vertical" | "horizontal"
}

export const Wizard = forwardRef<WizardProps, "div">(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const styles = useMultiStyleConfig("Wizard", props)

    const {
      className,
      activeStep,
      children,
      orientation,
      ...wizardProps
    } = omitThemingProps(props)

    const childArr = React.Children.toArray(children)

    const stepCount = childArr.length

    return (
      <StylesProvider value={styles}>
        <chakra.div
          __css={{
            justifyContent: stepCount === 1 ? "flex-end" : "space-between",
            flexDir: orientation === "vertical" ? "column" : "row",
            ...styles.wizard,
          }}
          {...wizardProps}
          ref={ref}
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
            }

            return (
              React.isValidElement(child) &&
              React.cloneElement(child, stepProps)
            )
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
