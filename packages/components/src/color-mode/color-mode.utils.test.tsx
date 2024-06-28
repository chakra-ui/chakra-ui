import { renderHook } from "@testing-library/react"
import { getColorModeUtils } from "./color-mode.utils"

vi.spyOn(document.head, "appendChild")

describe("getColorModeUtils", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("preventTransition", () => {
    test("sets nonce on the injected stylesheet if nonce argument was provided", () => {
      const mockNonce = "testNonce"

      const { result } = renderHook(() =>
        getColorModeUtils({
          nonce: mockNonce,
        }),
      )

      // Trigger the preventTransition function
      result.current.setDataset("dark")

      expect(document.head.appendChild).toHaveBeenCalledTimes(1)
      expect(document.head.appendChild).toHaveBeenCalledWith(
        expect.objectContaining({
          nonce: mockNonce,
        }),
      )
    })

    test("does not set nonce on the injected stylesheet if nonce argument was omitted", () => {
      const { result } = renderHook(() => getColorModeUtils())

      // Trigger the preventTransition function
      result.current.setDataset("dark")

      const element = document.createElement("style")
      element.innerHTML = `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
      expect(document.head.appendChild).toHaveBeenCalledWith(element)
    })
  })
})
