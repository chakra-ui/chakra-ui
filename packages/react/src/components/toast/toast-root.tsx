"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { ToastStylesProvider, useToastContext } from "./toast-context"

export interface ToastRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"Toast">,
    UnstyledProp {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(
  function _ToastRoot({ unstyled, ...props }, ref) {
    const api = useToastContext()

    const recipe = useSlotRecipe("Toast", props.recipe)
    const [variantProps, restProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

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
