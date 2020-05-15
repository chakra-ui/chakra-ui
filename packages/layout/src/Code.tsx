import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export type CodeProps = PropsOf<typeof Code>

/**
 * React component to render inline code snippets.
 *
 * @see Docs https://chakra-ui.com/code
 */
export const Code = chakra("code", {
  themeKey: "Code",
  baseStyle: {
    display: "inline-block",
  },
  attrs: props => ({
    className: cx("chakra-code", props.className),
  }),
})

if (__DEV__) {
  Code.displayName = "Code"
}
