import { isString, isDev } from "@chakra-ui/utils"

/**
 * All html and svg elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
export type DOMElements = keyof JSX.IntrinsicElements

export default function isTag(target: any) {
  return (
    isString(target) &&
    (isDev() ? target.charAt(0) === target.charAt(0).toLowerCase() : true)
  )
}

export function getDisplayName(primitive: any) {
  return isTag(primitive) ? `chakra.${primitive}` : getComponentName(primitive)
}

function getComponentName(primitive: React.ComponentType | string) {
  return (
    (isDev() ? isString(primitive) && primitive : false) ||
    (!isString(primitive) && primitive.displayName) ||
    (!isString(primitive) && primitive.name) ||
    "ChakraComponent"
  )
}
