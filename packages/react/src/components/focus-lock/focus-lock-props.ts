import { createProps, createSplitProps } from "../../utils"
import type { FocusLockProps } from "./focus-lock"

const focusLockProps = createProps<FocusLockProps>()([
  "initialFocusRef",
  "finalFocusRef",
  "contentRef",
  "restoreFocus",
  "disabled",
  "autoFocus",
  "persistentFocus",
  "lockFocusAcrossFrames",
])

export const splitFocusLockProps =
  createSplitProps<FocusLockProps>(focusLockProps)
