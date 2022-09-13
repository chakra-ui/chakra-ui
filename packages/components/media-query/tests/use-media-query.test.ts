import { act, renderHook } from "@testing-library/react-hooks"
import MatchMedia from "./matchmedia-mock-plus"
import { useMediaQuery } from "../src/use-media-query"

let matchMedia: MatchMedia

describe("with useMediaQuery", () => {
  let originalWidth: number
  let originalHeight: number

  beforeAll(() => {
    originalWidth = window.innerWidth
    originalHeight = window.innerHeight
  })

  beforeEach(() => {
    jest.resetAllMocks()

    // Set starting size
    Object.assign(window, {
      innerWidth: 1024,
      innerHeight: 768,
      outerWidth: 1024,
      outerHeight: 768,
    })

    matchMedia = new MatchMedia()

    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event("resize"))
    }
  })

  afterEach(() => {
    matchMedia.destroy()

    Object.assign(window, {
      innerWidth: originalWidth,
      innerHeight: originalHeight,
      outerWidth: originalWidth,
      outerHeight: originalHeight,
    })
  })

  test("should report the correct media query match on window resize", () => {
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
        { ssr: false },
      )
    })

    expect(numOfRenders).toBe(1)
    expect(result.current).toEqual([false, false, false, true])

    act(() => window.resizeTo(736, 414))
    expect(numOfRenders).toBe(2)
    expect(result.current).toEqual([false, false, true, false])

    act(() => window.resizeTo(414, 736))
    expect(numOfRenders).toBe(3)
    expect(result.current).toEqual([false, true, false, false])

    act(() => window.resizeTo(360, 640))
    expect(numOfRenders).toBe(4)
    expect(result.current).toEqual([true, false, false, false])
  })
})
