import { parser as systemProps } from "@chakra-ui/parser"
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
import css from "@chakra-ui/css"

interface Options {
  shouldForwardProp?(prop: string): boolean
  label?: string
  baseStyle?: any
}

const sxProp = cast((props: any) => css(props.sx)(props.theme))
const cssProp = (props: any) => props.css
const __css = cast((props: any) => css(props.__css)(props.theme))
const base = cast((baseStyle: any) => (props: any) =>
  css(baseStyle)(props.theme),
)

function styled<T extends As, P = {}>(component: T, options?: Options) {
  const { baseStyle, ...styledOptions } = options || {}
  return createStyled(component as any, styledOptions)(
    __css,
    base(baseStyle),
    cast(systemProps),
    cast(pseudoProps),
    cast(extraProps),
    cast(truncateProp),
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
