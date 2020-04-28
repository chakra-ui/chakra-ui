import * as React from "react"
import { Toast } from "./Toast"
import {
  ToastMessage,
  ToastOptions,
  ToastPosition,
  ToastId,
} from "./Toast.types"
import { addToast, findToast, isVisible, getToastPosition } from "./Toast.utils"
import { objectKeys } from "@chakra-ui/utils"

export interface Methods {
  notify: Function
  closeAll: Function
  close: Function
  update: Function
  isActive: Function
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

    this.setState(prevState => {
      const nextState = addToast(prevState, toast as any)
      return nextState
    })

    const { position, id } = toast
    return { id, position }
  }

  updateToast = (id: string, options: CreateToastOptions) => {
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
    this.setState(prevState => {
      const nextState = { ...prevState }

      for (const position in nextState) {
        const pos = position as keyof State
        nextState[pos] = nextState[pos].map(toast => {
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
    const id = options?.id ?? ++ToastManager.counter

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
  closeToast = (id: string) => {
    this.setState(prevState => {
      const position = getToastPosition(prevState, id)

      if (!position) return prevState

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
  deleteToast = (id: ToastId, position: ToastPosition) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [position]: prevState[position].filter(toast => toast.id !== id),
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
      // maxWidth: "560px",
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
          {toasts.map((toast, index) => {
            return (
              <Toast
                position={position}
                key={`${toast.id}-${index}`}
                {...toast}
              />
            )
          })}
        </span>
      )
    })
  }
}
