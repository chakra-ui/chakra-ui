import { runIfFn, callAllHandlers } from "../function"

test("should run function if function or else return value", () => {
  expect(runIfFn(() => 1 + 1)).toStrictEqual(2)
  expect(runIfFn(2)).toStrictEqual(2)
})

const event = { target: { value: 1 } }

test("should call all passed functions on event triggered", () => {
  let val1 = 0
  let val2 = 0
  const func1 = (event: any) => (val1 = event.target.value + 1)
  const func2 = (event: any) => (val2 = event.target.value + 2)

  callAllHandlers(func1, func2)(event)
  expect(val1).toStrictEqual(2)
  expect(val2).toStrictEqual(3)
})
