import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type BoxProps = PropsOf<typeof Box>

export const Box = chakra.div

if (__DEV__) {
  Box.displayName = "Box"
}
