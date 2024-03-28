"use client"

import { MaybeRenderProp, runIfFn } from "@chakra-ui/utils"
import {
  EMPTY_SLOT_STYLES,
  SlotRecipeProps,
  UnstyledProp,
  useSlotRecipe,
} from "../../styled-system"
import { PopoverProvider, PopoverStylesProvider } from "./popover-context"
import { UsePopoverProps, usePopover } from "./use-popover"

export interface PopoverRootProps
  extends UsePopoverProps,
    SlotRecipeProps<"Popover">,
    UnstyledProp {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: MaybeRenderProp<{
    open: boolean
    onClose: () => void
    forceUpdate: (() => void) | undefined
  }>
}

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 *
 * @see Docs https://chakra-ui.com/docs/components/popover
 */
export function PopoverRoot({ unstyled, ...props }: PopoverRootProps) {
  const recipe = useSlotRecipe("Popover")
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

  const { children, ...restProps } = localProps
  const context = usePopover(restProps)

  return (
    <PopoverProvider value={context}>
      <PopoverStylesProvider value={styles}>
        {runIfFn(children, {
          open: context.open,
          onClose: context.onClose,
          forceUpdate: context.forceUpdate,
        })}
      </PopoverStylesProvider>
    </PopoverProvider>
  )
}

PopoverRoot.displayName = "Popover"
