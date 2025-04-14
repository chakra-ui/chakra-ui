import * as React from "react"
import { type Dict, omit } from "../utils"

const shallowEqual = <T extends Dict>(a: T[], b: T[]) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const aKeys = Object.keys(a[i])
    const bKeys = Object.keys(b[i])
    if (aKeys.length !== bKeys.length) return false
    for (const key of aKeys) {
      if (!Object.is(a[i][key], b[i][key])) return false
    }
  }
  return true
}

/**
 * Props that are injected into the overlay component by the `createOverlay` function.
 * These props are used to control the overlay's state and lifecycle.
 */
export interface CreateOverlayProps {
  /** Whether the overlay is currently open */
  open?: boolean
  /** Callback fired when the overlay's open state changes */
  onOpenChange?: (e: { open: boolean }) => void
  /** Callback fired when the overlay's exit animation completes */
  onExitComplete?: () => void
  /** Internal callback used to set the return value when the overlay closes */
  setReturnValue?: ((value: unknown) => void) | undefined
  /** Internal callback used to signal when the exit animation is complete */
  setExitComplete?: (() => void) | undefined
}

export interface OverlayOptions<T extends CreateOverlayProps> {
  props?: T
}

export interface CreateOverlayReturn<T extends CreateOverlayProps> {
  /** The root component for the overlay */
  Viewport: React.ElementType
  /** Opens a new overlay with the given id and props */
  open: (id: string, props: T) => Promise<any>
  /** Closes the overlay with the given id and returns the value */
  close: (id: string, value?: any) => Promise<void>
  /** Updates the props of the overlay with the given id */
  update: (id: string, props: T) => void
  /** Removes the overlay with the given id */
  remove: (id: string) => void
  /** Removes all overlays */
  removeAll: () => void
  /** Gets the props of the overlay with the given id */
  get: (id: string) => T
  /** Gets the current snapshot of the overlays */
  getSnapshot: () => T[]
  /** Waits for the exit animation to complete for the overlay with the given id */
  waitForExit: (id: string) => Promise<void>
}

export function createOverlay<T extends Dict>(
  Component: React.ElementType<T & CreateOverlayProps>,
  options?: OverlayOptions<T>,
): CreateOverlayReturn<T> {
  const map = new Map<string, T>()
  const exitPromises = new Map<string, Promise<void>>()

  const subscribers = new Set<(nextOverlayProps: T[]) => void>()
  const subscribe = (callback: (nextOverlayProps: T[]) => void) => {
    subscribers.add(callback)
    return () => subscribers.delete(callback)
  }
  const publish = () => {
    for (const callback of subscribers) {
      callback(getSnapshot())
    }
  }

  let lastSnapshot: T[] = []

  const getSnapshot = () => {
    const nextSnapshot = Array.from(map.values())
    if (shallowEqual(lastSnapshot, nextSnapshot)) return lastSnapshot
    lastSnapshot = nextSnapshot
    return lastSnapshot
  }

  const waitForExit = (id: string) => {
    return exitPromises.get(id) || Promise.resolve()
  }

  const open = (id: string, props: T) => {
    const overlayProps = {
      ...options?.props,
      ...props,
      open: true,
      onOpenChange: (e: { open: boolean }) => {
        if (!e.open) close(id)
      },
      onExitComplete: () => {
        const overlay = get(id) as T & CreateOverlayProps
        if (overlay.setExitComplete) {
          overlay.setExitComplete()
          overlay.setExitComplete = undefined
        }
        remove(id)
      },
      setReturnValue: undefined,
      setExitComplete: undefined,
    }

    map.set(id, overlayProps as T)

    const prom = new Promise<any>((resolve) => {
      map.set(id, {
        ...overlayProps,
        setReturnValue: resolve,
      } as T)
    })

    publish()

    return prom
  }

  const close = (id: string, value?: any) => {
    const prevProps = get(id) as T & CreateOverlayProps
    map.set(id, { ...prevProps, open: false })

    if (prevProps.setReturnValue) {
      prevProps.setReturnValue(value)
      prevProps.setReturnValue = undefined
    }

    publish()

    const exitPromise = new Promise<void>((resolve) => {
      const overlay = get(id) as T & CreateOverlayProps
      map.set(id, {
        ...overlay,
        setExitComplete: resolve,
      } as T)
    })

    exitPromises.set(id, exitPromise)
    return exitPromise
  }

  const remove = (id: string) => {
    map.delete(id)
    exitPromises.delete(id)
    publish()
  }

  const update = (id: string, props: T) => {
    const prevProps = get(id)
    map.set(id, {
      ...prevProps,
      ...omit(props, ["open", "onOpenChange", "onExitComplete"]),
    })
    publish()
  }

  const get = (id: string) => {
    const overlay = map.get(id)
    if (!overlay) {
      throw new Error(`[chakra-ui] Overlay with id ${id} not found`)
    }
    return overlay
  }

  const removeAll = () => {
    map.clear()
    exitPromises.clear()
    publish()
  }

  function Viewport() {
    const overlays = React.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getSnapshot,
    )
    return (
      <>
        {overlays.map((props, index) => (
          // @ts-expect-error - TODO: fix this
          <Component key={index} {...props} />
        ))}
      </>
    )
  }

  return {
    Viewport,
    open,
    close,
    update,
    remove,
    removeAll,
    get,
    getSnapshot,
    waitForExit,
  }
}
