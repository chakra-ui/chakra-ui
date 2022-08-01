import { useEnvironment } from "@chakra-ui/react-env"
import { runIfFn } from "@chakra-ui/shared-utils"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

export type UseMediaQueryOptions = {
  fallback?: boolean | boolean[]
  ssr?: boolean
}

/** Proxy of `useState` that only updates the state if it has changes */
function useSmartState<S>(
  initialState: S | (() => S),
  /** Comparitor that should return `true` if `curr` has changes from `prev` */
  hasChanged: (prev: S, curr: S) => boolean,
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState)

  const smartSetState = useCallback(
    (state: SetStateAction<S>) =>
      setState((prev) => {
        const curr = runIfFn(state, prev)

        return hasChanged(prev, curr) ? curr : prev
      }),
    [hasChanged],
  )

  return [state, smartSetState]
}

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 * @param options the media query options { fallback, ssr }
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-media-query
 */
export function useMediaQuery(
  query: string | string[],
  options: UseMediaQueryOptions = {},
): boolean[] {
  const { ssr = true, fallback } = options

  const { getWindow } = useEnvironment()

  const queries = Array.isArray(query) ? query : [query]

  let fallbackValues = Array.isArray(fallback) ? fallback : [fallback]
  fallbackValues = fallbackValues.filter((v) => v != null) as boolean[]

  const hasChanged = useCallback(
    (
      a: { media: string; matches: boolean }[],
      b: { media: string; matches: boolean }[],
    ) =>
      a.some(
        (aVal, i) => aVal.media !== b[i].media || aVal.matches !== b[i].matches,
      ),
    [],
  )

  const [value, setValue] = useSmartState(() => {
    return queries.map((query, index) => ({
      media: query,
      matches:
        getWindow()?.matchMedia?.(query).matches ??
        (ssr && !!fallbackValues[index]),
    }))
  }, hasChanged)

  useEffect(() => {
    const win = getWindow()
    setValue(
      queries.map((query) => ({
        media: query,
        matches: win.matchMedia(query).matches,
      })),
    )

    const mql = queries.map((query) => win.matchMedia(query))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    mql.forEach((mql) => {
      if (typeof mql.addListener === "function") {
        mql.addListener(handler)
      } else {
        mql.addEventListener("change", handler)
      }
    })

    return () => {
      mql.forEach((mql) => {
        if (typeof mql.removeListener === "function") {
          mql.removeListener(handler)
        } else {
          mql.removeEventListener("change", handler)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getWindow])

  return value.map((item) => item.matches)
}
