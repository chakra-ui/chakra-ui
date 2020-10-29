import { mergeRefs, PropGetter } from "@chakra-ui/utils"
import type { Modifier, Placement } from "@popperjs/core"
import * as React from "react"
import { usePopper as useBasePopper } from "./react-popper"
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
  arrowShadowColor?: string
  /**
   * The distance of the arrow to its next border (numeric)
   * E.g. arrowPadding = borderRadius * 2
   */
  arrowPadding?: number
  matchWidth?: boolean
  modifiers?: Modifier<string, any>[]
}

export function usePopper(props: UsePopperProps = {}) {
  const {
    placement = "bottom",
    preventOverflow = true,
    fixed = false,
    flip = true,
    arrowSize = 8,
    arrowShadowColor,
    gutter = 8,
    arrowPadding = 4,
    offset,
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
  const customMofidiers = React.useMemo<Partial<Modifier<any, unknown>>[]>(
    () => [
      // @see https://popper.js.org/docs/v2/modifiers/offset/
      {
        name: "offset",
        options: {
          offset: offset ?? [0, gutter],
        },
        phase: "main",
      },
      // @see https://popper.js.org/docs/v2/modifiers/prevent-overflow/
      {
        name: "preventOverflow",
        enabled: !!preventOverflow,
        phase: "main",
      },
      // @see https://popper.js.org/docs/v2/modifiers/arrow/
      {
        name: "arrow",
        enabled: !!arrowNode,
        options: { element: arrowNode, padding: arrowPadding },
        phase: "main",
      },
      // @see https://popper.js.org/docs/v2/modifiers/flip/
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
        fn({ state }) {
          const { arrow } = state.elements
          if (arrow) {
            if (state.modifiersData.arrow?.centerOffset !== 0) {
              arrow.setAttribute("data-hide", "")
            } else {
              arrow.removeAttribute("data-hide")
            }
          }
        },
      },
    ],
    [
      arrowNode,
      arrowPadding,
      flip,
      preventOverflow,
      offset,
      gutter,
      matchWidth,
    ],
  )

  const popperJS = useBasePopper(referenceNode as any, popperNode as any, {
    placement,
    strategy: fixed ? "fixed" : "absolute",
    modifiers: customMofidiers.concat(modifiers),
  })

  /**
   * Ensure the popper will be correctly positioned with an extra update
   */
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      popperJS.forceUpdate?.()
    })
    return () => {
      cancelAnimationFrame(id)
    }
  }, [])

  const finalPlacement = popperJS.state?.placement ?? placement

  const arrowStyles = getArrowStyles({
    placement: finalPlacement,
    popperArrowStyles: popperJS.styles.arrow,
    arrowSize,
  })

  const getReferenceProps: PropGetter = (props = {}, _ref = null) => {
    return {
      ...props,
      ref: mergeRefs(setReferenceNode, _ref),
    }
  }

  const getPopperProps: PropGetter = (props = {}, _ref = null) => {
    return {
      ...props,
      ...popperJS.attributes.popper,
      ref: mergeRefs(setPopperNode, _ref),
      style: { ...props.style, ...popperJS.styles?.popper },
    }
  }

  const getArrowWrapperProps: PropGetter = (props = {}, _ref = null) => {
    return {
      ...props,
      ...popperJS.attributes.arrow,
      ref: mergeRefs(setArrowNode, _ref),
      style: { ...props.style, ...arrowStyles },
    }
  }

  const getArrowProps: PropGetter = (props = {}, _ref = null) => {
    return {
      ...props,
      ref: _ref,
      style: {
        boxShadow: getBoxShadow(finalPlacement, arrowShadowColor),
        ...props.style,
        position: "absolute",
        zIndex: -1,
        width: "100%",
        height: "100%",
        transform: "rotate(45deg)",
      },
    }
  }

  return {
    transformOrigin: toTransformOrigin(finalPlacement),
    getReferenceProps,
    getPopperProps,
    getArrowWrapperProps,
    getArrowProps,
    state: popperJS.state,
    forceUpdate: popperJS.forceUpdate,
    update: popperJS.update,
    placement: finalPlacement,
  }
}

export type UsePopperReturn = ReturnType<typeof usePopper>
