import { parser } from "@chakra-ui/parser"
import { ThemeContext } from "@emotion/core"
import * as React from "react"
import { As, JSXElements } from "./component.types"
import createStyled from "./create-styled"
import { ChakraComponent, Options } from "./styled.types"
import { domElements, pseudo, truncate } from "./styled.utils"

type StyledFunctionOrComponent = (<T extends As, P = {}>(
  component: T,
  options?: Options<T, P>,
) => ChakraComponent<T, P>) &
  { [T in JSXElements]: ChakraComponent<T, {}> }

function styled<T extends As, P = {}>(component: T, options?: Options<T, P>) {
  return createStyled(component, options)(parser, pseudo, truncate)
}

export const chakra = styled as StyledFunctionOrComponent
domElements.forEach(tag => {
  //@ts-ignore
  chakra[tag] = styled(tag)
})

export function createTheming<T extends object>(theme: T) {
  const ThemeProvider: React.FC = ({ children }) => {
    const outerTheme = React.useContext(ThemeContext)
    const mergedTheme = { ...outerTheme, ...theme }
    return <ThemeContext.Provider value={mergedTheme} children={children} />
  }

  function useTheme() {
    const theme = React.useContext(
      (ThemeContext as unknown) as React.Context<T | undefined>,
    )

    if (!theme) {
      throw Error("useTheme must be within a ThemeProvider")
    }

    return theme
  }

  return [ThemeProvider, useTheme] as const
}
