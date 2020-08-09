import {
  ColorModeProvider,
  useColorMode,
  StorageManager,
} from "@chakra-ui/color-mode"
import { css, SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext, Dict, get, merge, runIfFn } from "@chakra-ui/utils"
import { PortalManager, PortalManagerProps } from "@chakra-ui/portal"
import { CSSReset } from "@chakra-ui/css-reset"
import { Global, Interpolation, ThemeContext } from "@emotion/core"
import * as React from "react"

export interface ThemeProviderProps {
  children?: React.ReactNode
  theme: Dict
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children, theme } = props
  const outerTheme = React.useContext(ThemeContext) as Dict
  const mergedTheme = merge({}, outerTheme, theme)

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme<T extends object = Dict>() {
  const theme = React.useContext(
    (ThemeContext as unknown) as React.Context<T | undefined>,
  )
  if (!theme) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />`",
    )
  }

  return theme
}

export interface ChakraProviderProps extends ThemeProviderProps {
  storageManager?: StorageManager
  portalConfig?: Omit<PortalManagerProps, "children">
  resetCSS?: boolean
}

export const ChakraProvider: React.FC<ChakraProviderProps> = (props) => {
  const { theme, children, storageManager, resetCSS, portalConfig } = props

  if (!theme) {
    throw Error("ChakraProvider: the `theme` prop is required")
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        defaultValue={theme?.config?.initialColorMode}
        useSystemColorMode={theme?.config?.useInitialColorMode}
        storageManager={storageManager}
      >
        <GlobalStyle />
        {resetCSS && <CSSReset />}
        {portalConfig ? (
          <PortalManager zIndex={portalConfig?.zIndex}>
            {children}
          </PortalManager>
        ) : (
          children
        )}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const [StylesProvider, useStyles] = createContext<Dict<SystemStyleObject>>({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` ",
})

export { StylesProvider, useStyles }

export const GlobalStyle = () => {
  const { colorMode } = useColorMode()
  return (
    <Global
      styles={(theme) => {
        const styleObjectOrFn = get(theme, "styles.global")
        const bodyStyles = runIfFn(styleObjectOrFn, { theme, colorMode })
        if (!bodyStyles) return
        const styles = css({ body: bodyStyles })(theme)
        return styles as Interpolation
      }}
    />
  )
}
