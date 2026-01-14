import {
  isHtmlProp as isHtmlPropCore,
  resolveProps,
} from "@chakra-ui/system-core"
import { useMemo } from "react"
import { useChakraContext } from "./provider"

// Re-export isHtmlProp from system-core for backward compatibility
export const isHtmlProp = isHtmlPropCore

interface ResolvedPropsResult {
  styles: Record<string, any>
  props: Record<string, any>
}

/**
 * React hook that wraps the framework-agnostic resolveProps function
 * with React-specific memoization.
 *
 * This hook uses @chakra-ui/system-core for the core resolution logic,
 * ensuring consistency with other framework implementations (Vue, etc).
 */
export function useResolvedProps(
  inProps: any,
  cvaRecipe: any,
  shouldForwardProps: any,
): ResolvedPropsResult {
  const { css, isValidProperty } = useChakraContext()

  return useMemo(() => {
    return resolveProps({
      props: inProps,
      recipe: cvaRecipe,
      shouldForwardProp: shouldForwardProps,
      css,
      isValidProperty,
    })
  }, [inProps, cvaRecipe, shouldForwardProps, css, isValidProperty])
}
