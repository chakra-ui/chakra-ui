export type MapToRecord<K extends Map<string, any>> = {
  [P in keyof K]: K[P] extends Map<string, infer V> ? Record<string, V> : never
}

export function mapToJson<T extends Map<string, any>>(map: T): MapToRecord<T> {
  const obj: Record<string, unknown> = {}

  map.forEach((value, key) => {
    if (value instanceof Map) {
      obj[key] = Object.fromEntries(value)
    } else {
      obj[key] = value
    }
  })

  return obj as any
}
