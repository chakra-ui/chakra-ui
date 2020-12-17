import { parseGradient, DEFAULT_TO_COLOR } from "../src/utils/parse-gradient"

const theme = {
  colors: {
    green: "greenish",
    red: "reddish",
  },
}

Object.assign(global.console, {
  warn: jest.fn(),
})

test("should convert simple value", () => {
  const input = "to-t red:green"
  const output = parseGradient(input, theme)
  expect(output).toEqual("linear-gradient(to top, reddish, greenish)")
})

test("should convert value with HEX code", () => {
  const input = "to-t #fff:#bbb"
  const output = parseGradient(input, theme)
  expect(output).toEqual("linear-gradient(to top, #fff, #bbb)")
})

test("should convert without direction", () => {
  const input = "red:green"
  const output = parseGradient(input, theme)
  // we default direction to `to-r` if not passed
  expect(output).toEqual("linear-gradient(to right, reddish, greenish)")
})

test("should convert with wrong direction", () => {
  const input = "to-ry red:green"
  const output = parseGradient(input, theme)
  // we default direction to `to-r` if passed direction is wrong
  // and we also throw a warning
  expect(console.warn).toHaveBeenCalledWith(
    "Direction is not valid. Defaulting to `top right`",
  )
  expect(output).toEqual("linear-gradient(to right, reddish, greenish)")
})

test("should convert with double space", () => {
  // Oops! user added double space after direction
  const input = "to-tl  red:green"
  const output = parseGradient(input, theme)
  // we clean up the extra space
  expect(output).toEqual("linear-gradient(to top left, reddish, greenish)")
})

test("should throw when passed the wrong syntax", () => {
  // Oops! Invalid syntax :(
  const input = "to-ry testing red:green"
  expect(() => parseGradient(input, theme)).toThrowError()
})

test("should throw when passed 1 color", () => {
  // Oops! Invalid syntax :(
  const input = "to-b red"
  const output = parseGradient(input, theme)
  // we'll add `transparent` as the `to` color by default
  expect(output).toEqual(
    `linear-gradient(to top left, reddish, ${DEFAULT_TO_COLOR})`,
  )
})

test("should not parse if value is 'none'", () => {
  const input = "none"
  console.log(parseGradient(input, theme))
})
