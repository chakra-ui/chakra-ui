import { runIfFn, callAllHandlers } from "../function"

test("should run function if function or else return value", () => {
  expect(runIfFn(() => 1 + 1)).toStrictEqual(2)
  expect(runIfFn(2)).toStrictEqual(2)
})

test("should call passed all functions", () => {
  let val1 = 0
  let val2 = 0
  const func1 = () => val1++
  const func2 = () => (val2 += 2)

  callAllHandlers(func1, func2)({} as any)
  expect(val1).toStrictEqual(1)
  expect(val2).toStrictEqual(2)
})
