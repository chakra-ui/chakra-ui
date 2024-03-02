import { createContext } from "@chakra-ui/utils"

interface PortalManagerContext {
  zIndex?: number
}

const [PortalManagerContextProvider, usePortalManager] =
  createContext<PortalManagerContext | null>({
    strict: false,
    name: "PortalManagerContext",
  })

export { usePortalManager }

export interface PortalManagerProps {
  children?: React.ReactNode
  /**
   * [Z-Index war] If your has multiple elements
   * with z-index clashing, you might need to apply a z-index to the Portal manager
   */
  zIndex?: number
}

export function PortalManager(props: PortalManagerProps) {
  const { children, zIndex } = props
  return (
    <PortalManagerContextProvider value={{ zIndex }}>
      {children}
    </PortalManagerContextProvider>
  )
}

PortalManager.displayName = "PortalManager"
