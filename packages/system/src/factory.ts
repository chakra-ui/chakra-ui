import { DOMElements } from "./system.utils"
import { ChakraStyledOptions, HTMLChakraComponents, styled } from "./system"
import { As, ChakraComponent } from "./system.types"

type ChakraFactory = {
  <T extends As, P = {}>(
    component: T,
    options?: ChakraStyledOptions,
  ): ChakraComponent<T, P>
}

function factory() {
  const cache = new Map<DOMElements, ChakraComponent<DOMElements>>()

  return new Proxy(styled, {
    apply(target, thisArg, argArray: [DOMElements, ChakraStyledOptions]) {
      return styled(...argArray)
    },
    get(_, element: DOMElements) {
      if (!cache.has(element)) {
        cache.set(element, styled(element))
      }
      return cache.get(element)
    },
  }) as ChakraFactory & HTMLChakraComponents
}

export const chakra = factory()
