import {
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"
import { SelectContextProvider, SelectStylesProvider } from "./select-context"
import { NativeSelectFieldProps } from "./select-field"

interface NativeSelectOptions extends FieldOptions {
  /**
   * The border color when the select is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the select is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
}

export interface NativeSelectRootProps
  extends NativeSelectFieldProps,
    SystemRecipeProps<"Select">,
    NativeSelectOptions {}

/**
 * React component used to select one item from a list of options.
 *
 * @see Docs https://chakra-ui.com/docs/components/select
 */
export const NativeSelectRoot = forwardRef<NativeSelectRootProps, "select">(
  function NativeSelectRoot(props, ref) {
    const recipe = useSlotRecipe("Select")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const [fieldProps, rootProps] = splitFieldProps(localProps)
    const field = useField(fieldProps)

    return (
      <SelectContextProvider value={field}>
        <SelectStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            className="chakra-select"
            css={styles.root}
            {...rootProps}
          >
            {props.children}
          </chakra.div>
        </SelectStylesProvider>
      </SelectContextProvider>
    )
  },
)

NativeSelectRoot.displayName = "Select"
