/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import * as ReactDOM from "react-dom"
import { usePortalManager } from "./Portal.manager"
import { isBrowser, createContext } from "@chakra-ui/utils"

const [
  PortalContextProvider,
  usePortalContext,
] = createContext<HTMLDivElement | null>({
  strict: false,
})

export interface PortalProps {
  onMount?: () => void
  onUnmount?: () => void
  mountNode?: HTMLElement
  index?: number
  children?: React.ReactNode
}

export function Portal(props: PortalProps) {
  const { onMount, onUnmount, mountNode, index, children } = props

  // To manage nested layers
  const parentPortal = usePortalContext()

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

  const manager = usePortalManager()

  const appendTo = React.useCallback(
    (node: HTMLElement | null) => {
      // if user specified a mount node, do nothing.
      if (mountNode || !portalNode || !node) return

      // give user ability to change the index of layers
      const elementAtIndex = index ? node.children[index] : null

      // if an element exists at the index, add this component before it
      if (elementAtIndex) {
        node.insertBefore(portalNode, elementAtIndex)
      } else {
        // else, simply append component to the node
        node.appendChild(portalNode)
      }
    },
    [index, mountNode, portalNode],
  )

  React.useEffect(() => {
    // if user specified a mount node, do nothing but run onMount.
    if (mountNode) {
      onMount?.()
      return
    }

    // If portal is nested, use the parent portal as host,
    // else, if no manager exists, use document.body
    const parent = parentPortal ?? manager?.node ?? document.body

    appendTo(parent)

    return () => {
      onUnmount?.()

      if (!portalNode) return

      if (parent?.contains(portalNode)) {
        parent?.removeChild(portalNode)
      }
    }
  }, [
    onMount,
    mountNode,
    portalNode,
    parentPortal,
    onUnmount,
    manager && manager.node,
    appendTo,
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
    ReactDOM.createPortal(_children, mountNode)
  }

  if (!portalNode) return <>{_children}</>

  return ReactDOM.createPortal(
    <PortalContextProvider value={portalNode}>
      {_children}
    </PortalContextProvider>,
    portalNode,
  )
}

export default Portal
