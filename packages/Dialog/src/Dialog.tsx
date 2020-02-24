import { createChakra, SystemProps } from "@chakra-ui/system"
import { BaseDialogContent, BaseDialogOverlay } from "./Dialog.base"

export const DialogContent = createChakra(BaseDialogContent, {
  themeKey: "Dialog.Content",
  baseStyle: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    outline: 0,
  },
})

export const DialogOverlay = createChakra(BaseDialogOverlay, {
  themeKey: "Dialog.Overlay",
  baseStyle: {
    pos: "fixed",
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
  },
})
