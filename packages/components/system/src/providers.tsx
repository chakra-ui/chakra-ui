import { useColorMode } from "@chakra-ui/color-mode"
import { createContext, CreateContextReturn } from "@chakra-ui/react-utils"
import { css, toCSSVar, SystemStyleObject } from "@chakra-ui/styled-system"
import { memoizedGet as get, runIfFn } from "@chakra-ui/utils"
import {
  Global,
  Interpolation,
  ThemeProvider as EmotionThemeProvider,
  ThemeProviderProps as EmotionThemeProviderProps,
} from "@emotion/react"
import { useMemo } from "react"

export interface ThemeProviderProps extends EmotionThemeProviderProps {
  cssVarsRoot?: string
}

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const { cssVarsRoot, theme, children } = props
  const computedTheme = useMemo(() => toCSSVar(theme), [theme])
  return (
    <EmotionThemeProvider theme={computedTheme}>
      <CSSVars root={cssVarsRoot} />
      {children}
    </EmotionThemeProvider>
  )
}

export interface CSSVarsProps {
  /**
   * The element to attach the CSS custom properties to.
   * @default ":host, :root"
   */
  root?: string
}

export function CSSVars({ root = ":host, :root" }: CSSVarsProps): JSX.Element {
  /**
   * Append color mode selector to allow semantic tokens to change according to the color mode
   */
  const selector = [root, `[data-theme]`].join(",")
  return <Global styles={(theme: any) => ({ [selector]: theme.__cssVars })} />
}

/**
 * @deprecated - Prefer to use `createStylesContext` to provide better error messages
 *
 * @example
 *
 * ```jsx
 * import { createStylesContext } from "@chakra-ui/react"
 *
 * const [StylesProvider, useStyles] = createStylesContext("Component")
 * ```
 */
const [StylesProvider, useStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` ",
})

export { StylesProvider, useStyles }

/**
 * Helper function that creates context with a standardized errorMessage related to the component
 * @param componentName
 * @returns [StylesProvider, useStyles]
 */
export function createStylesContext(
  componentName: string,
): CreateStyleContextReturn {
  return createContext<Record<string, SystemStyleObject>>({
    name: `${componentName}StylesContext`,
    errorMessage: `useStyles: "styles" is undefined. Seems you forgot to wrap the components in "<${componentName} />" `,
  })
}

export type CreateStyleContextReturn = CreateContextReturn<
  Record<string, SystemStyleObject>
>

/**
 * Applies styles defined in `theme.styles.global` globally
 * using emotion's `Global` component
 */
export function GlobalStyle(): JSX.Element {
  const { colorMode } = useColorMode()
  return (
    <Global
      styles={(theme: any) => {
        const styleObjectOrFn = get(theme, "styles.global")
        const globalStyles = runIfFn(styleObjectOrFn, { theme, colorMode })
        if (!globalStyles) return undefined
        const styles = css(globalStyles)(theme)
        return styles as Interpolation<{}>
      }}
    />
  )
}
