import * as React from "react"
import { BaseTheme, StyledOptions, As, AllProps, Styled } from "./styled.types"
import { jsx as emotion, ThemeContext } from "@emotion/core"
import { domElements } from "./styled.utils"

export function chakra<T extends BaseTheme>(theme: T) {
  function styled<C extends As, O extends StyledOptions<T>>(
    Comp: C,
    options?: O,
  ) {
    type Props = AllProps<C, T, O>

    const Styled = React.forwardRef((props: Props, ref: any) => {
      // const computedStyles = styledFn(Comp)(system, apply, theming, sx)
      // return jsx.apply(null, [Comp, { ...props, ref, css: computedStyles }]);
      return emotion.apply(null, [Comp, { ...props, ref }])
    })

    return Styled
  }

  const augmented = (styled as unknown) as Styled<typeof styled>

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
