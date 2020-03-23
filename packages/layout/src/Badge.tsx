import { chakra } from "@chakra-ui/system"

export const Badge = chakra("div", { themeKey: "Badge" })

Badge.defaultProps = {
  variant: "subtle",
  colorScheme: "gray",
}
