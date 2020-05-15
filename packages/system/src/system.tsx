import { parser as systemProps } from "@chakra-ui/parser"
import createStyled from "./create-styled"
import { As, ChakraComponent, Options } from "./system.types"
import {
  applyProp,
  domElements,
  DOMElements,
  pseudoProps,
  truncateProp,
  layerStyleProp,
} from "./system.utils"

function styled<T extends As, P = {}>(component: T, options?: Options<T, P>) {
  return createStyled<T, P>(component, options)(
    systemProps,
    pseudoProps,
    applyProp(component),
    truncateProp,
    layerStyleProp,
  )
}

type ChakraJSXElements = {
  [Tag in DOMElements]: ChakraComponent<Tag, {}>
}

type CreateChakraComponent = {
  /**
   * The styled function and object that allows to create a
   * functional component that can receive chakra's style props.
   *
   * @param component - The base component or tag to render
   * @param baseStyle - The initial styles to apply (accepts chakra styles)
   * @param attrs - The initial props to the component (valid html or component props)
   */
  <T extends As, P = {}>(
    component: T,
    options?: Options<T, P>,
  ): ChakraComponent<T, P>
}

export const chakra = (styled as unknown) as CreateChakraComponent &
  ChakraJSXElements

domElements.forEach(tag => {
  //@ts-ignore
  chakra[tag] = chakra(tag)
})
