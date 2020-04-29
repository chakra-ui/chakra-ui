import { objectKeys } from "@chakra-ui/utils"
import * as React from "react"
import { Toast } from "./Toast"
import {
  ToastId,
  ToastMessage,
  ToastOptions,
  ToastPosition,
} from "./Toast.types"
import { findToast, getToastPosition } from "./Toast.utils"

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
  Pick<ToastOptions, "type" | "duration" | "position" | "id">
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

    this.setState(prevToasts => {
      /**
       * - If the toast is positioned at the top edges, the
       * recent toast stacks on top of the other toasts.
       *
       * - If the toast is positioned at the bottom edges, the recent
       * toast stacks below the other toasts.
       */
      const isTop = position.includes("top")

      return {
        ...prevToasts,
        [position]: isTop
          ? [toast, ...prevToasts[position]]
          : [...prevToasts[position], toast],
      }
    })

    return id
  }

  updateToast = (id: ToastId, options: CreateToastOptions) => {
    this.setState(prevState => {
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
    objectKeys(this.state).forEach(position => {
      this.state[position].forEach(toast => {
        this.closeToast(toast.id)
      })
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
      showing: true,
      duration: options.duration,
      onRequestRemove: () => this.removeToast(String(id), position),
      type: options.type,
    }
  }

  /**
   * Requests to close a toast based on it's id and position
   */
  closeToast = (id: ToastId) => {
    this.setState(prevState => {
      const position = getToastPosition(prevState, id)

      if (!position) return prevState

      return {
        ...prevState,
        [position]: prevState[position].map(toast => ({
          ...toast,
          requestClose: toast.id == id,
        })),
      }
    })
  }

  /**
   * Delete a toast record at it's position
   */
  removeToast = (id: ToastId, position: ToastPosition) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [position]: prevState[position].filter(toast => toast.id != id),
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
  getStyle = (position: ToastPosition) => {
    const style: React.CSSProperties = {
      position: "fixed",
      zIndex: 5500,
      pointerEvents: "none",
    }

    if (position === "top" || position === "bottom") {
      style.margin = "0 auto"
      style.textAlign = "center"
    }

    if (position.includes("top")) {
      style.top = 0
    }

    if (position.includes("bottom")) {
      style.bottom = 0
    }

    if (!position.includes("left")) {
      style.right = 0
    }

    if (!position.includes("right")) {
      style.left = 0
    }

    return style
  }

  render() {
    return objectKeys(this.state).map(position => {
      const toasts = this.state[position]
      return (
        <span
          key={position}
          id={"chakra-toast-manager-" + position}
          style={this.getStyle(position)}
        >
          {toasts.map(toast => (
            <Toast position={position} key={toast.id} {...toast} />
          ))}
        </span>
      )
    })
  }
}
