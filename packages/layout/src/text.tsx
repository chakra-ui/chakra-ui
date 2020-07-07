import { chakra, PropsOf } from "@chakra-ui/system/src"
import { __DEV__ } from "@chakra-ui/utils/src"

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
