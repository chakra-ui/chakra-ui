import { createProps, createSplitProps } from "@chakra-ui/utils"
import type { ProgressOptions } from "./progress-types"

export const progressProps = createProps<ProgressOptions>()([
  "indeterminate",
  "max",
  "min",
  "value",
])

export const splitProgressProps =
  createSplitProps<ProgressOptions>(progressProps)
