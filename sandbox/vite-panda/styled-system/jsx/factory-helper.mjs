import { isCssProperty } from './is-valid-prop.mjs';

export const defaultShouldForwardProp = (prop, variantKeys) => !variantKeys.includes(prop) && !isCssProperty(prop)

export const composeShouldForwardProps = (tag, shouldForwardProp) =>
  tag.__shouldForwardProps__ && shouldForwardProp
    ? (propName) => tag.__shouldForwardProps__(propName) && shouldForwardProp(propName)
    : shouldForwardProp

export const composeCvaFn = (cvaA, cvaB) => {
  if (cvaA && !cvaB) return cvaA
  if (!cvaA && cvaB) return cvaB
  if ((cvaA.__cva__ && cvaB.__cva__) || (cvaA.__recipe__ && cvaB.__recipe__)) return cvaA.merge(cvaB)
  const error = new TypeError('Cannot merge cva with recipe. Please use either cva or recipe.')
  TypeError.captureStackTrace?.(error)
  throw error
}

export const getDisplayName = (Component) => {
  if (typeof Component === 'string') return Component
  return Component?.displayName || Component?.name || 'Component'
}