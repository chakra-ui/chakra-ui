import copy from "copy-to-clipboard"
import { invoke, renderHook } from "@chakra-ui/test-utils"

import { useClipboard } from "../src"

jest.mock("copy-to-clipboard")
jest.useFakeTimers()

const text = "lorem ipsum"

test.each`
  params               | expected
  ${100}               | ${100}
  ${{ timeout: 2000 }} | ${2000}
  ${{}}                | ${1500}
  ${0}                 | ${1500}
`("calls setTimeout with proper value", ({ params, expected }) => {
  ;(copy as jest.Mock).mockReturnValue(true)

  const { result } = renderHook(() => useClipboard(text, params))

  invoke(() => {
    result.current.onCopy()
  })

  expect(copy).toBeCalledWith(text, {})
  expect(setTimeout).toHaveBeenCalledWith(expect.anything(), expected)
})
