import { Placement } from "@popperjs/core/lib/enums"
import arrow from "@popperjs/core/lib/modifiers/arrow"
import flip from "@popperjs/core/lib/modifiers/flip"
import offset from "@popperjs/core/lib/modifiers/offset"
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow"
import {
  defaultModifiers,
  Instance,
  Modifier,
  popperGenerator,
  State,
} from "@popperjs/core/lib/popper-lite"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { toTransformOrigin } from "./popper.utils"

const matchWidth: Modifier<"matchWidth", any> = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => () => {
    const reference = state.elements.reference as HTMLElement
    state.elements.popper.style.width = `${reference.offsetWidth}px`
  },
}

const adjustArrow: Modifier<"adjustArrow", any> = {
  name: "adjustArrow",
  enabled: true,
  phase: "afterWrite",
  fn: ({ state }) => {
    overrideArrowStyles(state)
  },
  effect: ({ state }) => () => {
    overrideArrowStyles(state)
  },
}

const transformOrigin: Modifier<"transformOrigin", any> = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: ({ state }) => {
    state.elements.popper.style.transformOrigin = toTransformOrigin(
      state.placement,
    )
  },
  effect: ({ state }) => () => {
    state.elements.popper.style.transformOrigin = toTransformOrigin(
      state.placement,
    )
  },
}

type PopperOptions = {
  offset?: [x: number, y: number]
  gutter?: number
  preventOverflow?: boolean
  flip?: boolean
  matchWidth?: boolean
  boundary?: "clippingParents" | HTMLElement
}

export function getCreatePopper(options: PopperOptions) {
  return popperGenerator({
    defaultOptions: {
      placement: "bottom",
      strategy: "absolute",
      modifiers: [],
    },
    defaultModifiers: [
      ...defaultModifiers,
      arrow,
      adjustArrow,
      transformOrigin,
      {
        ...offset,
        options: {
          offset: options.offset ?? [0, options.gutter],
        },
      },
      {
        ...flip,
        enabled: !!options.flip,
      },
      {
        ...preventOverflow,
        enabled: !!options.preventOverflow,
        options: { boundary: options.boundary || "clippingParents" },
      },
      {
        ...matchWidth,
        enabled: !!options.matchWidth,
      },
    ],
  })
}

const getArrowStyle = (placement: Placement) => {
  if (placement.startsWith("top"))
    return { property: "bottom", value: "var(--popper-arrow-offset)" }
  if (placement.startsWith("bottom"))
    return { property: "top", value: "var(--popper-arrow-offset)" }
  if (placement.startsWith("left"))
    return { property: "right", value: "var(--popper-arrow-offset)" }
  if (placement.startsWith("right"))
    return { property: "left", value: "var(--popper-arrow-offset)" }
}

const overrideArrowStyles = (state: Partial<State>) => {
  if (!state.placement) return
  const overrides = getArrowStyle(state.placement)

  if (state.elements?.arrow && overrides) {
    Object.assign(state.elements.arrow.style, {
      [overrides.property]: overrides.value,
      width: "var(--popper-arrow-size)",
      height: "var(--popper-arrow-size)",
      zIndex: -1,
    })

    const vars = {
      "--popper-arrow-size-half": "calc(var(--popper-arrow-size) / 2)",
      "--popper-arrow-offset": `calc(var(--popper-arrow-size-half) * -1)`,
    }

    for (const property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property])
    }
  }
}

interface UsePopperOptions extends PopperOptions {
  strategy?: "absolute" | "fixed"
  placement?: Placement
  modifiers?: Array<Modifier<any, any>>
}

const defaultOptions: UsePopperOptions = {
  placement: "bottom",
  strategy: "absolute",
  flip: true,
  gutter: 8,
  preventOverflow: true,
  modifiers: [],
}

export function usePopper(options: UsePopperOptions = {}) {
  const opts = Object.assign({}, defaultOptions, options)
  const { modifiers, placement } = opts

  const createPopper = useRef(getCreatePopper(opts))
  const reference = useRef<Element | null>(null)
  const popper = useRef<HTMLElement | null>(null)
  const instanceRef = useRef<Instance | null>(null)

  const cleanup = useRef(() => {})

  const setupPopper = useCallback(() => {
    if (!reference.current || !popper.current) return
    cleanup.current?.()

    instanceRef.current = createPopper.current(
      reference.current,
      popper.current,
      { placement, modifiers },
    )

    instanceRef.current.forceUpdate()
    cleanup.current = instanceRef.current.destroy
  }, [placement, modifiers])

  useEffect(() => {
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  return useMemo(
    () => ({
      referenceRef: <T extends Element>(node: T | null) => {
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
