import { useColorMode } from "@chakra-ui/color-mode"
import {
  css,
  SystemStyleObject,
  toCSSVar,
  WithCSSVar,
} from "@chakra-ui/styled-system"
import { Dict, memoizedGet as get, runIfFn } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"
import {
  Global,
  Interpolation,
  ThemeContext,
  ThemeProvider as EmotionThemeProvider,
  ThemeProviderProps as EmotionThemeProviderProps,
} from "@emotion/react"
import * as React from "react"

export interface ThemeProviderProps extends EmotionThemeProviderProps {
  cssVarsRoot?: string
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { cssVarsRoot, theme, children } = props
  const computedTheme = React.useMemo(() => toCSSVar(theme), [theme])
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

export const CSSVars = ({ root = ":host, :root" }: CSSVarsProps) => {
  /**
   * Append color mode selector to allow semantic tokens to change according to the color mode
   */
  const selector = [root, `[data-theme]`].join(",")
  return <Global styles={(theme: any) => ({ [selector]: theme.__cssVars })} />
}

export function useTheme<T extends object = Dict>() {
  const theme = React.useContext(
    ThemeContext as unknown as React.Context<T | undefined>,
  )
  if (!theme) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`",
    )
  }

  return theme as WithCSSVar<T>
}

const [StylesProvider, useStyles] = createContext<Dict<SystemStyleObject>>({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` ",
})
export { StylesProvider, useStyles }

/**
 * Applies styles defined in `theme.styles.global` globally
 * using emotion's `Global` component
 */
export const GlobalStyle = () => {
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
