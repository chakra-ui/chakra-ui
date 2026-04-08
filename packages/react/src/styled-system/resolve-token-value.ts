export function resolveTokenValue(category: string, value: unknown): unknown {
  if (value == null || !Array.isArray(value)) {
    return value
  }

  switch (category) {
    case "easings":
      return `cubic-bezier(${value.join(", ")})`
    case "animations":
    case "fonts":
    case "gradients":
    case "shadows":
      return value.join(", ")
    default:
      return value
  }
}

export function resolveSemanticConditionValues(
  category: string,
  conditions: Record<string, unknown>,
): Record<string, unknown> {
  const next: Record<string, unknown> = {}
  for (const key in conditions) {
    next[key] = resolveTokenValue(category, conditions[key])
  }
  return next
}
