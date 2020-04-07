// yarn utils test
import { runIfFn, callAllHandlers } from "../function"

test("runIfFn - 'valueOrFn: () => 1 + 1' should equal 2", () => {
  expect(runIfFn(() => 1 + 1)).toStrictEqual(2)
})

test("runIfFn - 'valueOrFn: 2' should equal 2", () => {
  expect(runIfFn(2)).toStrictEqual(2)
})

test("callAllHandlers - 'fns: () => {val1 = 1+1}, () => {val2 = 2 + 2}' should equal {val1: 2, val2: 4}", () => {
  let val1 = 0
  let val2 = 0
  callAllHandlers(
    () => {
      val1 = 1 + 1
    },
    () => {
      val2 = 2 + 2
    },
  )({} as any)
  expect({ val1, val2 }).toStrictEqual({ val1: 2, val2: 4 })
})
