import { Dict, memoize, isObject, isFunction } from "@chakra-ui/utils"
import { pseudoSelectors, Pseudos } from "./pseudo.selector"

const isPseudoProp = (prop: string): prop is keyof Pseudos =>
  prop in pseudoSelectors

const getPropName = memoize((prop: string) =>
  isPseudoProp(prop) ? pseudoSelectors[prop] : prop,
)

export function parsePseudo(props: Dict) {
  const next: Dict = {}

  for (const prop in props) {
    const propValue = props[prop]
    const propName = getPropName(prop)

    if (isObject(propValue) && !isFunction(propValue)) {
      next[propName] = parsePseudo(propValue)
    } else {
      next[propName] = propValue
    }
  }

  return next
}
