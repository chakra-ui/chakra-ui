import { createContext, mergeRefs } from "@chakra-ui/react-utils"
import {
  RefCallback,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react"
import { DescendantsManager, DescendantOptions } from "./descendant"

const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const cast = <T>(value: any) => value as T

export function useDescendants<T extends HTMLElement = HTMLElement, K = {}>() {
  const [descendants] = useState(() => new DescendantsManager<T, K>())
  useSafeLayoutEffect(() => {
    return () => descendants.destroy()
  })
  return descendants
}

export interface UseDescendantsReturn
  extends ReturnType<typeof useDescendants> {}

export const [
  DescendantsContextProvider,
  useDescendantsContext,
] = createContext<UseDescendantsReturn>({
  name: "DescendantsProvider",
  errorMessage: "useDescendantsContext must be used within DescendantsProvider",
})

export function useDescendant<T extends HTMLElement = HTMLElement, K = {}>(
  options?: DescendantOptions & K,
) {
  const descendants = useDescendantsContext()
  const [index, setIndex] = useState(-1)
  const ref = useRef<T>(null)

  useSafeLayoutEffect(() => {
    return () => {
      if (!ref.current) return
      descendants.unregister(ref.current)
    }
  }, [])

  useSafeLayoutEffect(() => {
    if (!ref.current) return
    const dataIndex = Number(ref.current.dataset.index)
    if (index != dataIndex && !Number.isNaN(dataIndex)) {
      setIndex(dataIndex)
    }
  })

  const refCallback = options
    ? cast<RefCallback<T>>(descendants.register(options))
    : cast<RefCallback<T>>(descendants.register)

  return {
    descendants,
    index,
    enabledIndex: descendants.enabledIndexOf(ref.current),
    register: mergeRefs(refCallback, ref),
  }
}

export function createDescendantContext<
  T extends HTMLElement = HTMLElement,
  K = {}
>() {
  type ProviderType = React.Provider<DescendantsManager<T, K>>
  const Provider = cast<ProviderType>(DescendantsContextProvider)

  const _useDescendantsContext = () =>
    cast<DescendantsManager<T, K>>(useDescendantsContext())

  const _useDescendant = (options?: DescendantOptions & K) =>
    useDescendant<T, K>(options)

  const _useDescendants = () => useDescendants<T, K>()

  return [
    Provider,
    _useDescendants,
    _useDescendant,
    _useDescendantsContext,
  ] as const
}
