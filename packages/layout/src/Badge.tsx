import { chakra, PropsOf } from "@chakra-ui/system"

export type BadgeProps = PropsOf<typeof Badge>

export const Badge = chakra("div", { themeKey: "Badge" })
