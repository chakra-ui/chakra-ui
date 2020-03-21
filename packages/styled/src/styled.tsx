import { parser as system } from "@chakra-ui/parser"
import createStyled from "./create-styled"
import { As, Options, ChakraComponent } from "./styled.types"
import { pseudo, truncate, domElements, DOMElements } from "./styled.utils"

function styled<T extends As, P = {}>(component: T, options?: Options<T, P>) {
  return createStyled<T, P>(component, options)(system, pseudo, truncate)
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
