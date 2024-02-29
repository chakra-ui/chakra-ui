import { createContext } from "@chakra-ui/utils"
import { Global } from "@emotion/react"
import { SystemContext } from "./types"

const [SystemContextProvider, useSystemContext] = createContext<SystemContext>({
  name: "ChakraSystemContext",
  strict: true,
  providerName: "<ChakraProvider />",
})

export interface SystemProviderProps {
  value: SystemContext
  children: React.ReactNode
}

const SystemProvider = (props: SystemProviderProps) => {
  const { value: sys, children } = props

  return (
    <SystemContextProvider value={sys}>
      <Global
        styles={[sys.getPreflightCss(), sys.getGlobalCss(), sys.getTokenCss()]}
      />
      {children}
    </SystemContextProvider>
  )
}

export { useSystemContext, SystemProvider }
