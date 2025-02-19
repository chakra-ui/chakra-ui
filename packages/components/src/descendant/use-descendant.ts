import { mergeRefs } from "@chakra-ui/hooks"
import { createContext } from "@chakra-ui/utils"
import { useRef, useState } from "react"
import { DescendantOptions, DescendantsManager } from "./descendant"
import { cast, useSafeLayoutEffect } from "./utils"

export interface UseDescendantsReturn
  extends DescendantsManager<HTMLElement, Record<string, any>> {}

export interface UseDescendantReturn<
  T extends HTMLElement,
  K extends Record<string, any> = {},
> {
  descendants: DescendantsManager<T, K>
  index: number
  enabledIndex: number
  register: React.RefCallback<T>
}

export type DescendantContextReturn<
  T extends HTMLElement,
  K extends Record<string, any> = {},
> = [
  React.Provider<DescendantsManager<T, K>>,
  () => DescendantsManager<T, K>,
  () => DescendantsManager<T, K>,
  (options?: DescendantOptions<K>) => UseDescendantReturn<T, K>,
]

/* -------------------------------------------------------------------------------------------------
 * Descendants context to be used in component-land.
  - Mount the `DescendantsContextProvider` at the root of the component
  - Call `useDescendantsContext` anywhere you need access to the descendants information
 * -----------------------------------------------------------------------------------------------*/

export function createDescendantContext<
  T extends HTMLElement = HTMLElement,
  K extends Record<string, any> = {},
>(): DescendantContextReturn<T, K> {
  const [DescendantsContextProvider, useDescendantsContext] =
    createContext<UseDescendantsReturn>({
      name: "DescendantsProvider",
      errorMessage:
        "useDescendantsContext must be used within DescendantsProvider",
    })

  const useDescendant = (options?: DescendantOptions<K>) => {
    const descendants = useDescendantsContext()
    const [index, setIndex] = useState(-1)
    const ref = useRef<T | null>(null)

    useSafeLayoutEffect(() => {
      return () => {
        if (!ref.current) return
        descendants.unregister(ref.current)
      }
    }, [])

    useSafeLayoutEffect(() => {
      if (!ref.current) return
      const dataIndex = Number(ref.current.dataset["index"])
      if (index != dataIndex && !Number.isNaN(dataIndex)) {
        setIndex(dataIndex)
      }
    })

    const refCallback = options
      ? cast<React.RefCallback<T>>(descendants.register(options))
      : cast<React.RefCallback<T>>(descendants.register)

    return {
      descendants,
      index,
      enabledIndex: descendants.enabledIndexOf(ref.current),
      register: mergeRefs(refCallback, ref),
    }
  }

  const useDescendants = () => {
    const descendants = useRef(new DescendantsManager<T, K>())
    useSafeLayoutEffect(() => {
      return () => descendants.current.destroy()
    })
    return descendants.current
  }

  return [
    // context provider
    DescendantsContextProvider,
    // call this when you need to read from context
    useDescendantsContext,
    // descendants state information, to be called and passed to `ContextProvider`
    useDescendants,
    // descendant index information
    useDescendant,
  ] as any
}
