function replaceWhiteSpace(value: string, replaceValue = "-") {
  return value.replace(/\s+/g, replaceValue)
}

function escape(value: string | number) {
  const valueStr = replaceWhiteSpace(value.toString())
  if (valueStr.includes("\\.")) return value
  const isDecimal = !Number.isInteger(parseFloat(value.toString()))
  return isDecimal ? valueStr.replace(".", `\\.`) : value
}

export function addPrefix(value: string, prefix = "") {
  return [prefix, escape(value)].filter(Boolean).join("-")
}

export function toVarReference(name: string, fallback?: string) {
  return `var(${escape(name)}${fallback ? `, ${fallback}` : ""})`
}

export function toVarDefinition(value: string, prefix = "") {
  return `--${addPrefix(value, prefix)}`
}

export function cssVar(name: string, fallback?: string, cssVarPrefix?: string) {
  const cssVariable = toVarDefinition(name, cssVarPrefix)
  return {
    variable: cssVariable,
    reference: toVarReference(cssVariable, fallback),
  }
}
