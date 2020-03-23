import { chakra } from "@chakra-ui/styled"

export const Code = chakra("code", { themeKey: "Code" })

Code.defaultProps = {
  colorScheme: "gray",
  variant: "subtle",
}
