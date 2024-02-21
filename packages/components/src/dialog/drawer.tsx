import { ThemingProps } from "@chakra-ui/styled-system"
import { useTheme } from "../system"
import { createContext } from "@chakra-ui/utils/context"
import { SlideOptions } from "../transition"
import { DialogRoot, DialogRootProps } from "./dialog-root"

const [DrawerContextProvider, useDrawerContext] = createContext<DrawerOptions>()

type LogicalPlacement = "start" | "end"

type LogicalPlacementMap = Record<
  LogicalPlacement,
  { ltr: SlideOptions["direction"]; rtl: SlideOptions["direction"] }
>
type DrawerPlacement = SlideOptions["direction"] | LogicalPlacement

const placementMap: LogicalPlacementMap = {
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" },
}

function getDrawerPlacement(
  placement: DrawerPlacement | undefined,
  dir: "ltr" | "rtl",
) {
  if (!placement) return
  //@ts-expect-error
  return placementMap[placement]?.[dir] ?? placement
}

interface DrawerOptions {
  /**
   * The placement of the drawer
   * @default "right"
   */
  placement?: DrawerPlacement
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean
}

export interface DrawerProps
  extends DrawerOptions,
    ThemingProps<"Drawer">,
    Omit<
      DialogRootProps,
      "scrollBehavior" | "motionPreset" | "isCentered" | keyof ThemingProps
    > {}

/**
 * The Drawer component is a panel that slides out from the edge of the screen.
 * It can be useful when you need users to complete a task or view some details without leaving the current page.
 *
 * @see Docs https://chakra-ui.com/docs/components/drawer
 */
export function Drawer(props: DrawerProps) {
  const {
    isOpen,
    onClose,
    placement: placementProp = "right",
    children,
    ...rest
  } = props

  const theme = useTheme()
  const drawerStyleConfig = theme.components?.Drawer
  const placement = getDrawerPlacement(placementProp, theme.direction)

  return (
    <DrawerContextProvider value={{ placement }}>
      <DialogRoot
        isOpen={isOpen}
        onClose={onClose}
        styleConfig={drawerStyleConfig}
        {...rest}
      >
        {children}
      </DialogRoot>
    </DrawerContextProvider>
  )
}

export { DialogBody as DrawerBody } from "./dialog-body"
export { DialogCloseButton as DrawerCloseButton } from "./dialog-close-button"
export { DialogFooter as DrawerFooter } from "./dialog-footer"
export { DialogHeader as DrawerHeader } from "./dialog-header"
export { DialogOverlay as DrawerOverlay } from "./dialog-overlay"

export { useDrawerContext }
