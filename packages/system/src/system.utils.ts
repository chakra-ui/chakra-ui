import { isString, omit, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { ThemingProps } from "./system.types"

/**
 * All html and svg elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
export type DOMElements = keyof JSX.IntrinsicElements

export function omitThemingProps<T extends ThemingProps>(props: T) {
  return omit(props, ["styleConfig", "size", "variant", "colorScheme"])
}

export default function isTag(target: any) {
  return (
    isString(target) &&
    (__DEV__ ? target.charAt(0) === target.charAt(0).toLowerCase() : true)
  )
}

export function getDisplayName(primitive: any) {
  return isTag(primitive) ? `chakra.${primitive}` : getComponentName(primitive)
}

function getComponentName(primitive: React.ComponentType | string) {
  return (
    (__DEV__ ? isString(primitive) && primitive : false) ||
    (!isString(primitive) && primitive.displayName) ||
    (!isString(primitive) && primitive.name) ||
    "ChakraComponent"
  )
}
