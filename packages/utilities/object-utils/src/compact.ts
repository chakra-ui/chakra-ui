export function compact<T extends Record<any, any>>(object: T) {
  const clone = Object.assign({}, object)
  for (let key in clone) {
    if (clone[key] === undefined) delete clone[key]
  }
  return clone
}
