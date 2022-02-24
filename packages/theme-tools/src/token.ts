import { Dict } from "@chakra-ui/utils"

export function getToken(
  theme: Dict,
  token: string,
  fallback?: string | number,
) {
  const cssVar = theme.__cssMap?.[token]
  return cssVar?.reference ?? fallback
}
