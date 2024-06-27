import { useSafeLayoutEffect } from "@chakra-ui/hooks/use-safe-layout-effect"
import { createContext, useContext, useMemo, useReducer, useRef } from "react"

interface Environment {
  getWindow: () => Window
  getDocument: () => Document
  getPortalRoot: () => HTMLElement
}

const EnvironmentContext = createContext<Environment>({
  getDocument() {
    return document
  },
  getWindow() {
    return window
  },
  getPortalRoot() {
    return document.body
  }
})

EnvironmentContext.displayName = "EnvironmentContext"

export function useEnvironment({ defer }: { defer?: boolean } = {}) {
  const [, forceUpdate] = useReducer((c) => c + 1, 0)

  useSafeLayoutEffect(() => {
    if (!defer) return
    forceUpdate()
  }, [defer])

  return useContext(EnvironmentContext)
}

export interface EnvironmentProviderProps {
  children: React.ReactNode
  disabled?: boolean
  environment?: Environment
}

export function EnvironmentProvider(props: EnvironmentProviderProps) {
  const { children, environment: environmentProp, disabled } = props
  const ref = useRef<HTMLSpanElement>(null)

  const context = useMemo<Environment>(() => {
    if (environmentProp) return environmentProp
    return {
      getDocument: () => ref.current?.ownerDocument ?? document,
      getWindow: () => ref.current?.ownerDocument.defaultView ?? window,
      getPortalRoot: () => ref.current?.ownerDocument.body ?? document.body,
    }
  }, [environmentProp])

  const showSpan = !disabled || !environmentProp

  return (
    <EnvironmentContext.Provider value={context}>
      {children}
      {showSpan && <span id="__chakra_env" hidden ref={ref} />}
    </EnvironmentContext.Provider>
  )
}

EnvironmentProvider.displayName = "EnvironmentProvider"
