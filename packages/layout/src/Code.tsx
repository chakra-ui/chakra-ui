import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type CodeProps = PropsOf<typeof Code>

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
