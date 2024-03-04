import { renderHook } from "@testing-library/react"
import { hideOthers } from "aria-hidden"
import { MutableRefObject } from "react"
import { useAriaHidden } from "../src/components/dialog/use-aria-hidden"

vi.mock("aria-hidden")

beforeEach(() => {
  vi.clearAllMocks()
})

describe("useAriaHidden", () => {
  test("should be triggered if ref.current is changed", () => {
    const ref: MutableRefObject<null | HTMLElement> = { current: null }

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).not.toBeCalled()

    ref.current = document.createElement("div")

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).toBeCalledWith(ref.current)
  })

  test("shouldn't be triggered if `shouldHide` is `false`", () => {
    const ref: MutableRefObject<null | HTMLElement> = { current: null }

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).not.toBeCalled()

    ref.current = document.createElement("div")

    renderHook(() => useAriaHidden(ref, false))
    expect(hideOthers).not.toBeCalled()
  })
})
