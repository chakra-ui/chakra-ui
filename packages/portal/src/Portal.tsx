/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { createPortal } from "react-dom"
import { usePortalManager } from "./Portal.manager"
import { isBrowser, createContext } from "@chakra-ui/utils"

const [
  PortalContextProvider,
  usePortalContext,
] = createContext<HTMLDivElement | null>({
  strict: false,
})

export interface PortalProps {
  onMount?(): void
  onUnmount?(): void
  mountNode?: HTMLElement
  children?: React.ReactNode
}

export function Portal(props: PortalProps) {
  const { onMount, onUnmount, mountNode, children } = props

  // the portalNode to render it's children
  const [portalNode] = React.useState(() => {
    if (isBrowser) {
      const portalNode = document.createElement("div")
      portalNode.className = "chakra-portal"
      return portalNode
    }
    // for ssr
    return null
  })

  // To manage nested layers
  const parentPortal = usePortalContext()

  // If there's a PortalManager rendered,
  // let's read from it
  const manager = usePortalManager()

  const append = React.useCallback(
    (container: HTMLElement | null) => {
      // if user specified a mount node, do nothing.
      if (mountNode || !portalNode || !container) return

      // else, simply append component to the portal node
      container.appendChild(portalNode)
    },
    [mountNode, portalNode],
  )

  React.useEffect(() => {
    // if user specified a mount node, do nothing but run onMount.
    if (mountNode) {
      onMount?.()
      return
    }

    // If portal is nested, use the parent portal as host,
    // else, if no manager exists, use document.body
    const container = parentPortal ?? manager?.node ?? document.body

    append(container)

    return () => {
      onUnmount?.()

      if (!portalNode) return

      if (container?.contains(portalNode)) {
        container?.removeChild(portalNode)
      }
    }
  }, [
    onMount,
    mountNode,
    portalNode,
    parentPortal,
    onUnmount,
    manager && manager.node,
    append,
  ])

  const _children = manager?.zIndex ? (
    <div
      className="chakra-zIndex-wrapper"
      style={{ zIndex: manager.zIndex }}
      children={children}
    />
  ) : (
    children
  )

  if (mountNode) {
    return createPortal(_children, mountNode)
  }

  if (!portalNode) return <React.Fragment>{_children}</React.Fragment>

  return createPortal(
    <PortalContextProvider value={portalNode}>
      {_children}
    </PortalContextProvider>,
    portalNode,
  )
}
