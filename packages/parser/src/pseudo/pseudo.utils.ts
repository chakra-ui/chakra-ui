import { Dict, isFunction, isObject, memoizeOne } from "@chakra-ui/utils"
import { pseudoSelectors } from "./pseudo.selector"

const toPseudoSelector = memoizeOne((prop: string) =>
  prop in pseudoSelectors ? pseudoSelectors[prop] : prop,
)

export function parsePseudo(props: Dict) {
  const next: Dict = {}

  for (const prop in props) {
    const propValue = props[prop]
    const propName = toPseudoSelector(prop)

    if (isObject(propValue) && !isFunction(propValue)) {
      next[propName] = parsePseudo(propValue)
    } else {
      next[propName] = propValue
    }
  }

  return next
}
