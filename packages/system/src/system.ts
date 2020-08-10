import { systemProps, css } from "@chakra-ui/styled-system"
import createStyled from "@emotion/styled"
import { As, ChakraComponent } from "./system.types"
import {
  pseudoProps,
  truncateProp,
  extraProps,
  domElements,
  DOMElements,
  cast,
} from "./system.utils"
import { shouldForwardProp } from "./should-forward-prop"
import { Dict } from "@chakra-ui/utils"

interface Options {
  shouldForwardProp?(prop: string): boolean
  label?: string
  baseStyle?: any
}

const sxProp = cast((props: any) => css(props.sx)(props.theme))
const cssProp = (props: any) => props.css

const __css = cast((props: Dict) => {
  const result = {} as Dict
  for (const key in props.__css) {
    const exists = key in props
    if (!exists || props[key] == null) {
      result[key] = props.__css[key]
    }
  }
  return css(result)(props.theme)
})

const base = cast((baseStyle: any) => (props: any) =>
  css(baseStyle)(props.theme),
)

export function styled<T extends As, P = {}>(component: T, options?: Options) {
  const { baseStyle, ...styledOptions } = options || {}
  return createStyled(component as any, {
    ...styledOptions,
    shouldForwardProp,
  })(
    __css,
    base(baseStyle),
    cast(extraProps),
    cast(truncateProp),
    cast(systemProps),
    cast(pseudoProps),
    sxProp,
    cast(cssProp),
  ) as ChakraComponent<T, P>
}

type ChakraJSXElements = {
  [Tag in DOMElements]: ChakraComponent<Tag, {}>
}

type CreateChakraComponent = {
  <T extends As, P = {}>(component: T, options?: Options): ChakraComponent<T, P>
}

export const chakra = (styled as unknown) as CreateChakraComponent &
  ChakraJSXElements

domElements.forEach((tag) => {
  //@ts-ignore
  chakra[tag] = chakra(tag)
})
