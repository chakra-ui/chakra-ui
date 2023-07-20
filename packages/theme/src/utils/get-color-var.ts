import { getCSSVar } from "@chakra-ui/styled-system"
import { Dict } from "@chakra-ui/utils"

export const getColorVar = (theme: Dict, color: string, fallback?: string) => {
  return getCSSVar(theme, "colors", color) ?? fallback
}
