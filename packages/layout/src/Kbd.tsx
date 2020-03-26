import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type KbdProps = PropsOf<typeof Kbd>

export const Kbd = chakra("kbd", { themeKey: "Kbd" })

if (__DEV__) {
  Kbd.displayName = "Kbd"
}
