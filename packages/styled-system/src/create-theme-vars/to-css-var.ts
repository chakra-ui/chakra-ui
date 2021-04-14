import { analyzeBreakpoints, Dict } from "@chakra-ui/utils"
import type { WithCSSVar } from "../types"
import { createThemeVars } from "./create-theme-vars"
import {
  getTransformGpuTemplate,
  getTransformTemplate,
} from "./transform-template"
import { extractTokens, omitVars } from "./theme-tokens"

export function toCSSVar<T extends Dict>(rawTheme: T) {
  /**
   * In the case the theme has already been converted to css-var (e.g extending the theme),
   * we can omit the computed css vars and recompute it for the extended theme.
   */
  const theme = omitVars(rawTheme)

  // omit components and breakpoints from css variable map
  const tokens = extractTokens(theme)

  const cssVarPrefix = theme.config?.cssVarPrefix

  const {
    /**
     * This is more like a dictionary of tokens users will type `green.500`,
     * and their equivalent css variable.
     */
    cssMap,
    /**
     * The extracted css variables will be stored here, and used in
     * the emotion's <Global/> component to attach variables to `:root`
     */
    cssVars,
  } = createThemeVars(tokens, { cssVarPrefix })

  const defaultCssVars: Dict = {
    "--chakra-ring-offset": "0px",
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-width": "3px",
    "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
    "--chakra-ring-offset-shadow":
      "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
    "--chakra-ring-shadow":
      "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
    "--chakra-ring":
      "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
    "--chakra-transform-gpu": getTransformGpuTemplate(),
    "--chakra-transform": getTransformTemplate(),
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
  }

  Object.assign(theme, {
    __cssVars: { ...defaultCssVars, ...cssVars },
    __cssMap: cssMap,
    __breakpoints: analyzeBreakpoints(theme.breakpoints),
  })

  return theme as WithCSSVar<T>
}
