import { isBrowser, __DEV__ } from "@chakra-ui/utils"
import React, { createContext, useContext, useMemo } from "react"
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
  const { children, environment } = props
  const context = useMemo(() => environment ?? defaultEnv, [environment])

  return (
    <EnvironmentContext.Provider value={context}>
      {children}
    </EnvironmentContext.Provider>
  )
}

if (__DEV__) {
  EnvironmentProvider.displayName = "EnvironmentProvider"
}
