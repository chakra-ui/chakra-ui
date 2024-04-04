"use client"

import {
  SlotRecipeProps,
  UnstyledProp,
  useChakraContext,
} from "../../styled-system"
import { DialogRoot, DialogRootProps } from "../dialog/dialog-root"
import { DrawerContextProvider, DrawerOptions } from "./drawer-context"
import { getDrawerPlacement } from "./get-placement"

export interface DrawerRootProps
  extends DrawerOptions,
    SlotRecipeProps<"Drawer">,
    UnstyledProp,
    Omit<DialogRootProps, "motionPreset" | keyof SlotRecipeProps<"Drawer">> {}

/**
 * The Drawer component is a panel that slides out from the edge of the screen.
 * It can be useful when you need users to complete a task or view some details without leaving the current page.
 *
 * @see Docs https://chakra-ui.com/docs/components/drawer
 */
export function DrawerRoot(props: DrawerRootProps) {
  const {
    open,
    onClose,
    placement: placementProp = "right",
    children,
    ...rest
  } = props

  const sys = useChakraContext()
  const recipe = sys.getSlotRecipe("Drawer", props.recipe)
  const placement = getDrawerPlacement(placementProp, "ltr")

  return (
    <DrawerContextProvider value={{ placement }}>
      <DialogRoot open={open} onClose={onClose} recipe={recipe} {...rest}>
        {children}
      </DialogRoot>
    </DrawerContextProvider>
  )
}
