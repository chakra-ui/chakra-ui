import { cx } from "@chakra-ui/shared-utils"
import {
  HTMLChakraProps,
  ThemingProps,
  chakra,
  forwardRef,
  omitThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { Children } from "react"
import {
  Orientation,
  StepContextProvider,
  StepStatusType,
  StepperStylesProvider,
} from "./step-context"

export interface StepperProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Stepper"> {
  /**
   * The active step index
   */
  index: number
  /**
   * The orientation of the stepper
   * @default horizontal
   */
  orientation?: Orientation
  /**
   * Whether to show or not the last separator while in vertical orientation
   */
  showLastSeparator?: boolean
  /**
   */
  children: React.ReactNode
}

export const Stepper = forwardRef<StepperProps, "div">(function Stepper(
  props: StepperProps,
  ref,
) {
  const styles = useMultiStyleConfig("Stepper", props)

  const {
    children,
    index,
    orientation = "horizontal",
    showLastSeparator = false,
    ...restProps
  } = omitThemingProps(props)

  const stepElements = Children.toArray(children)

  const stepCount = stepElements.length

  function getStatus(step: number): StepStatusType {
    if (step < index) return "complete"
    if (step > index) return "incomplete"
    return "active"
  }

  return (
    <chakra.div
      ref={ref}
      aria-label="Progress"
      data-orientation={orientation}
      {...restProps}
      __css={styles.stepper}
      className={cx("chakra-stepper", props.className)}
    >
      <StepperStylesProvider value={styles}>
        {stepElements.map((child, index) => (
          <StepContextProvider
            key={index}
            value={{
              index,
              status: getStatus(index),
              orientation,
              showLastSeparator,
              count: stepCount,
              isFirst: index === 0,
              isLast: index === stepCount - 1,
            }}
          >
            {child}
          </StepContextProvider>
        ))}
      </StepperStylesProvider>
    </chakra.div>
  )
})
