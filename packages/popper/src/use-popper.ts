import type { Placement } from "@popperjs/core"
import { Modifier } from "@popperjs/core"
import { createElement, CSSProperties, useCallback, useState } from "react"
import { usePopper as useBasePopper } from "react-popper"
import { getBoxShadow, toTransformOrigin } from "./popper.utils"

export type { Placement }

export interface UsePopperProps {
  gutter?: number
  placement?: Placement
  offset?: [number, number]
  preventOverflow?: boolean
  fixed?: boolean
  flip?: boolean
  arrowSize?: number
  matchWidth?: boolean
  arrowShadowColor?: string
  modifiers?: Modifier<string, any>[]
}

export function usePopper(props: UsePopperProps = {}) {
  const {
    placement = "bottom",
    preventOverflow = true,
    fixed = false,
    flip = true,
    arrowSize = 8,
    gutter = 8,
    offset,
    arrowShadowColor,
    matchWidth,
    modifiers,
  } = props

  const [referenceNode, setReferenceNode] = useState<HTMLButtonElement | null>(
    null,
  )
  const [popperNode, setPopperNode] = useState<HTMLDivElement | null>(null)
  const [arrowNode, setArrowNode] = useState<HTMLDivElement | null>(null)

  const popperJS = useBasePopper(referenceNode, popperNode, {
    placement,
    strategy: fixed ? "fixed" : "absolute",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: offset ?? [0, gutter],
        },
      },
      {
        name: "flip",
        enabled: flip,
        options: { padding: 8 },
      },
      {
        name: "arrow",
        enabled: !!arrowNode,
        options: { element: arrowNode },
      },
      {
        name: "preventOverflow",
        enabled: !!preventOverflow,
      },
      {
        name: "matchWidth",
        enabled: !!matchWidth,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: useCallback(({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`
        }, []),
        //@ts-expect-error
        effect: useCallback(({ state }) => {
          const reference = state.elements.reference as HTMLElement
          state.elements.popper.style.width = `${reference.offsetWidth}px`
        }, []),
      },
      {
        name: "applyArrowHide",
        enabled: true,
        phase: "write",
        fn: useCallback(({ state }) => {
          const { arrow } = state.elements
          if (arrow) {
            const hide = (state.modifiersData.arrow as any).centerOffset !== 0
            arrow.style.visibility = hide ? "hidden" : "visible"
          }
        }, []),
      },
      ...(modifiers ?? []),
    ],
  })

  const _placement = popperJS.state?.placement ?? placement

  const arrowStyles: CSSProperties = {
    ...popperJS.styles.arrow,
    width: arrowSize,
    height: arrowSize,
    zIndex: -1,
  }

  const offsetAdjust = arrowSize / 2

  if (_placement.startsWith("top")) arrowStyles.bottom = -offsetAdjust
  if (_placement.startsWith("bottom")) arrowStyles.top = -offsetAdjust
  if (_placement.startsWith("left")) arrowStyles.right = -offsetAdjust
  if (_placement.startsWith("right")) arrowStyles.left = -offsetAdjust

  return {
    state: popperJS.state,
    transformOrigin: toTransformOrigin(_placement),
    reference: {
      ref: setReferenceNode,
    },
    popper: {
      ref: setPopperNode,
      style: popperJS.styles?.popper,
      ...popperJS.attributes.popper,
    },
    arrow: {
      ...popperJS.attributes.arrow,
      ref: setArrowNode,
      style: arrowStyles,
      /**
       * This is used to mimic css `&::before` pseudo element
       * so users won't need to use `css` or `css-in-js` to get arrow
       * positioned correctly
       */
      children: createElement("div", {
        style: {
          background: "currentColor",
          boxShadow: arrowShadowColor
            ? getBoxShadow(_placement, arrowShadowColor)
            : undefined,
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
          transform: "rotate(45deg)",
        },
      }),
    },
    forceUpdate: popperJS.forceUpdate,
    update: popperJS.update,
    placement: _placement,
  }
}

export type UsePopperReturn = ReturnType<typeof usePopper>
