import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useNumberInputStyles } from "./number-input-context"

export interface NumberInputStepperProps extends HTMLChakraProps<"div"> {}

/**
 * NumberInputStepper
 *
 * React component used to group the increment and decrement
 * button spinners.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://chakra-ui.com/components/number-input
 */
export const NumberInputStepper = forwardRef<NumberInputStepperProps, "div">(
  function NumberInputStepper(props, ref) {
    const styles = useNumberInputStyles()
    return (
      <chakra.div
        aria-hidden
        ref={ref}
        {...props}
        css={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "0",
          insetEnd: "0px",
          margin: "1px",
          height: "calc(100% - 2px)",
          zIndex: 1,
          ...styles.stepperGroup,
        }}
      />
    )
  },
)

NumberInputStepper.displayName = "NumberInputStepper"
