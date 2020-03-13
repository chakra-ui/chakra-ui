import React from "react"
import { Toast } from "./Toast"
import { ToastPosition, ToastOptions, ToastMessage } from "./Toast.types"

interface Props {
  notify: (fn: Function, closeAll: Function, close: Function) => void
}

type State = { [K in ToastPosition]: ToastOptions[] }

/**
 * Manages the creation, and removal of toasts
 * across all corners ("top", "bottom", etc.)
 */
export class ToastManager extends React.Component<Props, State> {
  // static id generator for each toast
  static counter = 0

  // state to track all the toast across all corners
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
    props.notify(this.notify, this.closeAll, this.closeToast)
  }

  // calling the notify function, creates a toast at the specified position
  notify = (
    message: ToastMessage,
    options: Partial<Pick<ToastOptions, "type" | "duration" | "position">>,
  ) => {
    const toast = this.createToast(message, options)
    const { position, id } = toast

    /**
     * - If the toast is positioned at the top edges, the
     * recent toast stacks on top of the other toasts.
     *
     * - If the toast is positioned at the bottom edges, the recent
     * toast stacks below the other toasts.
     */
    const isTop = position.includes("top")

    this.setState(prevState => {
      return {
        ...prevState,
        [position]: isTop
          ? [toast, ...prevState[position]]
          : [...prevState[position], toast],
      }
    })

    return { id, position }
  }

  closeAll = () => {
    Object.keys(this.state).forEach(positions => {
      const _positions = positions as keyof State
      const toasts = this.state[_positions]

      toasts.forEach(toast => {
        this.closeToast(toast.id, _positions)
      })
    })
  }

  createToast = (
    message: ToastMessage,
    options: Partial<Pick<ToastOptions, "type" | "duration" | "position">>,
  ) => {
    const id = ++ToastManager.counter

    const position = options?.position ?? "top"

    return {
      id,
      message,
      position,
      showing: true,
      duration: options.duration ?? 5000,
      onRequestRemove: () => this.removeToast(String(id), position),
      type: options.type,
    }
  }

  /**
   * Function that requests to close a toast based on it's id and positio
   */
  closeToast = (id: string, position: ToastPosition) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [position]: prevState[position].map(toast => {
          if (toast.id !== id) return toast
          return {
            ...toast,
            requestClose: true,
          }
        }),
      }
    })
  }

  // Function that actually removes the toast
  removeToast = (id: string, position: ToastPosition) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [position]: prevState[position].filter(toast => toast.id !== id),
      }
    })
  }

  // compute the styles for each toast positions
  getStyle = (position: ToastPosition) => {
    const style: React.CSSProperties = {
      maxWidth: "560px",
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
    return Object.keys(this.state).map(position => {
      const _position = position as keyof State
      const toasts = this.state[_position]
      return (
        <span
          key={position}
          id={"chakra-toast-manager-" + _position}
          style={this.getStyle(_position)}
        >
          {toasts.map(toast => {
            return <Toast position={_position} key={toast.id} {...toast} />
          })}
        </span>
      )
    })
  }
}
