import { useForceUpdate, useSafeLayoutEffect } from "@chakra-ui/hooks"
import { isBrowser, __DEV__ } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"
import * as React from "react"
import { createPortal } from "react-dom"
import { usePortalManager } from "./portal-manager"

type PortalContext = HTMLDivElement | null

const [PortalContextProvider, usePortalContext] = createContext<PortalContext>({
  strict: false,
  name: "PortalContext",
})

const PORTAL_CLASSNAME = "chakra-portal"
const PORTAL_SELECTOR = `.chakra-portal`

const Container: React.FC<{ zIndex: number }> = (props) => (
  <div
    className="chakra-portal-zIndex"
    style={{
      position: "absolute",
      zIndex: props.zIndex,
      top: 0,
      left: 0,
      right: 0,
      // NB: Don't add `bottom: 0`, it makes the entire app unusable
      // @see https://github.com/chakra-ui/chakra-ui/issues/3201
    }}
  >
    {props.children}
  </div>
)

/**
 * Portal that uses `document.body` as container
 */
const DefaultPortal: React.FC<{ appendToParentPortal?: boolean }> = (props) => {
  const { appendToParentPortal, children } = props

  const tempNode = React.useRef<HTMLDivElement | null>(null)
  const portal = React.useRef<HTMLDivElement | null>(null)

  const forceUpdate = useForceUpdate()

  const parentPortal = usePortalContext()
  const manager = usePortalManager()

  useSafeLayoutEffect(() => {
    if (!tempNode.current) return

    const doc = tempNode.current!.ownerDocument
    const host = appendToParentPortal ? parentPortal ?? doc.body : doc.body

    if (!host) return

    portal.current = doc.createElement("div")
    portal.current.className = PORTAL_CLASSNAME

    host.appendChild(portal.current)
    forceUpdate()

    const portalNode = portal.current
    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode)
      }
    }
  }, [])

  const _children = manager?.zIndex ? (
    <Container zIndex={manager?.zIndex}>{children}</Container>
  ) : (
    children
  )

  return portal.current ? (
    createPortal(
      <PortalContextProvider value={portal.current}>
        {_children}
      </PortalContextProvider>,
      portal.current,
    )
  ) : (
    <span ref={tempNode} />
  )
}

interface ContainerPortalProps {
  containerRef: React.RefObject<HTMLElement | null>
  appendToParentPortal?: boolean
}

/**
 * Portal that uses a custom container
 */
const ContainerPortal: React.FC<ContainerPortalProps> = (props) => {
  const { children, containerRef, appendToParentPortal } = props
  const containerEl = containerRef.current
  const host = containerEl ?? (isBrowser ? document.body : undefined)

  const portal = React.useMemo(() => {
    const node = containerEl?.ownerDocument.createElement("div")
    if (node) node.className = PORTAL_CLASSNAME
    return node
  }, [containerEl])

  const forceUpdate = useForceUpdate()

  useSafeLayoutEffect(() => {
    forceUpdate()
  }, [])

  useSafeLayoutEffect(() => {
    if (!portal || !host) return
    host.appendChild(portal)
    return () => {
      host.removeChild(portal)
    }
  }, [portal, host])

  if (host && portal) {
    return createPortal(
      <PortalContextProvider value={appendToParentPortal ? portal : null}>
        {children}
      </PortalContextProvider>,
      portal,
    )
  }

  return null
}

export interface PortalProps {
  /**
   * The `ref` to the component where the portal will be attached to.
   */
  containerRef?: React.RefObject<HTMLElement | null>
  /**
   * The content or node you'll like to portal
   */
  children: React.ReactNode
  /**
   * If `true`, the portal will check if it is within a parent portal
   * and append itself to the parent's portal node.
   * This provides nesting for portals.
   *
   * If `false`, the portal will always append to `document.body`
   * regardless of nesting. It is used to opt out of portal nesting.
   */
  appendToParentPortal?: boolean
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
  const { containerRef, ...rest } = props
  return containerRef ? (
    <ContainerPortal containerRef={containerRef} {...rest} />
  ) : (
    <DefaultPortal {...rest} />
  )
}

Portal.defaultProps = {
  appendToParentPortal: true,
}

Portal.className = PORTAL_CLASSNAME
Portal.selector = PORTAL_SELECTOR

if (__DEV__) {
  Portal.displayName = "Portal"
}
