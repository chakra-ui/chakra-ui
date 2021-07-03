import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export interface SpacerProps extends HTMLChakraProps<"div"> {}

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 *
 * @see Docs https://chakra-ui.com/flex#using-the-spacer
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
