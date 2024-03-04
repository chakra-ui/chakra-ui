import { MaybeRenderProp, runIfFn } from "@chakra-ui/utils"
import { SystemRecipeProps, useSlotRecipe, useTheme } from "../../styled-system"
import { PopoverProvider, PopoverStylesProvider } from "./popover-context"
import { UsePopoverProps, usePopover } from "./use-popover"

export interface PopoverRootProps
  extends UsePopoverProps,
    SystemRecipeProps<"Popover"> {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: MaybeRenderProp<{
    isOpen: boolean
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
export function PopoverRoot(props: PopoverRootProps) {
  const recipe = useSlotRecipe("Popover")
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  const { children, ...rest } = localProps

  // const theme = useTheme()
  const context = usePopover({ ...rest, direction: "ltr" })

  return (
    <PopoverProvider value={context}>
      <PopoverStylesProvider value={styles}>
        {runIfFn(children, {
          isOpen: context.isOpen,
          onClose: context.onClose,
          forceUpdate: context.forceUpdate,
        })}
      </PopoverStylesProvider>
    </PopoverProvider>
  )
}

PopoverRoot.displayName = "Popover"
