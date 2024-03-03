import { createProps, splitProps } from "@chakra-ui/utils"
import { ProgressOptions } from "./progress-types"

export const progressProps = createProps<ProgressOptions>()([
  "hasStripe",
  "isAnimated",
  "isIndeterminate",
  "max",
  "min",
  "value",
])

export const splitProgressProps = <T extends ProgressOptions>(props: T) => {
  return splitProps(props, progressProps) as [
    ProgressOptions,
    Omit<T, keyof ProgressOptions>,
  ]
}
