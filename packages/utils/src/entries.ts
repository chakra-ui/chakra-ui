export function mapEntries<A, B, K extends string | number | symbol>(
  obj: { [key in K]: A },
  f: (key: K, val: A) => [K, B],
): { [key in K]: B } {
  const result: { [key in K]: B } = {} as any
  for (const key in obj) {
    const kv = f(key, obj[key])
    result[kv[0]] = kv[1]
  }
  return result
}
