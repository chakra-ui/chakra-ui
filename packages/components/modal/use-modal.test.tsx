import { renderHook } from "@testing-library/react-hooks"
import { hideOthers } from "aria-hidden"
import { MutableRefObject } from "react"
import { useAriaHidden } from "../src/use-modal"

jest.mock("aria-hidden")

beforeEach(() => {
  jest.clearAllMocks()
})

describe("useAriaHidden", () => {
  it("should be triggered if ref.current is changed", () => {
    const ref: MutableRefObject<null | HTMLElement> = { current: null }

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).not.toBeCalled()

    ref.current = document.createElement("div")

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).toBeCalledWith(ref.current)
  })

  it("shouldn't be triggered if `shouldHide` is `false`", () => {
    const ref: MutableRefObject<null | HTMLElement> = { current: null }

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).not.toBeCalled()

    ref.current = document.createElement("div")

    renderHook(() => useAriaHidden(ref, false))
    expect(hideOthers).not.toBeCalled()
  })
})
