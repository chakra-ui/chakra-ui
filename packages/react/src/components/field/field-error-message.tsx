import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
} from "../../styled-system"
import {
  FieldErrorStylesProvider,
  useFieldContext,
  useFieldStyles,
} from "./field-context"

export interface FieldErrorMessageProps
  extends HTMLChakraProps<"div">,
    SystemRecipeProps<"FieldErrorMessage"> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FieldErrorMessage = forwardRef<FieldErrorMessageProps, "div">(
  function FieldErrorMessage(props, ref) {
    const styles = useFieldStyles()
    const field = useFieldContext()

    if (!field?.isInvalid) return null

    return (
      <FieldErrorStylesProvider value={styles}>
        <chakra.div
          {...field?.getErrorMessageProps(props, ref)}
          className={cx("chakra-field__error-message", props.className)}
          css={styles.errorMessage}
        />
      </FieldErrorStylesProvider>
    )
  },
)

FieldErrorMessage.displayName = "FieldErrorMessage"
