function replaceWhiteSpace(value: string, replaceValue = "-") {
  return value.replace(/\s+/g, replaceValue)
}

function escape(value: string | number) {
  const valueStr = replaceWhiteSpace(value.toString())

  return escapeSymbol(escapeDot(valueStr))
}

function escapeDot(value: string) {
  if (value.includes("\\.")) return value
  const isDecimal = !Number.isInteger(parseFloat(value.toString()))
  return isDecimal ? value.replace(".", `\\.`) : value
}

function escapeSymbol(value: string) {
  return value.replace(/[!-,/:-@[-^`{-~]/g, "\\$&")
}

export function addPrefix(value: string, prefix = "") {
  return [prefix, value].filter(Boolean).join("-")
}

export function toVarReference(name: string, fallback?: string) {
  return `var(${name}${fallback ? `, ${fallback}` : ""})`
}

export function toVarDefinition(value: string, prefix = "") {
  return escape(`--${addPrefix(value, prefix)}`)
}

export function cssVar(name: string, fallback?: string, cssVarPrefix?: string) {
  const cssVariable = toVarDefinition(name, cssVarPrefix)
  return {
    variable: cssVariable,
    reference: toVarReference(cssVariable, fallback),
  }
}
