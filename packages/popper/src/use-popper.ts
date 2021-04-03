import {
  createPopper,
  Instance,
  Modifier,
  Placement,
  VirtualElement,
} from "@popperjs/core"
import {
  cloneElement,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { mergeRefs } from "@chakra-ui/react-utils"
import * as customModifiers from "./modifiers"
import { getEventListenerOptions } from "./utils"

export type { Placement }

export interface UsePopperProps {
  offset?: [x: number, y: number]
  gutter?: number
  preventOverflow?: boolean
  flip?: boolean
  matchWidth?: boolean
  boundary?: "clippingParents" | "scrollParent" | HTMLElement
  eventListeners?: boolean | { scroll?: boolean; resize?: boolean }
  arrowPadding?: number
  strategy?: "absolute" | "fixed"
  placement?: Placement
  modifiers?: Array<Partial<Modifier<string, any>>>
}

export function usePopper(props: UsePopperProps = {}) {
  const {
    modifiers = [],
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
  } = props

  const reference = useRef<Element | VirtualElement | null>(null)
  const popper = useRef<HTMLElement | null>(null)
  const instanceRef = useRef<Instance | null>(null)

  const cleanup = useRef(() => {})

  const setupPopper = useCallback(() => {
    if (!reference.current || !popper.current) return
    cleanup.current?.()

    instanceRef.current = createPopper(reference.current, popper.current, {
      placement: placementProp,
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
        ...modifiers,
      ],
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
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        instanceRef.current?.destroy()
        instanceRef.current = null
      }
    }
  }, [])

  return useMemo(() => {
    const referenceRef = <T extends Element | VirtualElement>(
      node: T | null,
    ) => {
      reference.current = node
      setupPopper()
    }

    const popperRef = <T extends HTMLElement>(node: T | null) => {
      popper.current = node
      setupPopper()
    }

    return {
      update: instanceRef.current?.update,
      forceUpdate: instanceRef.current?.forceUpdate,
      referenceRef,
      popperRef,
      getPopperProps: (props: any = {}, ref = null) => ({
        ...props,
        ref: mergeRefs(popperRef, ref),
        style: {
          ...props.style,
          position: strategy,
          minWidth: "max-content",
        },
      }),
      getArrowProps: (props: any = {}, ref = null) => {
        const { size, shadowColor, bg, style, ...rest } = props
        const innerProps = { "data-popper-arrow-inner": "" }
        return {
          ...rest,
          ref,
          "data-popper-arrow": "",
          style: {
            ...style,
            position: "absolute",
            ...(size && { "--popper-arrow-size": size }),
            ...(shadowColor && { "--popper-arrow-shadow-color": shadowColor }),
            ...(bg && { "--popper-arrow-bg": bg }),
          },
          children: props.children
            ? cloneElement(props.children, innerProps)
            : createElement("div", innerProps),
        }
      },
      getReferenceProps: (props: any = {}, ref = null) => ({
        ...props,
        ref: mergeRefs(referenceRef, ref),
      }),
    }
  }, [setupPopper, strategy])
}

export type UsePopperReturn = ReturnType<typeof usePopper>
