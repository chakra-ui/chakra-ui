import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import { FieldErrorStylesProvider, useFieldContext } from "./field-context"

export interface FieldErrorMessageProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FieldErrorMessage"> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FieldErrorMessage = forwardRef<FieldErrorMessageProps, "div">(
  function FieldErrorMessage(props, ref) {
    const styles = useMultiStyleConfig("FormError", props)
    const ownProps = omitThemingProps(props)
    const field = useFieldContext()

    if (!field?.isInvalid) return null

    return (
      <FieldErrorStylesProvider value={styles}>
        <chakra.div
          {...field?.getErrorMessageProps(ownProps, ref)}
          className={cx("chakra-form__error-message", props.className)}
          __css={{
            display: "flex",
            alignItems: "center",
            ...styles.text,
          }}
        />
      </FieldErrorStylesProvider>
    )
  },
)

FieldErrorMessage.displayName = "FieldErrorMessage"
