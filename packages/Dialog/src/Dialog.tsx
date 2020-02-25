import { createChakra } from "@chakra-ui/system"
import { BaseDialogOverlay } from "./Dialog.base"

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

export function getContentStyle(
  isCentered?: boolean,
  scrollBehavior?: "inside" | "outside",
) {
  let wrapperStyle = {}
  let contentStyle = {}

  if (isCentered) {
    wrapperStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  } else {
    contentStyle = {
      top: "3.75rem",
      mx: "auto",
    }
  }

  if (scrollBehavior === "inside") {
    wrapperStyle = {
      ...wrapperStyle,
      maxHeight: "calc(100vh - 7.5rem)",
      overflow: "hidden",
      top: "3.75rem",
    }

    contentStyle = {
      ...contentStyle,
      // height: "400px",
      top: 0,
    }
  }

  if (scrollBehavior === "outside") {
    wrapperStyle = {
      ...wrapperStyle,
      overflowY: "auto",
      overflowX: "hidden",
    }

    contentStyle = {
      ...contentStyle,
      marginY: "3.75rem",
      top: 0,
    }
  }

  return {
    contentStyle,
    wrapperStyle,
  }
}
