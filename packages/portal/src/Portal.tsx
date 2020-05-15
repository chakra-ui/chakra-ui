import { createContext, isBrowser, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { createPortal } from "react-dom"
import { usePortalManager } from "./Portal.manager"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"

type PortalContext = HTMLDivElement | null

const [PortalContextProvider, usePortalContext] = createContext<PortalContext>({
  strict: false,
  name: "PortalContext",
})

export interface PortalProps {
  /**
   * Function called when the portal mounts
   */
  onMount?(): void
  /**
   * Function called when the portal unmounts
   */
  onUnmount?(): void
  /**
   * Function that will be called to get the parent element
   * that the portal will be attached to.
   */
  getContainer?: () => HTMLElement
  /**
   * The content or node you'll like to portal
   */
  children?: React.ReactNode
}

/**
 * Portal
 *
 * Declarative component used to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @see Docs https://chakra-ui.com/portal
 */
export function Portal(props: PortalProps) {
  const { onMount, onUnmount, children, getContainer } = props

  /**
   * Generate the portal's dom node. We'll wrap the children
   * in this dom node before mounting it.
   */
  const [portal] = React.useState(() => {
    if (isBrowser) {
      const div = document.createElement("div")
      div.className = "chakra-portal"
      return div
    }
    // for ssr
    return null
  })

  /**
   * This portal might be nested in another portal.
   * Let's read from the portal context to check this.
   */
  const parentPortal = usePortalContext()

  /**
   * If there's a PortalManager rendered, let's read from it.
   * We use the portal manager to manage multiple portals
   */
  const manager = usePortalManager()

  const append = React.useCallback(
    (container: HTMLElement | null) => {
      // if user specified a mount node, do nothing.
      if (!portal || !container) return

      // else, simply append component to the portal node
      container.appendChild(portal)
    },
    [portal],
  )

  useSafeLayoutEffect(() => {
    // get the custom container from the container prop
    const customContainer = getContainer?.()

    /**
     * We need to know where to mount this portal, we have 4 options:
     * - If a mountRef is specified, we'll use that as the container
     * - If portal is nested, use the parent portal node as container.
     * - If it's not nested, use the manager's node as container
     * - else use document.body as containers
     */
    const container =
      customContainer ?? parentPortal ?? manager?.node ?? document.body

    /**
     * Append portal node to the computed container
     */
    append(container)

    onMount?.()

    return () => {
      onUnmount?.()

      if (!portal) return

      if (container?.contains(portal)) {
        container?.removeChild(portal)
      }
    }
  }, [
    getContainer,
    portal,
    parentPortal,
    onMount,
    onUnmount,
    manager && manager.node,
    append,
  ])

  const finalChildren = manager?.zIndex ? (
    <div className="chakra-portal-zIndex" style={{ zIndex: manager.zIndex }}>
      {children}
    </div>
  ) : (
    children
  )

  if (!portal) {
    return <React.Fragment>{finalChildren}</React.Fragment>
  }

  return createPortal(
    <PortalContextProvider value={portal}>
      {finalChildren}
    </PortalContextProvider>,
    portal,
  )
}

if (__DEV__) {
  Portal.displayName = "Portal"
}
