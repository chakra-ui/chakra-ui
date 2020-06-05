import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type TextProps = PropsOf<typeof Text>

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/components/text
 */
export const Text = chakra("p", { themeKey: "Text" })

if (__DEV__) {
  Text.displayName = "Text"
}
