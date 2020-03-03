import { ThemeContext } from "@emotion/core"
import * as React from "react"
import createStyled from "./create-styled"
import { As, BaseTheme, StyledOptions, ChakraComponent } from "./styled.types"
import { domElements } from "./styled.utils"
import { parser, css, pseudoSelectors } from "@chakra-ui/parser"

function pseudo({ theme, ...props }: any) {
  let result = {}
  for (const prop in props) {
    if (prop in pseudoSelectors) {
      const style = css({ [prop]: props[prop] })(theme)
      result = { ...result, ...style }
    }
  }
  return result
}

function truncate({ isTruncated }: any) {
  if (isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }
  }
}

export function chakra<T extends BaseTheme>(theme: T) {
  function styled<C extends As, O extends StyledOptions<T>>(
    component: C,
    options?: O,
  ) {
    return createStyled(component, options)(parser, pseudo, truncate)
  }

  type AsFunction = <C extends As, O extends StyledOptions<T>>(
    component: C,
    options?: O,
  ) => ChakraComponent<C, T, O>

  type AsObject = {
    [C in keyof JSX.IntrinsicElements]: ChakraComponent<C, T, {}>
  }

  type Augmented = AsFunction & AsObject

  const augmented = (styled as unknown) as Augmented

  domElements.forEach(tag => {
    //@ts-ignore
    augmented[tag] = styled(tag)
  })

  const ThemeProvider: React.FC = ({ children }) => (
    <ThemeContext.Provider value={theme} children={children} />
  )

  const useTheme = () => React.useContext(ThemeContext) as T

  return { styled: augmented, ThemeProvider, useTheme }
}
