import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { useMultiStyleConfig, useTheme } from "../system"
import { MaybeRenderProp } from "@chakra-ui/utils/prop-types"
import { runIfFn } from "@chakra-ui/utils/run-if-fn"
import { PopoverProvider, PopoverStylesProvider } from "./popover-context"
import { usePopover, UsePopoverProps } from "./use-popover"

export interface PopoverRootProps
  extends UsePopoverProps,
    ThemingProps<"Popover"> {
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
  const styles = useMultiStyleConfig("Popover", props)

  const { children, ...rest } = omitThemingProps(props)
  const theme = useTheme()
  const context = usePopover({ ...rest, direction: theme.direction })

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
