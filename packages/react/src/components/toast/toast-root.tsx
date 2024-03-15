import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { ToastStylesProvider, useToastContext } from "./toast-context"

export interface ToastRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"Toast"> {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(
  function _ToastRoot(props, ref) {
    const api = useToastContext()

    const recipe = useSlotRecipe("Toast", props.recipe)
    const [variantProps, restProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <ToastStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...api.getRootProps(restProps, ref)}
          css={[styles.root, props.css]}
          className={cx("chakra-toast", props.className)}
        />
      </ToastStylesProvider>
    )
  },
)
