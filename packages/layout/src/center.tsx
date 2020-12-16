import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export interface CenterProps extends HTMLChakraProps<"div"> {}

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/docs/layout/center
 */
export const Center = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})

if (__DEV__) {
  Center.displayName = "Center"
}
