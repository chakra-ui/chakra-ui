import arrow from "@popperjs/core/lib/modifiers/arrow"
import eventListeners from "@popperjs/core/lib/modifiers/eventListeners"
import flip from "@popperjs/core/lib/modifiers/flip"
import offset from "@popperjs/core/lib/modifiers/offset"
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow"
import {
  defaultModifiers,
  popperGenerator,
} from "@popperjs/core/lib/popper-lite"
import {
  innerArrow,
  matchWidth,
  positionArrow,
  transformOrigin,
} from "./modifiers"
import { getEventListenerOptions } from "./utils"

/* -------------------------------------------------------------------------------------------------
  We're initializing our own `createPopper` function with our opinionated defaults to
  keep the bundle size low.

  @see https://popper.js.org/docs/v2/tree-shaking/
* -----------------------------------------------------------------------------------------------*/

export interface CreatePopperOptions {
  offset?: [x: number, y: number]
  gutter?: number
  preventOverflow?: boolean
  flip?: boolean
  matchWidth?: boolean
  boundary?: "clippingParents" | "scrollParent" | HTMLElement
  eventListeners?: boolean | { scroll?: boolean; resize?: boolean }
  arrowPadding?: number
}

export function createPopperFn(options: CreatePopperOptions) {
  return popperGenerator({
    defaultOptions: {
      placement: "bottom",
      strategy: "absolute",
      modifiers: [],
    },
    defaultModifiers: [
      ...defaultModifiers,
      positionArrow,
      innerArrow,
      transformOrigin,
      {
        ...eventListeners,
        ...getEventListenerOptions(options.eventListeners),
      },
      {
        ...arrow,
        options: {
          padding: options.arrowPadding,
        },
      },
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
        options: {
          boundary: options.boundary || "clippingParents",
        },
      },
      {
        ...matchWidth,
        enabled: !!options.matchWidth,
      },
    ],
  })
}
