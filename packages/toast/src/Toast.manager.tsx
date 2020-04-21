import * as React from "react"
import { Toast } from "./Toast"
import { ToastPosition, ToastOptions, ToastMessage } from "./Toast.types"

interface Props {
  notify: (createToast: Function, closeAll: Function, close: Function) => void
}

type State = { [K in ToastPosition]: ToastOptions[] }

type CreateToastOptions = Partial<
  Pick<ToastOptions, "type" | "duration" | "position">
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
    props.notify(this.notify, this.closeAll, this.closeToast)
  }

  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */
  notify = (message: ToastMessage, options: CreateToastOptions) => {
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

  /**
   * Close all toasts at once
   */
  closeAll = () => {
    this.setState(prevState => {
      const nextState = { ...prevState }

      for (const position in nextState) {
        const _position = position as keyof State
        nextState[_position] = nextState[_position].map(toast => {
          return { ...toast, requestClose: true }
        })
      }

      return nextState
    })
  }

  /**
   * Create properties for a new toast
   */
  createToast = (message: ToastMessage, options: CreateToastOptions) => {
    const id = ++ToastManager.counter

    const position = options?.position ?? "top"

    return {
      id,
      message,
      position,
      showing: true,
      duration: options.duration,
      onRequestRemove: () => this.deleteToast(String(id), position),
      type: options.type,
    }
  }

  /**
   * Requests to close a toast based on it's id and position
   */
  closeToast = (id: string, position: ToastPosition) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [position]: prevState[position].map(toast => ({
          ...toast,
          requestClose: toast.id === id,
        })),
      }
    })
  }

  /**
   * Delete a toast record at it's position
   */
  deleteToast = (id: string, position: ToastPosition) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [position]: prevState[position].filter(toast => toast.id !== id),
      }
    })
  }

  /**
   * Compute the style of a toast based on it's position
   */
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
