import { hooks } from "@chakra-ui/test-utils"
import { useConst } from "../src"

type FooType = { foo: string }

test("should return constant value for constant initialization", () => {
  const obj: FooType = { foo: "bar" }
  const { rerender, result } = hooks.render(() => useConst<FooType>(obj))
  expect(result.current).toBe(obj)
  hooks.act(() => rerender())
  expect(result.current).toBe(obj)
})

test("should return constant value even if props change", () => {
  const obj: FooType = { foo: "bar" }
  const obj2: FooType = { foo: "baz" }
  const { rerender, result } = hooks.render(({ p }) => useConst<FooType>(p), {
    initialProps: { p: obj },
  })
  expect(result.current).toBe(obj)
  hooks.act(() => rerender({ p: obj2 }))
  expect(result.current).toBe(obj)
})

test("should return constant value from init function", () => {
  const { rerender, result } = hooks.render(() =>
    useConst<FooType>(() => ({ foo: "bar" })),
  )
  const obj: FooType = result.current
  hooks.act(() => rerender())
  expect(result.current).toBe(obj)
})
