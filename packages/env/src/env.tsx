import { isBrowser, __DEV__ } from "@chakra-ui/utils"
import React, { createContext, useContext, useMemo, useState } from "react"
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

const defaultEnv: Environment = isBrowser ? { window, document } : mockEnv

const EnvironmentContext = createContext(defaultEnv)

if (__DEV__) {
  EnvironmentContext.displayName = "EnvironmentContext"
}

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
    const nodeEnv = doc ? { document: doc, window: win } : undefined
    const env = environmentProp ?? nodeEnv ?? defaultEnv
    return env as Environment
  }, [node, environmentProp])

  const showEnvGetter = !node && !environmentProp

  return (
    <EnvironmentContext.Provider value={context}>
      {children}
      {showEnvGetter && (
        <span
          ref={(el) => {
            if (el) setNode(el)
          }}
        />
      )}
    </EnvironmentContext.Provider>
  )
}

if (__DEV__) {
  EnvironmentProvider.displayName = "EnvironmentProvider"
}
