import * as React from "react"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import { useSafeLayoutEffect, useForceUpdate } from "@chakra-ui/hooks"

interface PortalManagerContext {
  node: HTMLElement
  zIndex?: number
}

const [PortalManagerCtxProvider, usePortalManager] = createContext<
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
 * PortalManager
 *
 * Used to manage multiple portals within an application.
 * It must be render only once, at the root of your application.
 *
 * Inspired by BaseWeb's LayerManager component
 */
export function PortalManager(props: PortalManagerProps) {
  const { children, zIndex } = props

  /**
   * The element that wraps the stacked layers
   */
  const ref = React.useRef<HTMLDivElement>(null)

  const forceUpdate = useForceUpdate()

  /**
   * force an update on mount so the Provider works correctly
   */
  useSafeLayoutEffect(() => {
    forceUpdate()
  }, [])

  /**
   * let's detect if use has mutiple instances of this component
   */
  const parentManager = usePortalManager()

  const context = {
    node: parentManager?.node || ref.current,
    zIndex,
  }

  return (
    <PortalManagerCtxProvider value={context}>
      {children}
      <div className="chakra-portal-manager" ref={ref} />
    </PortalManagerCtxProvider>
  )
}

if (__DEV__) {
  PortalManager.displayName = "PortalManager"
}
