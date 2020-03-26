import { chakra, PropsOf } from "@chakra-ui/system"

export type KbdProps = PropsOf<typeof Kbd>

export const Kbd = chakra("kbd", { themeKey: "Kbd" })
