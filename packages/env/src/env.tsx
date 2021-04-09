import React, { useMemo, useState, createContext, useContext } from "react"
import { ssrWindow } from "./mock-window"
import { ssrDocument } from "./mock-document"

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

  const context = useMemo(() => {
    const doc = node?.ownerDocument
    const win = node?.ownerDocument.defaultView
    const nodeEnv = { document: doc, window: win }
    const env = environmentProp ?? nodeEnv ?? defaultEnv
    return env as Environment
  }, [node, environmentProp])

  const shouldRenderChildren = node || environmentProp

  return (
    <EnvironmentContext.Provider value={context}>
      {shouldRenderChildren ? (
        children
      ) : (
        <span
          ref={(el) => {
            if (el) setNode(el)
          }}
        />
      )}
    </EnvironmentContext.Provider>
  )
}
