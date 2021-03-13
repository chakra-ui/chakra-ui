import { Placement } from "@popperjs/core/lib/enums"
import arrow from "@popperjs/core/lib/modifiers/arrow"
import eventListeners from "@popperjs/core/lib/modifiers/eventListeners"
import flip from "@popperjs/core/lib/modifiers/flip"
import offset from "@popperjs/core/lib/modifiers/offset"
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow"
import {
  defaultModifiers,
  Instance,
  Modifier,
  popperGenerator,
  State,
  VirtualElement,
} from "@popperjs/core/lib/popper-lite"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { getBoxShadow, toTransformOrigin } from "./popper.utils"

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

const transformOrigin: Modifier<"transformOrigin", any> = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: ({ state }) => {
    overridePopperStyles(state)
  },
  effect: ({ state }) => () => {
    overridePopperStyles(state)
  },
}

const overridePopperStyles = (state: State) => {
  state.elements.popper.style.setProperty(
    "--popper-transform-origin",
    toTransformOrigin(state.placement),
  )
}

const adjustArrow: Modifier<"adjustArrow", any> = {
  name: "adjustArrow",
  enabled: true,
  phase: "afterWrite",
  fn: ({ state }) => {
    overrideArrowStyles(state)
  },
}

const overrideInnerArrow = (state: State) => {
  if (!state.elements.arrow) return
  const existingInner = state.elements.arrow.querySelector(
    "#arrow-inner",
  ) as HTMLElement | null
  const boxShadow = getBoxShadow(state.placement)
  if (!existingInner) {
    const doc = state.elements.arrow.ownerDocument
    const inner = doc.createElement("div")
    inner.id = "arrow-inner"
    state.elements.arrow.appendChild(inner)
    Object.assign(inner.style, {
      transform: "rotate(45deg)",
      background: "var(--popper-arrow-bg, inherit)",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: -1,
      boxShadow,
    })
  } else if (boxShadow) {
    existingInner.style.boxShadow = boxShadow
  }
}

const innerArrow: Modifier<"innerArrow", any> = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requiresIfExists: ["arrow"],
  fn: ({ state }) => {
    overrideInnerArrow(state)
  },
  effect: ({ state }) => () => {
    overrideInnerArrow(state)
  },
}

type PopperOptions = {
  offset?: [x: number, y: number]
  gutter?: number
  preventOverflow?: boolean
  flip?: boolean
  matchWidth?: boolean
  boundary?: "clippingParents" | HTMLElement
  eventListeners?: boolean | { scroll?: boolean; resize?: boolean }
  arrowPadding?: number
}

function getEventListenerOptions(value: PopperOptions["eventListeners"]) {
  const defaultListeners = { scroll: true, resize: true }
  let eventListeners: { enabled?: boolean; options?: typeof defaultListeners }
  if (typeof value === "object") {
    eventListeners = {
      enabled: true,
      options: { ...defaultListeners, ...value },
    }
  } else {
    eventListeners = { enabled: value, options: defaultListeners }
  }
  return eventListeners
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
      { ...eventListeners, ...getEventListenerOptions(options.eventListeners) },
      { ...arrow, options: { padding: options.arrowPadding } },
      adjustArrow,
      innerArrow,
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
        options: {
          padding: 8,
        },
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
  if (placement.startsWith("top")) {
    return { property: "bottom", value: "var(--popper-arrow-offset)" }
  }
  if (placement.startsWith("bottom")) {
    return { property: "top", value: "var(--popper-arrow-offset)" }
  }
  if (placement.startsWith("left")) {
    return { property: "right", value: "var(--popper-arrow-offset)" }
  }
  if (placement.startsWith("right")) {
    return { property: "left", value: "var(--popper-arrow-offset)" }
  }
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
  arrowPadding: 8,
  preventOverflow: true,
  eventListeners: true,
  modifiers: [],
}

export function usePopper(options: UsePopperOptions = {}) {
  const opts = { ...defaultOptions, ...options }
  const { modifiers = [], placement: placementProp } = opts

  const createPopper = useRef(getCreatePopper(opts))
  const reference = useRef<Element | VirtualElement | null>(null)
  const popper = useRef<HTMLElement | null>(null)
  const instanceRef = useRef<Instance | null>(null)

  const cleanup = useRef(() => {})

  const setupPopper = useCallback(() => {
    if (!reference.current || !popper.current) return
    cleanup.current?.()

    instanceRef.current = createPopper.current(
      reference.current,
      popper.current,
      { placement: placementProp, modifiers },
    )

    cleanup.current = instanceRef.current.destroy
  }, [placementProp, modifiers])

  useEffect(() => {
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  return useMemo(
    () => ({
      get update() {
        return instanceRef.current?.update
      },
      get forceUpdate() {
        return instanceRef.current?.forceUpdate
      },
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
