import { guards } from "../src"

const { or, and, not } = guards

const context = { array: [], value: 2 }
const event = { type: "TEST" }

const guardsMap = {
  isZero: (ctx: any) => ctx.value === 0,
  isComplete: (ctx: any) => ctx.array.length === 0,
}

test("should resolve `or` helper", () => {
  const evaluate = or("isZero", "isComplete").exec(guardsMap)
  expect(evaluate(context, event)).toBeTruthy()
})

test("should resolve `not` + `or` helper", () => {
  const evaluate = or("isZero", not("isComplete")).exec(guardsMap)
  expect(evaluate(context, event)).toBeFalsy()
})

test("should resolve `not` helper", () => {
  const evaluate = not("isZero").exec(guardsMap)
  expect(evaluate(context, event)).toBeTruthy()
})

test("should resolve `and` helper", () => {
  const test1 = and("isZero", "isComplete").exec(guardsMap)
  expect(test1(context, event)).toBeFalsy()

  const test2 = and("isComplete", not("isZero")).exec(guardsMap)
  expect(test2(context, event)).toBeTruthy()
})

test("should work with incorrect guards", () => {
  const test1 = and("isZero", "Naruto").exec(guardsMap)
  expect(test1(context, event)).toBeFalsy()
})
