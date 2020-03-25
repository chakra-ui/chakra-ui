import { chakra, PropsOf } from "@chakra-ui/system"

export type TextProps = PropsOf<typeof Text>
export const Text = chakra("p", { themeKey: "Text" })
