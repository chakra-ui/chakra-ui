import { mergeRefs, PropGetterV2 } from "@chakra-ui/react-utils"
import {
  createPopper,
  Instance,
  Modifier,
  VirtualElement,
} from "@popperjs/core"
import { useCallback, useEffect, useRef } from "react"
import * as customModifiers from "./modifiers"
import { getPopperPlacement, PlacementWithLogical } from "./popper.placement"
import { cssVars, getEventListenerOptions } from "./utils"

export interface UsePopperProps {
  /**
   * Whether the popper.js should be enabled
   */
  enabled?: boolean
  /**
   * The main and cross-axis offset to displace popper element
   * from its reference element.
   */
  offset?: [number, number]
  /**
   * The distance or margin between the reference and popper.
   * It is used internally to create an `offset` modifier.
   *
   * NB: If you define `offset` prop, it'll override the gutter.
   * @default 8
   */
  gutter?: number
  /**
   * If `true`, will prevent the popper from being cut off and ensure
   * it's visible within the boundary area.
   * @default true
   */
  preventOverflow?: boolean
  /**
   * If `true`, the popper will change its placement and flip when it's
   * about to overflow its boundary area.
   * @default true
   */
  flip?: boolean
  /**
   * If `true`, the popper will match the width of the reference at all times.
   * It's useful for `autocomplete`, `date-picker` and `select` patterns.
   */
  matchWidth?: boolean
  /**
   * The boundary area for the popper. Used within the `preventOverflow` modifier
   * @default "clippingParents"
   */
  boundary?: "clippingParents" | "scrollParent" | HTMLElement
  /**
   * If provided, determines whether the popper will reposition itself on `scroll`
   * and `resize` of the window.
   */
  eventListeners?: boolean | { scroll?: boolean; resize?: boolean }
  /**
   * The padding required to prevent the arrow from
   * reaching the very edge of the popper.
   * @default 8
   */
  arrowPadding?: number
  /**
   * The CSS positioning strategy to use.
   * @default "absolute"
   */
  strategy?: "absolute" | "fixed"
  /**
   * The placement of the popper relative to its reference.
   * @default "bottom"
   */
  placement?: PlacementWithLogical
  /**
   * Array of popper.js modifiers. Check the docs to see
   * the list of possible modifiers you can pass.
   *
   * @see Docs https://popper.js.org/docs/v2/modifiers/
   */
  modifiers?: Array<Partial<Modifier<string, any>>>

  /**
   * Theme direction `ltr` or `rtl`. Popper's placement will
   * be set accordingly
   * @default "ltr"
   */
  direction?: "ltr" | "rtl"
}

export type ArrowCSSVarProps = {
  /**
   * The size of the popover arrow.
   * This sets the `--popper-arrow-size` css property
   */
  size?: string | number
  /**
   * The box-shadow color of the popover arrow.
   * This sets the `--popper-arrow-shadow-color` css property
   */
  shadowColor?: string
  /**
   * The background color of teh popper arrow.
   * This sets the `--popper-arrow-bg` css property.
   */
  bg?: string
}

export function usePopper(props: UsePopperProps = {}) {
  const {
    enabled = true,
    modifiers,
    placement: placementProp = "bottom",
    strategy = "absolute",
    arrowPadding = 8,
    eventListeners = true,
    offset,
    gutter = 8,
    flip = true,
    boundary = "clippingParents",
    preventOverflow = true,
    matchWidth,
    direction = "ltr",
  } = props

  const reference = useRef<Element | VirtualElement | null>(null)
  const popper = useRef<HTMLElement | null>(null)
  const instance = useRef<Instance | null>(null)
  const placement = getPopperPlacement(placementProp, direction)

  const cleanup = useRef(() => {})

  const setupPopper = useCallback(() => {
    if (!enabled || !reference.current || !popper.current) return

    // If popper instance exists, destroy it so we can create a new one
    cleanup.current?.()

    instance.current = createPopper(reference.current, popper.current, {
      placement,
      modifiers: [
        customModifiers.innerArrow,
        customModifiers.positionArrow,
        customModifiers.transformOrigin,
        { ...customModifiers.matchWidth, enabled: !!matchWidth },
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
        // allow users override internal modifiers
        ...(modifiers ?? []),
      ],
      strategy,
    })

    // force update one-time to fix any positioning issues
    instance.current.forceUpdate()

    cleanup.current = instance.current.destroy
  }, [
    placement,
    enabled,
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
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        instance.current?.destroy()
        instance.current = null
      }
    }
  }, [])

  const referenceRef = useCallback(
    <T extends Element | VirtualElement>(node: T | null) => {
      reference.current = node
      setupPopper()
    },
    [setupPopper],
  )

  const getReferenceProps = useCallback<PropGetterV2<"button">>(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(referenceRef, ref),
    }),
    [referenceRef],
  )

  const popperRef = useCallback(
    <T extends HTMLElement>(node: T | null) => {
      popper.current = node
      setupPopper()
    },
    [setupPopper],
  )

  const getPopperProps = useCallback<PropGetterV2<"div">>(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(popperRef, ref),
      style: {
        ...props.style,
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0",
      },
    }),
    [strategy, popperRef],
  )

  const getArrowProps = useCallback<PropGetterV2<"div", ArrowCSSVarProps>>(
    (props = {}, ref = null) => {
      const { size, shadowColor, bg, style, ...rest } = props
      return {
        ...rest,
        ref,
        "data-popper-arrow": "",
        style: getArrowStyle(props),
      }
    },
    [],
  )

  const getArrowInnerProps = useCallback<PropGetterV2<"div">>(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      "data-popper-arrow-inner": "",
    }),
    [],
  )

  return {
    update() {
      instance.current?.update()
    },
    forceUpdate() {
      instance.current?.forceUpdate()
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps,
  }
}

function getArrowStyle(props: any) {
  const { size, shadowColor, bg, style } = props
  const computedStyle = { ...style, position: "absolute" }
  if (size) {
    computedStyle["--popper-arrow-size"] = size
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg
  }
  return computedStyle
}

export type UsePopperReturn = ReturnType<typeof usePopper>
