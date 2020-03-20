import { parser as system } from "@chakra-ui/parser"
import createStyled from "./create-styled"
import { As, Options, Component } from "./styled.types"
import { pseudo, truncate, domElements, DOMElements } from "./styled.utils"

function styled<T extends As, P = {}>(component: T, options?: Options<T, P>) {
  return createStyled<T, P>(component, options)(system, pseudo, truncate)
}

type ChakraDOMComponents = {
  [Tag in DOMElements]: Component<Tag, {}>
}

type CreateChakraComponent = {
  <T extends As>(comp: T, options?: Options<T, {}>): Component<T, {}>
}

export const chakra = (styled as unknown) as CreateChakraComponent &
  ChakraDOMComponents

domElements.forEach(tag => {
  //@ts-ignore
  chakra[tag] = chakra(tag)
})
