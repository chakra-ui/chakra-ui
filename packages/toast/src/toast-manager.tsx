import { objectKeys } from "@chakra-ui/utils"
import * as React from "react"
import { Toast } from "./toast"
import {
  ToastId,
  ToastMessage,
  ToastOptions,
  ToastPosition,
} from "./toast.types"
import { findToast, getToastPosition } from "./toast.utils"

export interface Methods {
  notify: (message: ToastMessage, options: CreateToastOptions) => ToastId
  closeAll: () => void
  close: (id: ToastId) => void
  update: (id: ToastId, options: CreateToastOptions) => void
  isActive: (id: ToastId) => boolean
}

interface Props {
  notify: (methods: Methods) => void
}

type State = { [K in ToastPosition]: ToastOptions[] }

type CreateToastOptions = Partial<
  Pick<
    ToastOptions,
    "status" | "duration" | "position" | "id" | "onCloseComplete"
  >
>

/**
 * Manages the creation, and removal of toasts
 * across all corners ("top", "bottom", etc.)
 */
export class ToastManager extends React.Component<Props, State> {
  /**
   * Static id counter to create unique ids
   * for each toast
   */
  static counter = 0

  /**
   * State to track all the toast across all positions
   */
  state: State = {
    top: [],
    "top-left": [],
    "top-right": [],
    "bottom-left": [],
    bottom: [],
    "bottom-right": [],
  }

  constructor(props: Props) {
    super(props)

    const methods = {
      notify: this.notify,
      closeAll: this.closeAll,
      close: this.closeToast,
      update: this.updateToast,
      isActive: this.isVisible,
    }

    props.notify(methods)
  }

  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */
  notify = (message: ToastMessage, options: CreateToastOptions) => {
    const toast = this.createToast(message, options)
    const { position, id } = toast

    this.setState((prevToasts) => {
      const isTop = position.includes("top")

      /**
       * - If the toast is positioned at the top edges, the
       * recent toast stacks on top of the other toasts.
       *
       * - If the toast is positioned at the bottom edges, the recent
       * toast stacks below the other toasts.
       */
      const toasts = isTop
        ? [toast, ...prevToasts[position]]
        : [...prevToasts[position], toast]

      return {
        ...prevToasts,
        [position]: toasts,
      }
    })

    return id
  }

  /**
   * Update a specific toast with new options based on the
   * passed `id`
   */
  updateToast = (id: ToastId, options: CreateToastOptions) => {
    this.setState((prevState) => {
      const nextState = { ...prevState }
      const { position, index } = findToast(nextState, id)

      if (position && index !== -1) {
        nextState[position][index] = {
          ...nextState[position][index],
          ...options,
        }
      }

      return nextState
    })
  }

  /**
   * Close all toasts at once
   */
  closeAll = () => {
    // only one setState here for perf reasons
    // instead of spamming this.closeToast
    this.setState((prev) => {
      const positions: ToastPosition[] = [
        "bottom",
        "bottom-right",
        "bottom-left",
        "top",
        "top-left",
        "top-right",
      ]

      return positions.reduce((carry, position) => {
        carry[position] = prev[position].map((toast) => ({
          ...toast,
          requestClose: true,
        }))

        return carry
      }, {})
    })
  }

  /**
   * Create properties for a new toast
   */
  createToast = (message: ToastMessage, options: CreateToastOptions) => {
    const id = options.id ?? ++ToastManager.counter

    const position = options.position ?? "top"

    return {
      id,
      message,
      position,
      duration: options.duration,
      onCloseComplete: options.onCloseComplete,
      onRequestRemove: () => this.removeToast(String(id), position),
      status: options.status,
      requestClose: false,
    }
  }

  /**
   * Requests to close a toast based on its id and position
   */
  closeToast = (id: ToastId) => {
    this.setState((prevState) => {
      const position = getToastPosition(prevState, id)

      if (!position) {
        return prevState
      }

      return {
        ...prevState,
        [position]: prevState[position].map((toast) => ({
          ...toast,
          requestClose: toast.id == id ? true : toast.requestClose,
        })),
      }
    })
  }

  /**
   * Delete a toast record at its position
   */
  removeToast = (id: ToastId, position: ToastPosition) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [position]: prevState[position].filter((toast) => toast.id != id),
      }
    })
  }

  isVisible = (id: ToastId) => {
    const { position } = findToast(this.state, id)
    return Boolean(position)
  }

  /**
   * Compute the style of a toast based on it's position
   */
  getStyle = (position: ToastPosition): React.CSSProperties => {
    const isTopOrBottom = position === "top" || position === "bottom"

    const margin = isTopOrBottom ? "0 auto" : undefined
    const textAlign = isTopOrBottom ? "center" : undefined

    const top = position.includes("top") ? 0 : undefined
    const bottom = position.includes("bottom") ? 0 : undefined
    const right = !position.includes("left") ? 0 : undefined
    const left = !position.includes("right") ? 0 : undefined

    return {
      position: "fixed",
      zIndex: 5500,
      pointerEvents: "none",
      margin,
      textAlign,
      top,
      bottom,
      right,
      left,
    }
  }

  render() {
    return objectKeys(this.state).map((position) => {
      const toasts = this.state[position]
      return (
        <span
          key={position}
          id={"chakra-toast-manager-" + position}
          style={this.getStyle(position)}
        >
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </span>
      )
    })
  }
}
