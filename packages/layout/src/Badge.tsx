import { chakra, PropsOf } from "@chakra-ui/system"

export type BadgeProps = PropsOf<typeof Badge>

export const Badge = chakra("span", {
  themeKey: "Badge",
  baseStyle: {
    display: "inline-block",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
})
