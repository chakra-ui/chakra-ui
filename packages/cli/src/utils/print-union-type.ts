const AutoCompleteStringType = "(string & {})"

const wrapWithQuotes = (value: unknown) => `"${value}"`

export function printUnionType(values: string[], strict = false) {
  if (!values.length) {
    return strict ? "never" : AutoCompleteStringType
  }

  return values
    .map(wrapWithQuotes)
    .concat(strict ? [] : [AutoCompleteStringType])
    .join(" | ")
}
