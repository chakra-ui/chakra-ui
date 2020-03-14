import * as React from "react"
import { createContext } from "@chakra-ui/utils"
import { useIsomorphicEffect, useForceUpdate } from "@chakra-ui/hooks"

export interface PortalManagerContext {
  node: HTMLElement
  zIndex?: number
}

const [PortalManagerProvider, usePortalManager] = createContext<
  PortalManagerContext
>({
  strict: false,
})

export { usePortalManager }

export interface PortalManagerProps {
  children?: React.ReactNode
  zIndex?: number
}

/**
 * Manage multiple portals within an application
 * Inspired by BaseWeb's LayerManager component
 */
export function PortalManager(props: PortalManagerProps) {
  const { children, zIndex } = props

  // The element that wraps the stacked layers
  const ref = React.useRef<HTMLDivElement>(null)

  // force an update so the Provider works correctly
  const forceUpdate = useForceUpdate()
  useIsomorphicEffect(() => {
    forceUpdate()
  }, [])

  // let's detect if use has mutiple instances of this component
  const parentManager = usePortalManager()

  const context = {
    node: parentManager?.node || ref.current,
    zIndex,
  }

  return (
    <PortalManagerProvider value={context}>
      {children}
      <div className="chakra-portal-manager" ref={ref} />
    </PortalManagerProvider>
  )
}

export default PortalManager
