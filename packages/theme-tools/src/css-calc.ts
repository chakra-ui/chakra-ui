import { isObject } from "@chakra-ui/utils"
import { CSSVar } from "./css-var"

export type Operand = string | number | CSSVar
type Operands = Operand[]

type Operator = "+" | "-" | "*" | "/"

function toRef(operand: Operand): string {
  if (isObject(operand) && operand.reference) {
    return operand.reference
  }
  return String(operand)
}

const toExpr = (operator: Operator, ...operands: Operands) =>
  operands.map(toRef).join(` ${operator} `).replace(/calc/g, "")

const add = (...operands: Operands) => `calc(${toExpr("+", ...operands)})`

const subtract = (...operands: Operands) => `calc(${toExpr("-", ...operands)})`

const multiply = (...operands: Operands) => `calc(${toExpr("*", ...operands)})`

const divide = (...operands: Operands) => `calc(${toExpr("/", ...operands)})`

const negate = (x: Operand) => {
  const value = toRef(x)

  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : `-${value}`
  }

  return multiply(value, -1)
}

export interface CalcChain {
  add: (...operands: Operands) => CalcChain
  subtract: (...operands: Operands) => CalcChain
  multiply: (...operands: Operands) => CalcChain
  divide: (...operands: Operands) => CalcChain
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
