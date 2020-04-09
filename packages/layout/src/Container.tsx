import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type ContainerProps = PropsOf<typeof chakra.div>

/**
 * Container
 *
 * Mostly used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep it's content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
export const Container = chakra("div", {
  baseStyle: {
    width: "100%",
    mx: "auto",
    maxWidth: "60ch",
    boxSizing: "content-box",
  },
})

if (__DEV__) {
  Container.displayName = "Container"
}
