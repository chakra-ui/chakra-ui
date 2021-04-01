import { filterUndefined } from "@chakra-ui/utils"
import {
  createPopper,
  Instance,
  Modifier,
  Placement,
  VirtualElement,
} from "@popperjs/core"
import { useCallback, useEffect, useMemo, useRef } from "react"
import * as popperModifiers from "./modifiers"
import { getEventListenerOptions } from "./utils"

export type { Placement }

export interface UsePopperProps {
  /**
   * The offset of the popper to be near of the reference element.
   */
  offset?: [x: number, y: number]
  /**
   * If `offset` is not defined, this will be used to set the offset of the
   * popper to be near of the reference element.
   */
  gutter?: number
  /**
   * If `true` will prevent the popper from being cut off by moving it so that
   * it stays visible within its boundary area.
   */
  preventOverflow?: boolean
  /**
   * If `true` the popper will attempt to flip the opposite placement if the
   * preferred does not fit.
   */
  flip?: boolean
  /**
   * If `true` the popper will have the same width as the reference.
   */
  matchWidth?: boolean
  boundary?: "clippingParents" | "scrollParent" | HTMLElement
  eventListeners?: boolean | { scroll?: boolean; resize?: boolean }
  /**
   * The offset of the popper arrow that points toward the reference element.
   */
  arrowPadding?: number
  /**
   * The positioning strategy to use, by default is `absolute`.
   *
   * If your reference element is in a fixed container,
   * use the `fixed` strategy
   */
  strategy?: "absolute" | "fixed"
  /**
   * The preferred placement of the popper.
   */
  placement?: Placement
  modifiers?: Array<Partial<Modifier<string, any>>>
}

const defaultProps: UsePopperProps = {
  placement: "bottom",
  strategy: "absolute",
  flip: true,
  gutter: 8,
  arrowPadding: 8,
  preventOverflow: true,
  eventListeners: true,
  modifiers: [],
  boundary: "clippingParents",
}

export function usePopper(props: UsePopperProps = {}) {
  const opts = Object.assign({}, defaultProps, filterUndefined(props))
  const {
    modifiers = [],
    placement: placementProp,
    strategy,
    arrowPadding,
    eventListeners,
    offset,
    gutter,
    flip,
    boundary,
    preventOverflow,
    matchWidth,
  } = opts

  const reference = useRef<Element | VirtualElement | null>(null)
  const popper = useRef<HTMLElement | null>(null)
  const instanceRef = useRef<Instance | null>(null)

  const cleanup = useRef(() => {})

  const setupPopper = useCallback(() => {
    if (!reference.current || !popper.current) return
    cleanup.current?.()

    instanceRef.current = createPopper(reference.current, popper.current, {
      placement: placementProp,
      modifiers: modifiers.concat([
        popperModifiers.innerArrow,
        popperModifiers.positionArrow,
        popperModifiers.transformOrigin,
        { ...popperModifiers.matchWidth, enabled: !!matchWidth },
        {
          name: "eventListeners",
          ...getEventListenerOptions(eventListeners),
        },
        {
          name: "arrow",
          options: { padding: arrowPadding },
        },
        {
          name: "offset",
          options: {
            offset: offset ?? [0, gutter],
          },
        },
        {
          name: "flip",
          enabled: !!flip,
          options: { padding: 8 },
        },
        {
          name: "preventOverflow",
          enabled: !!preventOverflow,
          options: { boundary },
        },
      ]),
      strategy,
    })

    // force update one-time to fix any positioning issues
    instanceRef.current.forceUpdate()

    cleanup.current = instanceRef.current.destroy
  }, [
    placementProp,
    modifiers,
    matchWidth,
    eventListeners,
    arrowPadding,
    offset,
    gutter,
    flip,
    preventOverflow,
    boundary,
    strategy,
  ])

  useEffect(() => {
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  return useMemo(
    () => ({
      update: instanceRef.current?.update,
      forceUpdate: instanceRef.current?.forceUpdate,
      referenceRef: <T extends Element | VirtualElement>(node: T | null) => {
        reference.current = node
        setupPopper()
      },
      popperRef: <T extends HTMLElement>(node: T | null) => {
        popper.current = node
        setupPopper()
      },
    }),
    [setupPopper],
  )
}

export type UsePopperReturn = ReturnType<typeof usePopper>
