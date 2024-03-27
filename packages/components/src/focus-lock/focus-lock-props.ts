import { createProps, createSplitProps } from "@chakra-ui/utils"
import { FocusLockProps } from "./focus-lock"

const focusLockProps = createProps<FocusLockProps>()([
  "initialFocusRef",
  "finalFocusRef",
  "contentRef",
  "restoreFocus",
  "isDisabled",
  "autoFocus",
  "persistentFocus",
  "lockFocusAcrossFrames",
])

export const splitFocusLockProps =
  createSplitProps<FocusLockProps>(focusLockProps)
