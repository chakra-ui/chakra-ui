import { createContext } from "@chakra-ui/react-context"
import { ThemingProps, useTheme } from "@chakra-ui/system"
import { SlideOptions } from "@chakra-ui/transition"
import { Modal, ModalProps } from "./modal"

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
      ModalProps,
      "scrollBehavior" | "motionPreset" | "isCentered" | keyof ThemingProps
    > {}

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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        styleConfig={drawerStyleConfig}
        {...rest}
      >
        {children}
      </Modal>
    </DrawerContextProvider>
  )
}

export { ModalBody as DrawerBody } from "./modal-body"
export { ModalCloseButton as DrawerCloseButton } from "./modal-close-button"
export { ModalFooter as DrawerFooter } from "./modal-footer"
export { ModalHeader as DrawerHeader } from "./modal-header"
export { ModalOverlay as DrawerOverlay } from "./modal-overlay"

export { useDrawerContext }
