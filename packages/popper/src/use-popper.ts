import { filterUndefined } from "@chakra-ui/utils"
import { Placement } from "@popperjs/core/lib/enums"
import {
  Instance,
  Modifier,
  VirtualElement,
} from "@popperjs/core/lib/popper-lite"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { createPopperFn, CreatePopperOptions } from "./create-popper"

export type { Placement }

export interface UsePopperProps extends CreatePopperOptions {
  strategy?: "absolute" | "fixed"
  placement?: Placement
  modifiers?: Array<Modifier<any, any>>
}

const defaultProps: UsePopperProps = {
  placement: "bottom",
  strategy: "absolute",
  flip: true,
  gutter: 8,
  arrowPadding: 8,
  preventOverflow: true,
  eventListeners: true,
  modifiers: [],
}

export function usePopper(props: UsePopperProps = {}) {
  const opts = { ...defaultProps, ...filterUndefined(props) }
  const { modifiers = [], placement: placementProp, strategy } = opts

  const createPopper = useRef(createPopperFn(opts))
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
      { placement: placementProp, modifiers, strategy },
    )

    // force update one-time to fix any positioning issues
    instanceRef.current.forceUpdate()

    cleanup.current = instanceRef.current.destroy
  }, [placementProp, strategy, modifiers])

  useEffect(() => {
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  return useMemo(
    () => ({
      update: instanceRef.current?.update,
      forceUpdate: instanceRef.current?.forceUpdate,
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

export type UsePopperReturn = ReturnType<typeof usePopper>
