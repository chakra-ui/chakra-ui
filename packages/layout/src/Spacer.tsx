import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type SpacerProps = PropsOf<typeof Spacer>

/**
 * Spacer
 *
 * Spacer creates an adjustable, empty `div` that
 * can be used to tune the spacing between elements
 * in a flex container.
 *
 * It will take up any available space.
 *
 * @see Docs https://chakra-ui.com/spacer
 */
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
