export const deepMerge = (target: any, ...sources: any[]) => {
  const result = { ...target }
  sources.forEach((source) => {
    for (const key in source) {
      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key], source[key])
      } else {
        result[key] = source[key]
      }
    }
  })
  return result
}
