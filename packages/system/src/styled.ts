import { parser as systemProps } from "@chakra-ui/parser"
import createStyled from "@emotion/styled"
import { As, ChakraComponent } from "./system.types"
import {
  pseudoProps,
  truncateProp,
  layerStyleProp,
  applyProp,
  domElements,
  DOMElements,
} from "./system.utils"

interface Options {
  shouldForwardProp?(prop: string): boolean
  label?: string
}

function styled<T extends As, P = {}>(component: T, options?: Options) {
  return createStyled(component as any, options)(
    systemProps as any,
    pseudoProps as any,
    layerStyleProp as any,
    truncateProp as any,
    applyProp as any,
  ) as ChakraComponent<T, P>
}

export default styled

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
