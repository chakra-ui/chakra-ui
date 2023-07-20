/**
 * Thank you @markdalgleish for this piece of art!
 */
import { isObject } from "@chakra-ui/utils"

export type Operand = string | number | { reference: string }
type Operator = "+" | "-" | "*" | "/"

function resolveReference(operand: Operand): string {
  if (isObject(operand) && operand.reference) {
    return operand.reference
  }
  return String(operand)
}

const toExpression = (operator: Operator, ...operands: Array<Operand>) =>
  operands.map(resolveReference).join(` ${operator} `).replace(/calc/g, "")

const add = (...operands: Array<Operand>) =>
  `calc(${toExpression("+", ...operands)})`

const subtract = (...operands: Array<Operand>) =>
  `calc(${toExpression("-", ...operands)})`

const multiply = (...operands: Array<Operand>) =>
  `calc(${toExpression("*", ...operands)})`

const divide = (...operands: Array<Operand>) =>
  `calc(${toExpression("/", ...operands)})`

const negate = (x: Operand) => {
  const value = resolveReference(x)

  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : `-${value}`
  }

  return multiply(value, -1)
}

interface CalcChain {
  add: (...operands: Array<Operand>) => CalcChain
  subtract: (...operands: Array<Operand>) => CalcChain
  multiply: (...operands: Array<Operand>) => CalcChain
  divide: (...operands: Array<Operand>) => CalcChain
  negate: () => CalcChain
  toString: () => string
}

export const calc = Object.assign(
  (x: Operand): CalcChain => ({
    add: (...operands) => calc(add(x, ...operands)),
    subtract: (...operands) => calc(subtract(x, ...operands)),
    multiply: (...operands) => calc(multiply(x, ...operands)),
    divide: (...operands) => calc(divide(x, ...operands)),
    negate: () => calc(negate(x)),
    toString: () => x.toString(),
  }),
  {
    add,
    subtract,
    multiply,
    divide,
    negate,
  },
)
