import type { Placement } from "@popperjs/core"
import { createPopper, Instance, Modifier } from "@popperjs/core"
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import isEqual from "react-fast-compare"
import { getArrowStyles, toTransformOrigin } from "./popper.utils"

const isBrowser = typeof window !== "undefined"
const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect

function applyStyles(styles?: Partial<CSSStyleDeclaration>) {
  return (prevStyles: CSSProperties) => {
    if (styles && !isEqual(prevStyles, styles)) {
      return styles as CSSProperties
    }
    return prevStyles
  }
}

export type { Placement }

export interface UsePopperProps {
  /**
   * Offset between the reference and the popover on the main axis. Should not be combined with `unstable_offset`.
   */
  gutter?: number
  /**
   * The popper.js placement
   */
  placement?: Placement
  /**
   * Offset between the reference and the popover: [main axis, alt axis]. Should not be combined with `gutter`.
   */
  offset?: (number | string)[]
  /**
   * Prevents popover from being positioned outside the boundary.
   */
  preventOverflow?: boolean
  /**
   * Whether or not the popover should have `position` set to `fixed`.
   */
  fixed?: boolean
  /**
   * Whether to trigger a re-calculation of placement styles
   */
  forceUpdate?: boolean
  /**
   * Flip the popover's placement when it starts to overlap its reference
   * element.
   */
  flip?: boolean
  /**
   * The arrow size
   */
  arrowSize?: number
  /**
   * The arrow's box-shadow color
   */
  arrowShadowColor?: string
  /**
   * Custom modifiers to use
   */
  modifiers?: Modifier<any, any>[]
}

export function usePopper(props: UsePopperProps = {}) {
  const {
    forceUpdate = true,
    placement: initialPlacement = "bottom",
    offset: offsetProp,
    preventOverflow = true,
    fixed = false,
    flip = true,
    arrowSize = 10,
    arrowShadowColor,
    gutter = arrowSize,
    modifiers,
  } = props

  // This holds the popper.js instance
  const popper = useRef<Instance | null>(null)

  // Set up the refs
  const referenceRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  // Keep track of placements calculated by popper.js
  const [originalPlacement, setCustomPlacement] = useState(initialPlacement)
  const [placement, setPlacement] = useState(initialPlacement)

  // Keep track of the offsets between the reference and popper
  const offset = offsetProp || [0, gutter]

  // Keeps track of the computed styles of the popper and arrow
  const [popoverStyles, setPopoverStyles] = useState<CSSProperties>({})
  const [arrowStyles, setArrowStyles] = useState<CSSProperties>({})

  const modifiersOverride = modifiers ?? []

  useSafeLayoutEffect(() => {
    if (referenceRef.current && popoverRef.current) {
      popper.current = createPopper(referenceRef.current, popoverRef.current, {
        placement: originalPlacement,
        strategy: fixed ? "fixed" : "absolute",
        modifiers: [
          {
            // https://popper.js.org/docs/v2/modifiers/event-listeners/
            name: "eventListeners",
            enabled: forceUpdate,
          },
          {
            // https://popper.js.org/docs/v2/modifiers/apply-styles/
            name: "applyStyles",
            enabled: false,
          },
          {
            // https://popper.js.org/docs/v2/modifiers/flip/
            name: "flip",
            enabled: flip,
            options: { padding: 8 },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/compute-styles/
            name: "computeStyles",
            options: { gpuAcceleration: false },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/offset/
            name: "offset",
            options: { offset },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/prevent-overflow/
            name: "preventOverflow",
            enabled: preventOverflow,
            options: {
              tetherOffset: () => arrowRef.current?.clientWidth || 0,
            },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/arrow/
            name: "arrow",
            enabled: !!arrowRef.current,
            options: { element: arrowRef.current },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/#custom-modifiers
            name: "updateState",
            phase: "write",
            enabled: true,
            fn({ state }) {
              setPlacement(state.placement)
              setPopoverStyles(applyStyles(state.styles.popper))
              setArrowStyles(applyStyles(state.styles.arrow))
            },
          },
          ...modifiersOverride,
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

  useSafeLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      if (forceUpdate) {
        popper.current?.forceUpdate()
      }
    })
    return () => {
      cancelAnimationFrame(id)
    }
  }, [forceUpdate])

  const forcePopperUpdate = useCallback(() => {
    if (popper.current) {
      popper.current.forceUpdate()
      return true
    }
    return false
  }, [])

  const _arrowStyles: CSSProperties = {
    ...arrowStyles,
    ...getArrowStyles(placement, arrowSize, arrowShadowColor),
  }

  return {
    popperInstance: popper.current,
    reference: {
      ref: referenceRef,
    },
    popper: {
      ref: popoverRef,
      style: {
        ...popoverStyles,
        transformOrigin: toTransformOrigin(placement),
      },
    },
    arrow: {
      ref: arrowRef,
      style: _arrowStyles,
    },
    update: forcePopperUpdate,
    placement,
    setPlacement: setCustomPlacement,
  }
}

export type UsePopperReturn = ReturnType<typeof usePopper>
