import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type CodeProps = PropsOf<typeof Code>

/**
 * Code
 *
 * React component to render inline code snippets.
 *
 * @see Docs https://chakra-ui.com/code
 */
export const Code = chakra("code", {
  themeKey: "Code",
  baseStyle: {
    display: "inline-block",
    whiteSpace: "nowrap",
    verticalAlign: "top",
  },
})

if (__DEV__) {
  Code.displayName = "Code"
}
