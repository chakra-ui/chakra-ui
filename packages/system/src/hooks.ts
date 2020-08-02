import { useColorMode } from "@chakra-ui/color-mode"
import { Dict, get, StringOrNumber } from "@chakra-ui/utils"
import { useTheme } from "./providers"

export function useChakra<T extends Dict = Dict>() {
  const { colorMode, toggleColorMode } = useColorMode()
  const theme = useTheme() as T
  return { colorMode, toggleColorMode, theme }
}

export function useToken(
  scale: string,
  token: StringOrNumber,
  fallback?: StringOrNumber,
) {
  const theme = useTheme()
  const path = `${scale}.${token}`
  return get(theme, path, fallback ?? token)
}
