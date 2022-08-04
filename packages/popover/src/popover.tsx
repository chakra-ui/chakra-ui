import { MaybeRenderProp } from "@chakra-ui/react-utils"
import {
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
  useTheme,
} from "@chakra-ui/system"
import { runIfFn, __DEV__ } from "@chakra-ui/utils"
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

if (__DEV__) {
  Popover.displayName = "Popover"
}
