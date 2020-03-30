import * as React from "react"
import { createContext } from "@chakra-ui/utils"
import { useSafeLayoutEffect, useForceUpdate } from "@chakra-ui/hooks"

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
  /**
   * Child elements of the Portal manager
   * Ideally, it should be at the top-level
   * of your application
   */
  children?: React.ReactNode
  /**
   * [Z-Index war] If your has multiple elements
   * with z-index clashing, you might need to
   * apply a z-index to the Portal manager
   */
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

  const forceUpdate = useForceUpdate()

  // force an update on mount so the Provider works correctly
  useSafeLayoutEffect(() => {
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
