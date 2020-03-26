import { chakra, PropsOf } from "@chakra-ui/system"

export type CodeProps = PropsOf<typeof Code>

export const Code = chakra("code", {
  themeKey: "Code",
  baseStyle: {
    display: "inline-block",
    whiteSpace: "nowrap",
    verticalAlign: "top",
  },
})
