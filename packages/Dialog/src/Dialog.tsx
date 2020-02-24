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

// TODO: Move this style to the Dialog.ts in theme
export function getBaseStyle(props: {
  isCentered?: boolean
  scrollBehavior?: "inside" | "outside"
}) {
  const { isCentered, scrollBehavior } = props

  let style: SystemProps = {}

  if (isCentered) {
    style = {
      ...style,
      left: "50%",
      top: "50%",
      transform: "translate3d(-50%, -50%, 0)",
    }
  } else {
    style = {
      ...style,
      left: "50%",
      transform: "translateX(-50%)",
      top: "3.75rem",
      mx: "auto",
    }
  }

  if (scrollBehavior === "inside") {
    style = {
      ...style,
      maxHeight: "calc(100vh - 7.5rem)",
      height: "100%",
      overflow: "hidden",
      top: "3.75rem",
    }
  }

  if (scrollBehavior === "outside") {
    style = {
      ...style,
      overflowY: "auto",
      overflowX: "hidden",
      marginY: "3.75rem",
      top: 0,
    }
  }

  return style
}
