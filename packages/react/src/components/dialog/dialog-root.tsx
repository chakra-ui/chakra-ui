import { AnimatePresence } from "framer-motion"
import { SystemRecipeProps, useSlotRecipe } from "../../styled-system"
import { Portal, PortalProps } from "../portal"
import { DialogContextProvider, DialogStylesProvider } from "./dialog-context"
import {
  DialogMotionPreset,
  DialogOptions,
  DialogScrollBehavior,
} from "./dialog-types"
import { UseDialogProps, useDialog } from "./use-dialog"

export interface DialogRootProps
  extends UseDialogProps,
    DialogOptions,
    SystemRecipeProps<"Modal"> {
  /**
   * The children of the dialog component
   */
  children: React.ReactNode
  /**
   *  If `true`, the dialog will be centered on screen.
   * @default false
   */
  isCentered?: boolean
  /**
   * Where scroll behavior should originate.
   * - If set to `inside`, scroll only occurs within the `DialogBody`.
   * - If set to `outside`, the entire `DialogContent` will scroll within the viewport.
   *
   * @default "outside"
   */
  scrollBehavior?: DialogScrollBehavior
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, "appendToParentPortal" | "containerRef">
  /**
   * The transition that should be used for the dialog
   * @default "scale"
   */
  motionPreset?: DialogMotionPreset
  /**
   * Fires when all exiting nodes have completed animating out
   */
  onCloseComplete?: VoidFunction
}

/**
 * Provides context, theming, and accessibility properties
 * to all other dialog components.
 *
 * It doesn't render any DOM node.
 *
 * @see Docs https://chakra-ui.com/docs/components/dialog
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
 */
export const DialogRoot: React.FC<DialogRootProps> = (props) => {
  const modalProps: DialogRootProps = {
    scrollBehavior: "outside",
    autoFocus: true,
    trapFocus: true,
    returnFocusOnClose: true,
    blockScrollOnMount: true,
    allowPinchZoom: false,
    preserveScrollBarGap: true,
    motionPreset: "scale",
    lockFocusAcrossFrames: true,
    ...props,
  }

  const {
    portalProps,
    children,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames,
    onCloseComplete,
  } = modalProps

  const recipe = useSlotRecipe("Modal")
  const [variantProps, localProps] = recipe.splitVariantProps(modalProps)
  const styles = recipe(variantProps)

  const api = useDialog(localProps)

  const context = {
    ...api,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames,
  }

  return (
    <DialogContextProvider value={context}>
      <DialogStylesProvider value={styles}>
        <AnimatePresence onExitComplete={onCloseComplete}>
          {context.isOpen && <Portal {...portalProps}>{children}</Portal>}
        </AnimatePresence>
      </DialogStylesProvider>
    </DialogContextProvider>
  )
}

DialogRoot.displayName = "Dialog"
