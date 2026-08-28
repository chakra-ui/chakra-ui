export const EMPTY_OBJECT = Object.freeze(Object.create(null))

export const EMPTY_ARRAY = Object.freeze([]) as readonly any[]

export function createEmptyObject() {
  return Object.create(null)
}

export function getEmptyObject(mutable = false) {
  return mutable ? createEmptyObject() : EMPTY_OBJECT
}
