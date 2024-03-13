import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"
import { PinInputProvider, PinInputStylesProvider } from "./pin-input-context"
import { splitPinInputProps } from "./pin-input-props"
import { UsePinInputProps, usePinInput } from "./use-pin-input"

export interface PinInputRootProps
  extends HTMLChakraProps<"div", UsePinInputProps>,
    RecipeProps<"PinInput"> {}

/**
 * The `PinInput` component is similar to the Input component, but is optimized for entering sequences of digits quickly.
 *
 * @see Docs https://chakra-ui.com/docs/components/pin-input
 */
export const PinInputRoot = forwardRef<PinInputRootProps, "div">(
  function PinInput(props, ref) {
    const recipe = useRecipe("PinInput", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const [hookProps, restProps] = splitPinInputProps(localProps)
    const api = usePinInput(hookProps)

    return (
      <PinInputProvider value={api}>
        <PinInputStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            {...restProps}
            className={cx("chakra-pin-input", props.className)}
          />
        </PinInputStylesProvider>
      </PinInputProvider>
    )
  },
)

PinInputRoot.displayName = "PinInputRoot"
