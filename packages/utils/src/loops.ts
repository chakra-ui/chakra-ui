// Credits goes to: https://github.com/codemix/fast.js for this one

import { isDefined, isFunction } from "./assertion"
import { Dict } from "./types"

function _bind(func: Function, thisContext: Function) {
  return function(...args: any[]) {
    return func.call(thisContext, ...args)
  }
}

type ObjectMapper<T extends object> = (
  value: T[keyof T],
  key: keyof T,
  obj: T,
) => any

/**
 * # Map
 *
 * A fast object `.map()` implementation.
 *
 * @param  {Object}   obj     The object to map over.
 * @param  {Function} fn          The mapper function.
 * @param  {Object}   thisContext The context for the mapper.
 */
export function objectMap<T extends object>(
  obj: T,
  fn: ObjectMapper<T>,
  thisContext: Function,
) {
  const keys = Object.keys(obj)
  const length = keys.length

  const result: Dict = {}
  const mapper = isDefined(thisContext) ? _bind(fn, thisContext) : fn

  let i: number
  let key: string

  for (i = 0; i < length; i++) {
    key = keys[i]
    //@ts-ignore
    result[key] = mapper(obj[key], key, obj)
  }

  return result
}

/**
 * A fast `Object.values()` alternative
 *
 * @param  {Object} obj The object to values keys for.
 */
export function objectValues<T extends object>(obj: T) {
  const keys = Object.keys(obj)
  const length = keys.length

  const values = new Array(length)
  let i: number

  for (i = 0; i < length; i++) {
    //@ts-ignore
    values[i] = obj[keys[i]]
  }
  return values as T[keyof T][]
}

/**
 * Object.keys() shim for ES3 environments.
 *
 * @param  {Object} obj The object to get keys for.
 */
export function objectKeys<T extends object>(obj: T) {
  if (isFunction(Object.keys)) {
    return (Object.keys(obj) as unknown) as (keyof T)[]
  }

  const keys: any[] = []

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(key)
    }
  }

  return (keys as unknown) as (keyof T)[]
}

/**
 * # For Each
 *
 * A fast object `.forEach()` implementation.
 *
 * @param  {Object}   obj     The object to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
export function objectForEach<T extends object>(
  obj: T,
  fn: ObjectMapper<T>,
  thisContext: Function,
) {
  const keys = Object.keys(obj)
  const length = keys.length

  const mapper = isDefined(thisContext) ? _bind(fn, thisContext) : fn
  let key: string
  let i: number

  for (i = 0; i < length; i++) {
    key = keys[i]
    //@ts-ignore
    mapper(obj[key], key, obj)
  }
}

/**
 * # Index Of
 *
 * A faster `Array.prototype.indexOf()` implementation.
 *
 * @param  {Array}  arr   The array (or array-like) to search within.
 * @param  {mixed}  value    The target item to search for.
 * @param  {Number} fromIndex The position to start searching from, if known.
 */
export function arrayIndexOf<T = any>(arr: T[], value: T, fromIndex: number) {
  let i = 0
  const length = arr.length

  if (typeof fromIndex === "number") {
    i = fromIndex
    if (i < 0) {
      i += length
      if (i < 0) {
        i = 0
      }
    }
  }

  for (; i < length; i++) {
    if (arr[i] === value) {
      return i
    }
  }
  return -1
}

type ArrayMapper<T extends any[]> = (
  value: T[number],
  index: number,
  arr: T,
) => any

/**
 * # For Each
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array}    arr     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
export function arrayForEach<T extends any[]>(
  arr: T,
  fn: ArrayMapper<T>,
  thisContext: Function,
) {
  const mapper = isDefined(thisContext) ? _bind(fn, thisContext) : fn
  let i: number
  const length = arr.length

  for (i = 0; i < length; i++) {
    mapper(arr[i], i, arr)
  }
}

/**
 * # Filter
 *
 * A fast `.filter()` implementation.
 *
 * @param  {Array}    arr     The array (or array-like) to filter.
 * @param  {Function} fn          The filter function.
 * @param  {Object}   thisContext The context for the filter.
 */
export function arrayFilter<T extends any[]>(
  arr: T,
  fn: ArrayMapper<T>,
  thisContext: Function,
) {
  const result = []
  const mapper = isDefined(thisContext) ? _bind(fn, thisContext) : fn
  let i: number
  const length = arr.length

  for (i = 0; i < length; i++) {
    if (mapper(arr[i], i, arr)) {
      result.push(arr[i])
    }
  }
  return result as T
}

/**
 * # Map
 *
 * A fast `.map()` implementation.
 *
 * @param  {Array}    arr     The array (or array-like) to map over.
 * @param  {Function} fn          The mapper function.
 * @param  {Object}   thisContext The context for the mapper.
 */
export function arrayMap<T extends any[]>(
  arr: T,
  fn: ArrayMapper<T>,
  thisContext: Function,
) {
  const length = arr.length
  const result = new Array(length)

  const mapper = isDefined(thisContext) ? _bind(fn, thisContext) : fn
  let i: number

  for (i = 0; i < length; i++) {
    result[i] = mapper(arr[i], i, arr)
  }
  return result as T
}
