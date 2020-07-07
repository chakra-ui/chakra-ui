import { chakra, PropsOf } from "@chakra-ui/system/src"
import { __DEV__ } from "@chakra-ui/utils/src"

export type HeadingProps = PropsOf<typeof Heading>

export const Heading = chakra("h2", { themeKey: "Heading" })

if (__DEV__) {
  Heading.displayName = "Heading"
}
