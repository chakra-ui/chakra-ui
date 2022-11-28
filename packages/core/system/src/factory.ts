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
    /**
     * @example
     * const Div = chakra("div")
     * const WithChakra = chakra(AnotherComponent)
     */
    apply(target, thisArg, argArray: [DOMElements, ChakraStyledOptions]) {
      return styled(...argArray)
    },
    /**
     * @example
     * <chakra.div />
     */
    get(_, element: DOMElements) {
      if (!cache.has(element)) {
        cache.set(element, styled(element))
      }
      return cache.get(element)
    },
  }) as ChakraFactory & HTMLChakraComponents
}
/**
 * The Chakra factory serves as an object of chakra enabled JSX elements,
 * and also a function that can be used to enable custom component receive chakra's style props.
 *
 * @see Docs https://chakra-ui.com/docs/styled-system/chakra-factory
 */
export const chakra = factory()
