/**
 * Fuzzy scoring adapted from fzy (MIT, John Hawthorn).
 */

const GAP_LEADING = -0.005
const GAP_TRAILING = -0.005
const GAP_INNER = -0.01
const MATCH_CONSECUTIVE = 1
const MATCH_SLASH = 0.9
const MATCH_WORD = 0.8
const MATCH_CAPITAL = 0.7
const MATCH_DOT = 0.6

const KEYWORD_WEIGHT = 0.9
const PER_WORD_WEIGHT = 0.95
const MAX_LENGTH = 256

const DIACRITICS = /[̀-ͯ]/g
const WHITESPACE = /\s+/

export interface PreparedText {
  codes: Uint16Array
  bonus: Float32Array
  mask: number
}

export interface PreparedCommand {
  label: PreparedText
  keywords: PreparedText[]
}

const normalize = (value: string) =>
  value.normalize("NFD").replace(DIACRITICS, "").slice(0, MAX_LENGTH)

const charMask = (code: number) => {
  if (code >= 97 && code <= 122) return 1 << (code - 97)
  if (code >= 48 && code <= 57) return 1 << 26
  return 0
}

const isLower = (code: number) =>
  (code >= 97 && code <= 122) || (code >= 48 && code <= 57)

const isUpper = (code: number) => code >= 65 && code <= 90

const matchBonus = (last: number, code: number) => {
  if (!isLower(code) && !isUpper(code)) return 0
  if (last === -1 || last === 47) return MATCH_SLASH // start or "/"
  if (last === 32 || last === 45 || last === 95) return MATCH_WORD // " " "-" "_"
  if (last === 46) return MATCH_DOT // "."
  if (isUpper(code) && last >= 97 && last <= 122) return MATCH_CAPITAL
  return 0
}

/**
 * Normalizes text and precomputes its match bonuses.
 */
export function prepareText(text: string): PreparedText {
  const raw = normalize(text)
  const lower = raw.toLowerCase()
  const codes = new Uint16Array(lower.length)
  const bonus = new Float32Array(lower.length)
  let mask = 0
  let last = -1
  for (let i = 0; i < lower.length; i++) {
    codes[i] = lower.charCodeAt(i)
    mask |= charMask(codes[i])
    const code = raw.charCodeAt(i)
    bonus[i] = matchBonus(last, code)
    last = code
  }
  return { codes, bonus, mask }
}

export function prepareCommand(
  label: string,
  keywords?: readonly string[] | undefined,
): PreparedCommand {
  return {
    label: prepareText(label),
    keywords: keywords?.map(prepareText) ?? [],
  }
}

interface PreparedQuery {
  codes: Uint16Array
  mask: number
}

function prepareQuery(query: string): PreparedQuery {
  const lower = normalize(query).toLowerCase()
  const codes = new Uint16Array(lower.length)
  let mask = 0
  for (let i = 0; i < lower.length; i++) {
    codes[i] = lower.charCodeAt(i)
    mask |= charMask(codes[i])
  }
  return { codes, mask }
}

const bestEndingHere = new Float64Array(MAX_LENGTH)
const bestSoFar = new Float64Array(MAX_LENGTH)

function scoreText(query: PreparedQuery, target: PreparedText): number {
  const qc = query.codes
  const tc = target.codes
  const n = qc.length
  const m = tc.length

  if (n === 0) return 1
  if (n > m || (query.mask & target.mask) !== query.mask) return 0

  let k = 0
  for (let j = 0; j < m && k < n; j++) if (tc[j] === qc[k]) k++
  if (k < n) return 0
  if (n === m) return 1

  const D = bestEndingHere
  const M = bestSoFar
  const bonus = target.bonus

  for (let i = 0; i < n; i++) {
    const gap = i === n - 1 ? GAP_TRAILING : GAP_INNER
    const ch = qc[i]
    let prevScore = -Infinity
    let prevD = -Infinity
    let prevM = -Infinity

    for (let j = 0; j < m; j++) {
      const lastD = D[j]
      const lastM = M[j]
      if (tc[j] === ch) {
        let score = -Infinity
        if (i === 0) {
          score = j * GAP_LEADING + bonus[j]
        } else if (j > 0) {
          const jump = prevM + bonus[j]
          const consecutive = prevD + MATCH_CONSECUTIVE
          score = jump > consecutive ? jump : consecutive
        }
        D[j] = score
        const gapped = prevScore + gap
        M[j] = prevScore = score > gapped ? score : gapped
      } else {
        D[j] = -Infinity
        M[j] = prevScore = prevScore + gap
      }
      prevD = lastD
      prevM = lastM
    }
  }

  const raw = M[m - 1]
  if (raw === -Infinity) return 0
  return 1 / (1 + Math.exp(-raw))
}

function scoreCommand(query: PreparedQuery, command: PreparedCommand) {
  let best = scoreText(query, command.label)
  for (const keyword of command.keywords) {
    const score = scoreText(query, keyword) * KEYWORD_WEIGHT
    if (score > best) best = score
  }
  return best
}

/**
 * Prepares a query once and returns a scorer for prepared commands, from 0
 * (no match) to 1 (exact). Each space-separated word must match the label or
 * a keyword.
 */
export function createCommandMatcher(
  query: string,
): (command: PreparedCommand) => number {
  const trimmed = query.trim()
  if (!trimmed) return () => 1

  const whole = prepareQuery(trimmed)
  const words = trimmed.split(WHITESPACE)
  const parts = words.length > 1 ? words.map(prepareQuery) : null

  return (command) => {
    let best = scoreCommand(whole, command)
    if (!parts) return best
    let total = 0
    for (const part of parts) {
      const score = scoreCommand(part, command)
      if (score === 0) return best
      total += score
    }
    const perWord = (total / parts.length) * PER_WORD_WEIGHT
    return perWord > best ? perWord : best
  }
}

function matchPositions(
  query: PreparedQuery,
  target: PreparedText,
): number[] | null {
  const qc = query.codes
  const tc = target.codes
  const n = qc.length
  const m = tc.length
  if (n === 0 || scoreText(query, target) === 0) return null
  if (n === m) return Array.from({ length: n }, (_, i) => i)

  const D = new Float64Array(n * m)
  const M = new Float64Array(n * m)
  const bonus = target.bonus

  for (let i = 0; i < n; i++) {
    const gap = i === n - 1 ? GAP_TRAILING : GAP_INNER
    let prevScore = -Infinity
    for (let j = 0; j < m; j++) {
      const at = i * m + j
      if (tc[j] === qc[i]) {
        let score = -Infinity
        if (i === 0) {
          score = j * GAP_LEADING + bonus[j]
        } else if (j > 0) {
          const jump = M[at - m - 1] + bonus[j]
          const consecutive = D[at - m - 1] + MATCH_CONSECUTIVE
          score = jump > consecutive ? jump : consecutive
        }
        D[at] = score
        const gapped = prevScore + gap
        M[at] = prevScore = score > gapped ? score : gapped
      } else {
        D[at] = -Infinity
        M[at] = prevScore = prevScore + gap
      }
    }
  }

  const positions = new Array<number>(n)
  let matchRequired = false
  for (let i = n - 1, j = m - 1; i >= 0; i--) {
    for (; j >= 0; j--) {
      const at = i * m + j
      if (D[at] !== -Infinity && (matchRequired || D[at] === M[at])) {
        matchRequired =
          i > 0 && j > 0 && M[at] === D[at - m - 1] + MATCH_CONSECUTIVE
        positions[i] = j--
        break
      }
    }
  }
  return positions
}

/**
 * Returns the `[start, end)` ranges of `text` that match `query`, for
 * highlighting. Each space-separated word is matched when the whole query
 * isn't.
 */
export function getCommandMatchRanges(
  text: string,
  query: string,
): Array<[number, number]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  let normalized = ""
  const origin: number[] = []
  for (let i = 0; i < text.length && origin.length < MAX_LENGTH; i++) {
    const part = text[i].normalize("NFD").replace(DIACRITICS, "")
    for (let k = 0; k < part.length; k++) origin.push(i)
    normalized += part
  }
  const target = prepareText(normalized)

  let positions = matchPositions(prepareQuery(trimmed), target)
  if (!positions) {
    const all = new Set<number>()
    for (const word of trimmed.split(WHITESPACE)) {
      matchPositions(prepareQuery(word), target)?.forEach((p) => all.add(p))
    }
    positions = [...all].sort((a, b) => a - b)
  }

  const ranges: Array<[number, number]> = []
  for (const position of positions) {
    const index = origin[position]
    const last = ranges[ranges.length - 1]
    if (last && last[1] >= index) last[1] = index + 1
    else ranges.push([index, index + 1])
  }
  return ranges
}

/**
 * Scores `query` against `label` and its `keywords`, from 0 (no match) to 1.
 * Prefer `createCommandMatcher` with prepared commands when scoring many items.
 */
export function commandScore(
  label: string,
  query: string,
  keywords?: readonly string[] | undefined,
): number {
  return createCommandMatcher(query)(prepareCommand(label, keywords))
}
