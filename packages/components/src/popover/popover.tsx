import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { MaybeRenderProp, runIfFn } from "@chakra-ui/utils"
import { useMultiStyleConfig, useTheme } from "../system"
import { PopoverProvider, PopoverStylesProvider } from "./popover-context"
import { usePopover, UsePopoverProps } from "./use-popover"

export interface PopoverProps extends UsePopoverProps, ThemingProps<"Popover"> {
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
 * @see Docs https://v2.chakra-ui.com/docs/components/popover
 */
export function Popover(props: PopoverProps) {
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

Popover.displayName = "Popover"
