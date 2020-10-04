import type { Placement, Modifier } from "@popperjs/core"
import * as React from "react"
import { usePopper as useBasePopper } from "react-popper"
import { getArrowStyles, getBoxShadow, toTransformOrigin } from "./popper.utils"

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
    modifiers = [],
  } = props

  const [
    referenceNode,
    setReferenceNode,
  ] = React.useState<HTMLButtonElement | null>(null)
  const [popperNode, setPopperNode] = React.useState<HTMLDivElement | null>(
    null,
  )
  const [arrowNode, setArrowNode] = React.useState<HTMLDivElement | null>(null)

  /**
   * recommended via popper docs
   * @see https://popper.js.org/react-popper/v2/faq/#why-i-get-render-loop-whenever-i-put-a-function-inside-the-popper-configuration
   */
  const customMofidiers = React.useMemo<Modifier<string, unknown>[]>(
    () => [
      // @see https://popper.js.org/docs/v2/modifiers/offset/
      // @ts-expect-error popper typings always expect `fn` & `phase`
      {
        name: "offset",
        options: {
          offset: offset ?? [0, gutter],
        },
        phase: "main",
      },
      // @see https://popper.js.org/docs/v2/modifiers/prevent-overflow/
      // @ts-expect-error popper typings always expect `fn` & `phase`
      {
        name: "preventOverflow",
        enabled: !!preventOverflow,
        phase: "main",
      },
      // @see https://popper.js.org/docs/v2/modifiers/arrow/
      // @ts-expect-error popper typings always expect `fn` & `phase`
      {
        name: "arrow",
        enabled: !!arrowNode,
        options: { element: arrowNode },
        phase: "main",
      },
      // @see https://popper.js.org/docs/v2/modifiers/flip/
      // @ts-expect-error popper typings always expect `fn` & `phase`
      {
        name: "flip",
        enabled: flip,
        options: {
          padding: 8,
        },
        phase: "main",
      },
      {
        name: "matchWidth",
        enabled: !!matchWidth,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`
        },
        effect: ({ state }) => () => {
          const reference = state.elements.reference as HTMLElement

          state.elements.popper.style.width = `${reference.offsetWidth}px`
        },
      },
      {
        name: "applyArrowHide",
        enabled: true,
        phase: "write",
        fn: ({ state }) => {
          const { arrow } = state.elements

          if (arrow) {
            const shouldHide = state.modifiersData.arrow?.centerOffset !== 0
            arrow.style.visibility = shouldHide ? "hidden" : "visible"
          }
        },
      },
    ],
    [arrowNode, flip, preventOverflow, offset, gutter, matchWidth],
  )

  const popperJS = useBasePopper(referenceNode, popperNode, {
    placement,
    strategy: fixed ? "fixed" : "absolute",
    modifiers: customMofidiers.concat(modifiers),
  })

  const _placement = popperJS.state?.placement ?? placement

  const arrowStyles = getArrowStyles({
    placement: _placement,
    popperArrowStyles: popperJS.styles.arrow,
    arrowSize,
  })

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
       * positioned correctly.
       *
       * NB: To change the background, we'll rely on `color` prop since
       * we use `currentColor` as the background color.
       */
      children: React.createElement("div", {
        style: {
          background: "currentColor",
          boxShadow: arrowShadowColor
            ? getBoxShadow(_placement, arrowShadowColor)
            : undefined,
          zIndex: -1,
          width: "100%",
          height: "100%",
        },
      }),
    },
    forceUpdate: popperJS.forceUpdate,
    update: popperJS.update,
    placement: _placement,
  }
}

export type UsePopperReturn = ReturnType<typeof usePopper>
