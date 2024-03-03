import { act, renderHook } from "@testing-library/react"
import MatchMedia from "./match-media.fixture"
import { useMediaQuery } from "./use-media-query"

let matchMedia: MatchMedia

describe("with useMediaQuery", () => {
  beforeAll(() => {
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
    matchMedia.clear()
  })

  test("should report the correct media query match on window resize", () => {
    const { result } = renderHook(() =>
      useMediaQuery([
        "(max-width: 410px)",
        "(min-width: 411px) and (max-width: 615px)",
        "(min-width: 616px) and (max-width: 1023px)",
        "(min-width: 1024px)",
      ]),
    )

    expect(result.current).toEqual([false, false, false, true])

    act(() => window.resizeTo(736, 414))
    expect(result.current).toEqual([false, false, true, false])

    act(() => window.resizeTo(414, 736))
    expect(result.current).toEqual([false, true, false, false])

    act(() => window.resizeTo(360, 640))
    expect(result.current).toEqual([true, false, false, false])
  })
})
