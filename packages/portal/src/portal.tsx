import { useCallbackRef, useSafeLayoutEffect } from "@chakra-ui/hooks"
import { createContext, isBrowser, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import ReactDOM from "react-dom"

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
  getContainer?: () => HTMLElement | null
  /**
   * The content or node you'll like to portal
   */
  children: React.ReactNode
}

/**
 * Portal
 *
 * Declarative component used to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @see Docs https://chakra-ui.com/docs/overlay/portal
 */
export function Portal(props: PortalProps) {
  const getContainer = useCallbackRef(props.getContainer)
  const onMount = useCallbackRef(props.onMount)
  const onUnmount = useCallbackRef(props.onUnmount)

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

  const append = React.useCallback(
    (host: HTMLElement | null) => {
      // if user specified a mount node, do nothing.
      if (!portal || !host) return

      // else, simply append component to the portal node
      host.appendChild(portal)
    },
    [portal],
  )

  useSafeLayoutEffect(() => {
    // get the custom container from the container prop
    const container = getContainer()

    /**
     * We need to know where to mount this portal, we have 4 options:
     * - If a container ref is specified, we'll use that as the container
     * - If portal is nested, use the parent portal node as container.
     * - If it is not nested, use the manager's node as container
     * - else use document.body as containers
     */
    const host = container ?? parentPortal ?? document.body
    append(host)

    onMount()

    return () => {
      onUnmount()

      if (!portal || !host) return

      if (host.contains(portal)) {
        host.removeChild(portal)
      }
    }
  }, [portal, parentPortal, onMount, onUnmount, append])

  if (!portal) {
    return <>{props.children}</>
  }

  return ReactDOM.createPortal(
    <PortalContextProvider value={portal}>
      {props.children}
    </PortalContextProvider>,
    portal,
  )
}

if (__DEV__) {
  Portal.displayName = "Portal"
}
