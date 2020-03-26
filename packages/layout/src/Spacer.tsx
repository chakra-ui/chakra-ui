import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type SpacerProps = PropsOf<typeof Spacer>

export const Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch",
  },
})

if (__DEV__) {
  Spacer.displayName = "Spacer"
}
