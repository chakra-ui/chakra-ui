import { hooks } from "@chakra-ui/test-utils"
import copy from "copy-to-clipboard"
import { Mock } from "vitest"
import { useClipboard } from "../src/use-clipboard"

vi.mock("copy-to-clipboard")

vi.useFakeTimers()
vi.spyOn(global, "setTimeout")

const text = "lorem ipsum"

test.each`
  params               | expected
  ${100}               | ${100}
  ${{ timeout: 2000 }} | ${2000}
  ${{}}                | ${1500}
  ${0}                 | ${1500}
`("calls setTimeout with proper value", ({ params, expected }) => {
  ;(copy as Mock).mockReturnValue(true)

  const { result } = hooks.render(() => useClipboard(text, params))

  hooks.act(() => {
    result.current.onCopy()
  })

  expect(copy).toBeCalledWith(text, {})
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expected)
})

test("sets new copy value", () => {
  ;(copy as Mock).mockReturnValue(true)

  const { result } = hooks.render(() => useClipboard(text))

  hooks.act(() => {
    result.current.onCopy()
  })

  expect(copy).toBeCalledWith(text, {})
  expect(result.current.value).toBe(text)

  const newText = "dolor sit amet"

  hooks.act(() => {
    result.current.setValue(newText)
  })

  expect(result.current.value).toBe(newText)

  hooks.act(() => {
    result.current.onCopy()
  })

  expect(copy).toBeCalledWith(newText, {})
})
