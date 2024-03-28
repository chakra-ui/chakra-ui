"use client"

import { createPortal } from "react-dom"

export interface PortalProps {
  /**
   * The `ref` to the component where the portal will be attached to.
   */
  containerRef?: React.RefObject<HTMLElement | null>
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
 * @see Docs https://chakra-ui.com/portal
 */

export function Portal(props: PortalProps) {
  const { containerRef, children } = props
  const mountNode = containerRef?.current ?? globalThis?.document.body
  return mountNode ? createPortal(children, mountNode) : null
}
