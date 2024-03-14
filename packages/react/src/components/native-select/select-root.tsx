import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"
import { SelectContextProvider, SelectStylesProvider } from "./select-context"

export interface NativeSelectRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"NativeSelect">,
    FieldOptions {}

/**
 * React component used to select one item from a list of options.
 *
 * @see Docs https://chakra-ui.com/docs/components/select
 */
export const NativeSelectRoot = forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelectRoot(props, ref) {
  const recipe = useSlotRecipe("NativeSelect", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  const [fieldProps, rootProps] = splitFieldProps(localProps)
  const field = useField(fieldProps)

  return (
    <SelectContextProvider value={field}>
      <SelectStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...rootProps}
          className={cx("chakra-select", props.className)}
          css={[styles.root, props.css]}
        >
          {props.children}
        </chakra.div>
      </SelectStylesProvider>
    </SelectContextProvider>
  )
})

NativeSelectRoot.displayName = "Select"
