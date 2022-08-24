import {
  createContext,
  startTransition,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"
import { ssrDocument } from "./mock-document"
import { ssrWindow } from "./mock-window"

interface Environment {
  window: Window
  document: Document
}

const mockEnv = {
  window: ssrWindow,
  document: ssrDocument,
}

const defaultEnv: Environment =
  typeof window !== "undefined" ? { window, document } : mockEnv

const EnvironmentContext = createContext(defaultEnv)

EnvironmentContext.displayName = "EnvironmentContext"

export function useEnvironment() {
  return useContext(EnvironmentContext)
}

export interface EnvironmentProviderProps {
  children: React.ReactNode
  environment?: Environment
}

export function EnvironmentProvider(props: EnvironmentProviderProps) {
  const { children, environment: environmentProp } = props
  const [node, setNode] = useState<HTMLElement | null>(null)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const context = useMemo(() => {
    if (environmentProp) {
      return environmentProp
    }

    const doc = node?.ownerDocument
    const win = node?.ownerDocument.defaultView

    const env = doc ? { document: doc, window: win } : defaultEnv
    return env as Environment
  }, [node, environmentProp])

  return (
    <EnvironmentContext.Provider value={context}>
      {children}
      {!environmentProp && mounted && (
        <span
          id="__chakra_env"
          hidden
          ref={(el) => {
            startTransition(() => {
              if (el) setNode(el)
            })
          }}
        />
      )}
    </EnvironmentContext.Provider>
  )
}

EnvironmentProvider.displayName = "EnvironmentProvider"
