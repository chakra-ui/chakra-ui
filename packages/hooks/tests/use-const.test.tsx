import { renderHook } from "@chakra-ui/test-utils"
import { act } from "react-test-renderer"
import { useConst } from "../src"

type FooType = { foo: string }

test("should return constant value for constant initialization", () => {
  const obj: FooType = { foo: "bar" }
  const { rerender, result } = renderHook(() => useConst<FooType>(obj))
  expect(result.current).toBe(obj)
  act(() => rerender())
  expect(result.current).toBe(obj)
})

test("should return constant value even if props change", () => {
  const obj: FooType = { foo: "bar" }
  const obj2: FooType = { foo: "baz" }
  const { rerender, result } = renderHook(({ p }) => useConst<FooType>(p), {
    initialProps: { p: obj },
  })
  expect(result.current).toBe(obj)
  act(() => rerender({ p: obj2 }))
  expect(result.current).toBe(obj)
})

test("should return constant value from init function", () => {
  const { rerender, result } = renderHook(() =>
    useConst<FooType>(() => ({ foo: "bar" })),
  )
  const obj: FooType = result.current
  act(() => rerender())
  expect(result.current).toBe(obj)
})
