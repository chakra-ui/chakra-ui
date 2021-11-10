import { Dict, isObject, isFunction } from "@chakra-ui/utils"
import { pseudoSelectors } from "./pseudo.selector"

export function parsePseudo(props: Dict) {
  const next: Dict = {}

  Object.keys(props).forEach((prop) => {
    const propValue = props[prop]
    const propName = prop in pseudoSelectors ? pseudoSelectors[prop] : prop

    if (isObject(propValue) && !isFunction(propValue)) {
      next[propName] = parsePseudo(propValue)
    } else {
      next[propName] = propValue
    }
  })

  return next
}
