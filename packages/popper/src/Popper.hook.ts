import * as React from "react"
import { Placement, Instance, createPopper } from "@popperjs/core"
import { getArrowStyles } from "./Popper.utils"

const isBrowser = typeof window !== "undefined"
const useIsomorphicEffect = isBrowser ? React.useLayoutEffect : React.useEffect

export { Placement }

export interface PopperHookProps {
  gutter?: number
  placement?: Placement
  offset?: number
  preventOverflow?: boolean
  fixed?: boolean
  forceUpdate?: boolean
  flip?: boolean
  arrowSize?: number
  eventsEnabled?: boolean
}

export function usePopper(props: PopperHookProps) {
  const {
    placement: initialPlacement = "bottom",
    offset: sealedOffset,
    preventOverflow = true,
    fixed = false,
    forceUpdate = true,
    flip = true,
    arrowSize = 10,
    gutter = arrowSize,
    eventsEnabled = true,
  } = props

  const popper = React.useRef<Instance | null>(null)
  const referenceRef = React.useRef<HTMLButtonElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const arrowRef = React.useRef<HTMLDivElement>(null)

  const [originalPlacement, place] = React.useState(initialPlacement)
  const [placement, setPlacement] = React.useState(initialPlacement)
  const [offset] = React.useState(sealedOffset || [0, gutter])
  const [popoverStyles, setPopoverStyles] = React.useState<React.CSSProperties>(
    {},
  )
  const [arrowStyles, setArrowStyles] = React.useState<React.CSSProperties>({})

  const update = React.useCallback(() => {
    if (popper.current) {
      popper.current.forceUpdate()
      return true
    }
    return false
  }, [])

  useIsomorphicEffect(() => {
    if (referenceRef.current && popoverRef.current) {
      popper.current = createPopper(referenceRef.current, popoverRef.current, {
        placement: originalPlacement,
        strategy: fixed ? "fixed" : "absolute",
        modifiers: [
          {
            name: "eventListener",
            phase: "write",
            enabled: eventsEnabled,
          },
          {
            name: "applyStyles",
            enabled: false,
          },
          {
            name: "flip",
            enabled: flip,
            options: { padding: 8 },
          },
          {
            name: "computeStyles",
            options: { gpuAcceleration: false },
          },
          {
            name: "offset",
            options: { offset },
          },
          {
            name: "preventOverflow",
            enabled: preventOverflow,
            options: {
              tetherOffset: () => arrowRef.current?.clientWidth || 0,
            },
          },
          {
            name: "arrow",
            enabled: Boolean(arrowRef.current),
            options: { element: arrowRef.current },
          },
          {
            name: "updateState",
            phase: "write",
            enabled: true,
            fn({ state }) {
              setPlacement(state.placement)
              setPopoverStyles(state.styles.popper as React.CSSProperties)
              setArrowStyles(state.styles.arrow as React.CSSProperties)
            },
          },
        ],
      })
    }
    return () => {
      if (popper.current) {
        popper.current.destroy()
        popper.current = null
      }
    }
  }, [originalPlacement, fixed, forceUpdate, flip, offset, preventOverflow])

  React.useEffect(() => {
    if (forceUpdate && popper.current) {
      popper.current.update()
    }
  }, [forceUpdate])

  const computedArrowStyles: React.CSSProperties = {
    ...arrowStyles,
    ...getArrowStyles(placement, arrowSize),
  }

  return {
    popperInstance: popper.current,
    reference: {
      ref: referenceRef,
    },
    popper: {
      ref: popoverRef,
      style: popoverStyles,
    },
    arrow: {
      ref: arrowRef,
      style: computedArrowStyles,
    },
    update,
    placement,
    place,
  }
}

export type PopperHookReturn = ReturnType<typeof usePopper>

export default usePopper
