import { SystemRecipeProps, useSlotRecipe } from "../../styled-system"
import { DialogRoot, DialogRootProps } from "../dialog/dialog-root"
import { DrawerContextProvider, DrawerOptions } from "./drawer-context"
import { getDrawerPlacement } from "./get-placement"

export interface DrawerRootProps
  extends DrawerOptions,
    SystemRecipeProps<"Drawer">,
    Omit<
      DialogRootProps,
      | "scrollBehavior"
      | "motionPreset"
      | "isCentered"
      | keyof SystemRecipeProps<"Drawer">
    > {}

/**
 * The Drawer component is a panel that slides out from the edge of the screen.
 * It can be useful when you need users to complete a task or view some details without leaving the current page.
 *
 * @see Docs https://chakra-ui.com/docs/components/drawer
 */
export function DrawerRoot(props: DrawerRootProps) {
  const {
    isOpen,
    onClose,
    placement: placementProp = "right",
    children,
    ...rest
  } = props

  const theme = useTheme()
  const recipe = useSlotRecipe("Drawer")
  const placement = getDrawerPlacement(placementProp, theme.direction)

  return (
    <DrawerContextProvider value={{ placement }}>
      <DialogRoot isOpen={isOpen} onClose={onClose} recipe={recipe} {...rest}>
        {children}
      </DialogRoot>
    </DrawerContextProvider>
  )
}
