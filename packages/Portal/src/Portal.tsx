import * as React from "react"
import * as ReactDOM from "react-dom"
import { usePortalsContext } from "./PortalManager"
import { isBrowser } from "@chakra-ui/utils"

const LayerContext = React.createContext<HTMLDivElement | null>(null)
const useLayerContext = () => React.useContext(LayerContext)

export interface LayerProps {
  onMount?: () => void
  onUnmount?: () => void
  mountNode?: HTMLElement
  index?: number
  children?: React.ReactNode
}

export function Portal({
  onMount,
  onUnmount,
  mountNode,
  index,
  children,
}: LayerProps) {
  // To manage nested layers
  const parentLayer = useLayerContext()

  // the container to render it's children
  const [container] = React.useState(() => {
    // prepare the container for the children before inserting into the host
    if (isBrowser) {
      const container = document.createElement("div")
      container.className = "chakra-portal"
      return container
    }
    // for ssr
    return null
  })

  const layersManager = usePortalsContext()

  const addLayer = React.useCallback(
    (host: HTMLElement | null) => {
      // if user specified a mount node, do nothing.
      if (mountNode || !container) return

      if (host) {
        // give user ability to change the index of layers
        const elementAtIndex = index ? host.children[index] : null

        // if an element exists at the index, add this component before it
        if (elementAtIndex) {
          host.insertBefore(container, elementAtIndex)
        } else {
          // else, simply append component to the host
          host.appendChild(container)
        }
      }
    },
    [index, mountNode, container],
  )

  React.useEffect(() => {
    // if user specified a mount node, do nothing but run onMount.
    if (mountNode) {
      onMount && onMount()
      return
    }

    // If layer is nested, use the parent layer as host,
    // else, if no LayersManager exists, use document.body
    const finalHost = parentLayer ?? layersManager?.host ?? document.body
    addLayer(finalHost)

    return () => {
      // Remove the node when it unmounts
      onUnmount && onUnmount()

      if (!container) return

      if (finalHost && finalHost.contains(container)) {
        finalHost.removeChild(container)
      }
    }
  }, [
    onMount,
    mountNode,
    container,
    parentLayer,
    onUnmount,
    layersManager,
    addLayer,
  ])

  const finalChildren: React.ReactNode = layersManager?.zIndex ? (
    <div
      className="chakra-zIndex-wrapper"
      style={{ zIndex: layersManager.zIndex }}
      children={children}
    />
  ) : (
    children
  )

  if (mountNode) {
    ReactDOM.createPortal(finalChildren, mountNode)
  }

  if (!container) return <>{finalChildren}</>

  return ReactDOM.createPortal(
    <LayerContext.Provider value={container}>
      {finalChildren}
    </LayerContext.Provider>,
    container,
  )
}

export default Portal
