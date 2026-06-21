import * as React from "react"
import { type Dict, omit } from "../utils"

type OverlaySnapshotEntry<T extends Dict> = { id: string; props: T }

const shallowEqualEntries = <T extends Dict>(
  a: OverlaySnapshotEntry<T>[],
  b: OverlaySnapshotEntry<T>[],
) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const aEntry = a[i]
    const bEntry = b[i]
    if (!aEntry || !bEntry) return false
    if (aEntry.id !== bEntry.id) return false
    const aKeys = Object.keys(aEntry.props)
    const bKeys = Object.keys(bEntry.props)
    if (aKeys.length !== bKeys.length) return false
    for (const key of aKeys) {
      if (!Object.is(aEntry.props[key], bEntry.props[key])) return false
    }
  }
  return true
}

/**
 * Props that are injected into the overlay component by the `createOverlay` function.
 * These props are used to control the overlay's state and lifecycle.
 */
export interface CreateOverlayProps<TReturn = unknown> {
  /** Whether the overlay is currently open */
  open?: boolean
  /** Callback fired when the overlay's open state changes */
  onOpenChange?: (e: { open: boolean }) => void
  /** Callback fired when the overlay's exit animation completes */
  onExitComplete?: () => void
  /** Internal callback used to set the return value when the overlay closes */
  setReturnValue?: ((value: TReturn) => void) | undefined
  /** Internal callback used to signal when the exit animation is complete */
  setExitComplete?: (() => void) | undefined
}

export interface OverlayOptions<TProps extends CreateOverlayProps> {
  props?: TProps
}

export interface CreateOverlayReturn<
  TProps extends CreateOverlayProps,
  TReturn = unknown,
> {
  /** The root component for the overlay */
  Viewport: React.ElementType
  /** Opens a new overlay with the given id and props */
  open: (id: string, props?: TProps | undefined) => Promise<TReturn | undefined>
  /** Closes the overlay with the given id and returns the value */
  close: (id: string, value?: TReturn | undefined) => Promise<void>
  /** Updates the props of the overlay with the given id */
  update: (id: string, props: TProps) => void
  /** Removes the overlay with the given id */
  remove: (id: string) => void
  /** Removes all overlays */
  removeAll: () => void
  /** Gets the props of the overlay with the given id */
  get: (id: string) => TProps
  /** Gets the current snapshot of the overlays */
  getSnapshot: () => TProps[]
  /** Waits for the exit animation to complete for the overlay with the given id */
  waitForExit: (id: string) => Promise<void>
}

export function createOverlay<TProps extends Dict, TReturn = unknown>(
  Component: React.ComponentType<CreateOverlayProps<TReturn> & TProps>,
  options?: OverlayOptions<TProps>,
): CreateOverlayReturn<TProps, TReturn> {
  const map = new Map<string, TProps>()
  const exitPromises = new Map<string, Promise<void>>()

  const subscribers = new Set<(nextOverlayProps: TProps[]) => void>()
  const subscribe = (callback: (nextOverlayProps: TProps[]) => void) => {
    subscribers.add(callback)
    return () => subscribers.delete(callback)
  }
  const publish = () => {
    for (const callback of subscribers) {
      callback(getSnapshot())
    }
  }

  let lastSnapshotWithIds: OverlaySnapshotEntry<TProps>[] = []
  let lastSnapshotProps: TProps[] = []

  const getSnapshotForStore = () => {
    const nextSnapshot: OverlaySnapshotEntry<TProps>[] = Array.from(
      map.entries(),
    ).map(([id, props]) => ({ id, props }))
    if (shallowEqualEntries(lastSnapshotWithIds, nextSnapshot)) {
      return lastSnapshotWithIds
    }
    lastSnapshotWithIds = nextSnapshot
    lastSnapshotProps = nextSnapshot.map((e) => e.props)
    return lastSnapshotWithIds
  }

  const getSnapshot = (): TProps[] => {
    getSnapshotForStore()
    return lastSnapshotProps
  }

  const waitForExit = (id: string) => {
    return exitPromises.get(id) || Promise.resolve()
  }

  const open = (id: string, props?: TProps) => {
    const overlayProps = {
      ...options?.props,
      ...props,
      open: true,
      onOpenChange: (e: { open: boolean }) => {
        if (!e.open) close(id)
      },
      onExitComplete: () => {
        const overlay = get(id) as CreateOverlayProps<TReturn> & TProps
        if (overlay.setExitComplete) {
          overlay.setExitComplete()
          overlay.setExitComplete = undefined
        }
        remove(id)
      },
      setReturnValue: undefined,
      setExitComplete: undefined,
    } as unknown as TProps

    map.set(id, overlayProps)

    const prom = new Promise<TReturn>((resolve) => {
      map.set(id, {
        ...overlayProps,
        setReturnValue: resolve,
      } as unknown as TProps)
    })

    publish()

    return prom
  }

  const close = (id: string, value?: TReturn) => {
    const prevProps = get(id) as CreateOverlayProps<TReturn> & TProps
    map.set(id, { ...prevProps, open: false })

    if (prevProps.setReturnValue) {
      prevProps.setReturnValue(value as TReturn)
      prevProps.setReturnValue = undefined
    }

    publish()

    const exitPromise = new Promise<void>((resolve) => {
      const overlay = get(id) as CreateOverlayProps<TReturn> & TProps
      map.set(id, {
        ...overlay,
        setExitComplete: resolve,
      } as TProps)
    })

    exitPromises.set(id, exitPromise)
    return exitPromise
  }

  const remove = (id: string) => {
    map.delete(id)
    exitPromises.delete(id)
    publish()
  }

  const update = (id: string, props: TProps) => {
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

  function OverlayViewportItem(props: CreateOverlayProps<TReturn> & TProps) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    const open = mounted ? (props.open ?? false) : false

    return <Component {...props} open={open} />
  }

  function Viewport() {
    const overlays = React.useSyncExternalStore(
      subscribe,
      getSnapshotForStore,
      getSnapshotForStore,
    )
    return (
      <>
        {overlays.map(({ id, props }) => (
          <OverlayViewportItem key={id} {...props} />
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
