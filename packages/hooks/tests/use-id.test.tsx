import * as React from "react"
import {
  render,
  renderHook,
  screen,
  renderHookSSR,
} from "@chakra-ui/test-utils"
import { IdProvider, useId, useIds } from "../src"

describe("useId", () => {
  test("first time used, should return id 1", () => {
    const { result } = renderHook(() => useId())

    expect(result.current).toBe("1")
  })

  test("when call again need to increment id generated, should return id 2", () => {
    const { result } = renderHook(() => useId())

    expect(result.current).toBe("2")
  })

  test("when pass idProp, should return idProp", () => {
    const { result } = renderHook(() => useId("52"))

    expect(result.current).toBe("52")
  })

  test("when not pass idProp but pass prefix, should return prefix + current id incremented (is 4, because useId was called 4 times)", () => {
    const { result } = renderHook(() => useId(undefined, "button"))

    expect(result.current).toBe("button-4")
  })

  test("when pass idProp and prefix, should return idProp", () => {
    const { result } = renderHook(() => useId("52", "button"))

    expect(result.current).toBe("52")
  })

  describe("with component", () => {
    const Target: React.FC<{ idProp?: string }> = ({ idProp }) => {
      const id = useId(idProp)
      return <i id={id}>id: {id}</i>
    }

    const MoreComponentsUsingHook: React.FC = () => {
      const id = useId()
      return (
        <div id={id} data-testid="id">
          <Target />
          <Target />
        </div>
      )
    }

    test("unique component using, should return id 1", async () => {
      render(<Target />, {
        wrapper: ({ children }) => <IdProvider>{children}</IdProvider>,
      })

      const [id] = screen.queryAllByText(/id: \d+/)

      expect(id).toHaveTextContent("id: 1")
    })

    test("more than one component using the hook, should to increment the id correctly", async () => {
      render(<MoreComponentsUsingHook />, {
        wrapper: ({ children }) => <IdProvider>{children}</IdProvider>,
      })

      const [firstTarget, secondTarget] = screen.queryAllByText(/id: \d+/)

      expect(firstTarget).toHaveTextContent("id: 1")
      expect(secondTarget).toHaveTextContent("id: 2")
      expect(screen.getByTestId("id")).toHaveAttribute("id", "3")
    })

    test("one component pass propId to hook and another use without pass idProp to hook, should return idProp for component that passed and current id for another", async () => {
      render(
        <>
          <Target idProp="52" />
          <Target />
        </>,
        {
          wrapper: ({ children }) => <IdProvider>{children}</IdProvider>,
        },
      )

      const [firstTarget, secondTarget] = screen.queryAllByText(/id: \d+/)

      expect(firstTarget).toHaveTextContent("id: 52")
      expect(secondTarget).toHaveTextContent("id: 2")
    })
  })

  describe("ssr", () => {
    test("need to maintain the same id in hydrate", () => {
      const { result, hydrate } = renderHookSSR(() => useId())

      expect(result.current).toBe("6")

      hydrate()

      expect(result.current).toBe("6")
    })
  })
})

describe("useIds", () => {
  test("when pass prefixes and not pass idProp, should return prefix + current id incremented", () => {
    const { result } = renderHook(() => useIds(undefined, "button", "menu"))

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.stringContaining("button-7"),
        expect.stringContaining("menu-7"),
      ]),
    )
  })

  test("when pass prefixes and idProp, should return prefix + idProp", () => {
    const { result } = renderHook(() => useIds("52", "button", "menu"))

    expect(result.current).toEqual(
      expect.arrayContaining(["button-52", "menu-52"]),
    )
  })
})
