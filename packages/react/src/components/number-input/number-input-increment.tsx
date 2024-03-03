import { HTMLChakraProps, forwardRef } from "../../styled-system"
import {
  useNumberInputContext,
  useNumberInputStyles,
} from "./number-input-context"
import { TriangleUpIcon } from "./number-input-icons"
import { StyledStepper } from "./styled-stepper"

export interface NumberInputIncrementStepperProps
  extends HTMLChakraProps<"div"> {}

/**
 * NumberIncrementStepper
 *
 * React component used to increment the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberInputIncrementStepper = forwardRef<
  NumberInputIncrementStepperProps,
  "div"
>(function NumberIncrementStepper(props, ref) {
  const { getIncrementButtonProps } = useNumberInputContext()
  const increment = getIncrementButtonProps(props, ref)
  const styles = useNumberInputStyles()

  return (
    <StyledStepper {...increment} css={styles.stepper}>
      {props.children ?? <TriangleUpIcon />}
    </StyledStepper>
  )
})

NumberInputIncrementStepper.displayName = "NumberInputIncrementStepperProps"
