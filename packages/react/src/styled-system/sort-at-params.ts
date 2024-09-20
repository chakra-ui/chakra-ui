import { memo } from "../utils/memo"

const createMediaQueryRegex = (dimension: "width" | "height") => ({
  minMax: new RegExp(
    `(!?\\(\\s*min(-device-)?-${dimension})(.|\n)+\\(\\s*max(-device)?-${dimension}`,
    "i",
  ),
  min: new RegExp(`\\(\\s*min(-device)?-${dimension}`, "i"),
  maxMin: new RegExp(
    `(!?\\(\\s*max(-device)?-${dimension})(.|\n)+\\(\\s*min(-device)?-${dimension}`,
    "i",
  ),
  max: new RegExp(`\\(\\s*max(-device)?-${dimension}`, "i"),
})

const widthRegex = createMediaQueryRegex("width")
const heightRegex = createMediaQueryRegex("height")

const createQueryTester = (
  regexSet: ReturnType<typeof createMediaQueryRegex>,
) => ({
  isMin: _testQuery(regexSet.minMax, regexSet.maxMin, regexSet.min),
  isMax: _testQuery(regexSet.maxMin, regexSet.minMax, regexSet.max),
})

const { isMin: isMinWidth, isMax: isMaxWidth } = createQueryTester(widthRegex)
const { isMin: isMinHeight, isMax: isMaxHeight } =
  createQueryTester(heightRegex)

const isPrint = /print/i
const isPrintOnly = /^print$/i
const isLength = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/
const lengthExec = /(\d)/

const maxValue = Number.MAX_VALUE

const multipliers = { ch: 8.8984375, em: 16, rem: 16, ex: 8.296875, px: 1 }

function getQueryLength(query: string) {
  const length =
    isLength.exec(query) ||
    (isMinWidth(query) || isMinHeight(query) ? lengthExec.exec(query) : null)
  if (!length) return maxValue
  if (length[0] === "0") return 0
  const number = parseFloat(length[1])
  const unit = length[2]
  return number * (multipliers[unit as keyof typeof multipliers] || 1)
}

function _testQuery(
  doubleTestTrue: RegExp,
  doubleTestFalse: RegExp,
  singleTest: RegExp,
) {
  return (query: string) =>
    doubleTestTrue.test(query) ||
    (!doubleTestFalse.test(query) && singleTest.test(query))
}

function _testIsPrint(a: string, b: string) {
  const isPrintA = isPrint.test(a),
    isPrintOnlyA = isPrintOnly.test(a)
  const isPrintB = isPrint.test(b),
    isPrintOnlyB = isPrintOnly.test(b)

  if (isPrintA && isPrintB) {
    if (!isPrintOnlyA && isPrintOnlyB) return 1
    if (isPrintOnlyA && !isPrintOnlyB) return -1
    return a.localeCompare(b)
  }

  return isPrintA ? 1 : isPrintB ? -1 : null
}

export const sortAtParams = memo((a: string, b: string) => {
  const testIsPrint = _testIsPrint(a, b)
  if (testIsPrint !== null) return testIsPrint

  const minA = isMinWidth(a) || isMinHeight(a),
    maxA = isMaxWidth(a) || isMaxHeight(a)

  const minB = isMinWidth(b) || isMinHeight(b),
    maxB = isMaxWidth(b) || isMaxHeight(b)

  if (minA && maxB) return -1
  if (maxA && minB) return 1

  const lengthA = getQueryLength(a),
    lengthB = getQueryLength(b)

  if (lengthA === maxValue && lengthB === maxValue) return a.localeCompare(b)
  if (lengthA === maxValue) return 1
  if (lengthB === maxValue) return -1

  if (lengthA !== lengthB) {
    return lengthA > lengthB ? (maxA ? -1 : 1) : maxA ? 1 : -1
  }

  return a.localeCompare(b)
})
