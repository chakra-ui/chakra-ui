import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { FieldErrorStylesProvider, useFieldContext } from "./field-context"

export interface FieldErrorMessageProps
  extends HTMLChakraProps<"div">,
    SystemRecipeProps<"FieldErrorMessage"> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FieldErrorMessage = forwardRef<FieldErrorMessageProps, "div">(
  function FieldErrorMessage(props, ref) {
    const recipe = useSlotRecipe("FieldErrorMessage")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const field = useFieldContext()

    if (!field?.isInvalid) return null

    return (
      <FieldErrorStylesProvider value={styles}>
        <chakra.div
          {...field?.getErrorMessageProps(localProps, ref)}
          className={cx("chakra-form__error-message", props.className)}
          css={{
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
