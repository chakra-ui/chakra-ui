import { forwardRef, HTMLChakraProps } from "../system"
import { TriangleDownIcon } from "./number-input-icons"
import {
  useNumberInputStyles,
  useNumberInputContext,
} from "./number-input-context"
import { StyledStepper } from "./styled-stepper"

export interface NumberInputDecrementStepperProps
  extends HTMLChakraProps<"div"> {}

/**
 * NumberDecrementStepper
 *
 * React component used to decrement the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberInputDecrementStepper = forwardRef<
  NumberInputDecrementStepperProps,
  "div"
>(function NumberDecrementStepper(props, ref) {
  const styles = useNumberInputStyles()

  const { getDecrementButtonProps } = useNumberInputContext()
  const decrement = getDecrementButtonProps(props, ref)

  return (
    <StyledStepper {...decrement} __css={styles.stepper}>
      {props.children ?? <TriangleDownIcon />}
    </StyledStepper>
  )
})

NumberInputDecrementStepper.displayName = "NumberInputDecrementStepper"
