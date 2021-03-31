import React, { useMemo, useState, createContext, useContext } from "react"
import { ssrWindow } from "./mock-window"
import { ssrDocument } from "./mock-document"

interface Environment {
  window: Window | null
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
  const [env, setEnv] = useState<Environment | null>(null)

  const context = useMemo(() => {
    return environmentProp ?? env ?? defaultEnv
  }, [env, environmentProp])

  return (
    <EnvironmentContext.Provider value={context}>
      {children}
      {!env && (
        <span
          ref={(node) => {
            if (!node) return
            setEnv({
              document: node.ownerDocument,
              window: node.ownerDocument.defaultView,
            })
          }}
        />
      )}
    </EnvironmentContext.Provider>
  )
}
