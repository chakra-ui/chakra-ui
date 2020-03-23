import { chakra } from "@chakra-ui/styled"

export const Badge = chakra("div", { themeKey: "Badge" })

Badge.defaultProps = {
  variant: "subtle",
  colorScheme: "gray",
}
