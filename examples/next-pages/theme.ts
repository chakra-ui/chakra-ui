import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
}

const theme = extendTheme({ config })

export default theme
