import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type CenterProps = PropsOf<typeof Center>

/**
 * Center
 *
 * Used to horizontally and vertically center its child within itself.
 *
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/center
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
