import {
  useCallbackRef,
  useForceUpdate,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { createPortal } from "react-dom"
import { usePortalManager } from "./portal-manager"

type PortalContext = HTMLDivElement | null

const [PortalContextProvider, usePortalContext] = createContext<PortalContext>({
  strict: false,
  name: "PortalContext",
})

const Container: React.FC<{ zIndex?: number }> = (props) => {
  const { children, zIndex } = props
  return (
    <div
      className="chakra-portal-zIndex"
      style={{ display: "inline-block", position: "absolute", zIndex }}
    >
      {children}
    </div>
  )
}

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
  const tempNode = React.useRef<HTMLDivElement | null>(null)
  const portal = React.useRef<HTMLDivElement | null>(null)

  const forceUpdate = useForceUpdate()

  const getContainer = useCallbackRef(props.getContainer)
  const onMount = useCallbackRef(props.onMount)
  const onUnmount = useCallbackRef(props.onUnmount)

  const parentPortal = usePortalContext()
  const manager = usePortalManager()

  useSafeLayoutEffect(() => {
    if (!tempNode.current) return

    const doc = tempNode.current!.ownerDocument
    portal.current = doc.createElement("div")
    portal.current.className = Portal.className

    const host = getContainer() ?? parentPortal ?? doc.body

    host.appendChild(portal.current)
    forceUpdate()

    onMount()

    const portalNode = portal.current
    return () => {
      onUnmount()
      if (host.contains(portalNode)) {
        host.removeChild(portalNode)
      }
    }
  }, [])

  const childrenToRender = manager?.zIndex ? (
    <Container zIndex={manager.zIndex}>{props.children}</Container>
  ) : (
    props.children
  )

  return portal.current ? (
    createPortal(
      <PortalContextProvider value={portal.current}>
        {childrenToRender}
      </PortalContextProvider>,
      portal.current,
    )
  ) : (
    <span ref={tempNode} />
  )
}

Portal.className = "chakra-portal"
Portal.selector = `.${Portal.className}`

if (__DEV__) {
  Portal.displayName = "Portal"
}
