import __theme from "@chakra-ui/theme"
import { toCSSVar } from "@chakra-ui/styled-system"

export function createTheme(theme: any) {
  return toCSSVar({
    ...theme,
    breakpoints: __theme.breakpoints,
  })
}
