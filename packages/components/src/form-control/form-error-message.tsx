import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import {
  FormErrorStylesProvider,
  useFormControlContext,
} from "./form-control-context"

export interface FormErrorMessageProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FormErrorMessage"> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FormErrorMessage = forwardRef<FormErrorMessageProps, "div">(
  function FormErrorMessage(props, ref) {
    const styles = useMultiStyleConfig("FormError", props)
    const ownProps = omitThemingProps(props)
    const field = useFormControlContext()

    if (!field?.isInvalid) return null

    return (
      <FormErrorStylesProvider value={styles}>
        <chakra.div
          {...field?.getErrorMessageProps(ownProps, ref)}
          className={cx("chakra-form__error-message", props.className)}
          __css={{
            display: "flex",
            alignItems: "center",
            ...styles.text,
          }}
        />
      </FormErrorStylesProvider>
    )
  },
)

FormErrorMessage.displayName = "FormErrorMessage"
