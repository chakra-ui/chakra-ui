export function split<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[],
) {
  const picked: Record<string, any> = {}
  const omitted: Record<string, any> = {}

  for (const [key, value] of Object.entries(object)) {
    if (keys.includes(key as T[K])) picked[key] = value
    else omitted[key] = value
  }

  return [picked, omitted] as [
    {
      [P in K]: T[P]
    },
    Omit<T, K>,
  ]
}
