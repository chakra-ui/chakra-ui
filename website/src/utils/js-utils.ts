export type MixedArray = string | Array<string | string[]>

export function toArray(slug: MixedArray) {
  const res = Array.isArray(slug) ? slug.flat() : [slug]
  return res.filter(Boolean)
}

export function uniq<T>(c: T[]) {
  return [...new Set(c)]
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export function groupBy(arr, criteria) {
  return arr.reduce(function (obj, item) {
    // Check if the criteria is a function to run on the item or a property of it
    const key = typeof criteria === 'function' ? criteria(item) : item[criteria]

    // If the key doesn't exist yet, create it
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(key)) {
      obj[key] = []
    }

    // Push the value to the object
    obj[key].push(item)

    // Return the object to the next item in the loop
    return obj
  }, {})
}
