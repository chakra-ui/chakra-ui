import type {
  ToastId,
  ToastMethods,
  ToastOptions,
  ToastPlacement,
  ToastPlacementMap,
  ToastState,
} from "./toast.types"

interface ToastStore extends ToastMethods {
  getState(): ToastState
  subscribe(onStoreChange: VoidFunction): VoidFunction
  removeToast(id: ToastId, placement: ToastPlacement): void
}

const initialState: ToastPlacementMap<ToastOptions[]> = {
  top: [],
  "top-start": [],
  "top-end": [],
  "bottom-start": [],
  bottom: [],
  "bottom-end": [],
}

const allPlacements = Object.keys(initialState) as ToastPlacement[]

/**
 * Store to track all the toast across all placements
 */
export const toastStore = createStore(initialState)

function createStore(initialState: ToastState): ToastStore {
  let state = initialState
  const listeners = new Set<() => void>()

  const setState = (setStateFn: (_state: ToastState) => ToastState) => {
    state = setStateFn(state)
    listeners.forEach((fn) => fn())
  }

  return {
    getState: () => state,

    subscribe: (listener) => {
      listeners.add(listener)
      return () => {
        // Delete all toasts on unmount
        setState(() => initialState)
        listeners.delete(listener)
      }
    },

    /**
     * Delete a toast record at its placement
     */
    removeToast: (id, placement) => {
      setState((prevState) => ({
        ...prevState,
        // id may be string or number
        // eslint-disable-next-line eqeqeq
        [placement]: prevState[placement].filter((toast) => toast.id != id),
      }))
    },

    create(options) {
      const toast = createToast(options)
      const { placement, id } = toast

      setState((prevToasts) => {
        const isTop = placement!.includes("top")

        /**
         * - If the toast is placed at the top edges, the
         * recent toast stacks on top of the other toasts.
         *
         * - If the toast is placed at the bottom edges, the recent
         * toast stacks below the other toasts.
         */
        const toasts = isTop
          ? [toast, ...(prevToasts[placement] ?? [])]
          : [...(prevToasts[placement] ?? []), toast]

        return {
          ...prevToasts,
          [placement]: toasts,
        }
      })

      return id!
    },

    update: (id, options) => {
      if (!id) return

      setState((prevState) => {
        const nextState = { ...prevState }
        const { placement, index } = findToast(nextState, id)

        if (placement && index !== -1) {
          nextState[placement][index] = {
            ...nextState[placement][index],
            ...options,
          }
        }

        return nextState
      })
    },

    closeAll(placements) {
      // only one setState here for perf reasons
      // instead of spamming this.closeToast
      setState((prev) => {
        const placementsToClose = placements ?? allPlacements

        return placementsToClose.reduce(
          (acc, placement) => {
            acc[placement] = prev[placement].map((toast) => ({
              ...toast,
              requestClose: true,
            }))

            return acc
          },
          { ...prev } as ToastState,
        )
      })
    },

    close: (id) => {
      setState((prevState) => {
        const placement = getToastPlacement(prevState, id)

        if (!placement) return prevState

        return {
          ...prevState,
          [placement]: prevState[placement].map((toast) => {
            // id may be string or number
            // eslint-disable-next-line eqeqeq
            if (toast.id == id) {
              return {
                ...toast,
                requestClose: true,
              }
            }

            return toast
          }),
        }
      })
    },

    isActive: (id) => Boolean(findToast(toastStore.getState(), id).placement),
  }
}

/**
 * Static id counter to create unique ids
 * for each toast
 */
let counter = 0

/**
 * Create properties for a new toast
 */
function createToast(options: ToastOptions): ToastOptions {
  counter += 1
  const id = options.id ?? counter
  const placement = options.placement ?? "bottom"
  return {
    id,
    status: "info",
    ...options,
    placement,
    duration: options.duration,
    onRequestRemove() {
      return toastStore.removeToast(String(id), placement)
    },
    requestClose: false,
  }
}

const findById = (arr: ToastOptions[], id: ToastId) =>
  arr.find((toast) => toast.id === id)

function findToast(toasts: ToastState, id: ToastId) {
  const placement = getToastPlacement(toasts, id)

  const index = placement
    ? toasts[placement].findIndex((toast) => toast.id === id)
    : -1

  return {
    placement,
    index,
  }
}

function getToastPlacement(toasts: ToastState, id: ToastId) {
  for (const [placement, values] of Object.entries(toasts)) {
    if (findById(values, id)) {
      return placement as ToastPlacement
    }
  }
}
