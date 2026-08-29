export { isObject } from "@chakra-ui/styled-system/helpers"

export const isCssVar = (v: string): boolean => /^var\(--.+\)$/.test(v)

export const isString = (v: any): v is string => typeof v === "string"

type AnyFunction = (...args: any[]) => any

export const isFunction = (v: any): v is AnyFunction => typeof v === "function"
