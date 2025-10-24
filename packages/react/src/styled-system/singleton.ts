/**
 * Singleton empty objects to avoid repeated object creation in hot paths
 */

export const EMPTY_OBJECT = Object.freeze(Object.create(null))

export const EMPTY_ARRAY = Object.freeze([]) as readonly any[]

/**
 * Create a new empty object only when needed for mutation
 */
export function createEmptyObject() {
  return Object.create(null)
}

/**
 * Returns either the singleton EMPTY_OBJECT or creates a new one if mutation is needed
 */
export function getEmptyObject(mutable = false) {
  return mutable ? createEmptyObject() : EMPTY_OBJECT
}
