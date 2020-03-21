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
  <T extends As>(comp: T, options?: Options<T, {}>): ChakraComponent<T, {}>
}

/**
 * The styled function and object that allows to create a
 * functional component that can receive chakra's style props.
 *
 * @example
 *
 * ```jsx
 * // Use it as a styled function
 * const Button = chakra("button", { themeKey: "Button" });
 *
 * // Or simply chakra.<element>
 * const App = () => (
 *   <chakra.div>
 *     <Button>Click me</Button>
 *   </chakra.div>
 * )
 * ```
 *
 * @param component - The base component or tag to render
 * @param baseStyle - The initial styles to apply (accepts chakra styles)
 * @param attrs - The initial props to the component (valid html or component props)
 */
export const chakra = (styled as unknown) as CreateChakraComponent &
  ChakraJSXElements

domElements.forEach(tag => {
  //@ts-ignore
  chakra[tag] = chakra(tag)
})
