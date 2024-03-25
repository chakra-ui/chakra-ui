export interface Chunk {
  text: string
  match: boolean
}
export interface HighlightOptions {
  text: string
  query: string | string[]
}

const escapeRegexp = (term: string): string =>
  term.replace(/[|\\{}()[\]^$+*?.-]/g, (char: string) => `\\${char}`)

function buildRegex(query: string[]) {
  const _query = query
    .filter((text) => text.length !== 0)
    .map((text) => escapeRegexp(text.trim()))
  if (!_query.length) {
    return null
  }

  return new RegExp(`(${_query.join("|")})`, "ig")
}

export function highlightWords({ text, query }: HighlightOptions): Chunk[] {
  const regex = buildRegex(Array.isArray(query) ? query : [query])
  if (!regex) {
    return [{ text, match: false }]
  }
  const result = text.split(regex).filter(Boolean)
  return result.map((str) => ({ text: str, match: regex.test(str) }))
}
