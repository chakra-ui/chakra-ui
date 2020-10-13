import { memoizedGet as get } from "@chakra-ui/utils"
import { useTheme } from "@chakra-ui/system"

/**
 * Hook to resolve design tokens from the theme as actual css colors
 */
export const useColors = (...args: string[]): string[] => {
  const { colors } = useTheme()

  return args.map((arg) => get(colors, arg))
}
