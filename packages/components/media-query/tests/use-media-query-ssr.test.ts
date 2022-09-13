import { renderHook } from "@testing-library/react-hooks/server"
import { useMediaQuery } from "../src"

describe("with useMediaQuery fallback", () => {
  // NOTE: We do not set up matchMedia as we wish to simulate an SSR environment

  beforeEach(() => {
    // It seems like some other test is not cleaning up after itself
    jest.resetAllMocks()
  })

  describe("should return fallback value when media can not be matched and ssr=true", () => {
    test("using single value", () => {
      let numOfRenders = 0
      const { result } = renderHook(() => {
        numOfRenders += 1
        return useMediaQuery("(min-width: 9999px)", {
          ssr: true,
          fallback: true,
        })
      })

      expect(numOfRenders).toBe(1)
      expect(result.current).toEqual([true])
    })

    test("using array of queries", () => {
      let numOfRenders = 0
      const { result } = renderHook(() => {
        numOfRenders += 1
        return useMediaQuery(
          [
            "(max-width: 410px)",
            "(min-width: 411px) and (max-width: 615px)",
            "(min-width: 616px) and (max-width: 1023px)",
            "(min-width: 1024px)",
          ],
          { ssr: true, fallback: [true, true, true, true] },
        )
      })

      expect(numOfRenders).toBe(1)
      expect(result.current).toEqual([true, true, true, true])
    })
  })

  describe("should return false for each query when media can not be matched and ssr=false", () => {
    test("using single value", () => {
      let numOfRenders = 0
      const { result } = renderHook(() => {
        numOfRenders += 1
        return useMediaQuery("(min-width: 9999px)", {
          ssr: false,
          fallback: true,
        })
      })

      expect(numOfRenders).toBe(1)
      expect(result.current).toEqual([false])
    })

    test("using array of queries", () => {
      let numOfRenders = 0
      const { result } = renderHook(() => {
        numOfRenders += 1
        return useMediaQuery(
          [
            "(max-width: 410px)",
            "(min-width: 411px) and (max-width: 615px)",
            "(min-width: 616px) and (max-width: 1023px)",
            "(min-width: 1024px)",
          ],
          { ssr: false, fallback: [true, true, true, true] },
        )
      })

      expect(numOfRenders).toBe(1)
      expect(result.current).toEqual([false, false, false, false])
    })
  })
})
