import { useTimeout, useUpdateEffect } from "@chakra-ui/hooks"
import { __DEV__, isFunction } from "@chakra-ui/utils"
import ReachAlert from "@reach/alert"
import { motion, useIsPresent, Variants } from "framer-motion"
import * as React from "react"
import type { ToastOptions } from "./toast.types"
import { getToastStyle } from "./toast.utils"
import { ToastProviderProps } from "./toast.provider"

const toastMotionVariants: Variants = {
  initial: (props) => {
    const { position } = props

    const dir = ["top", "bottom"].includes(position) ? "y" : "x"

    let factor = ["top-right", "bottom-right"].includes(position) ? 1 : -1
    if (position === "bottom") factor = 1

    return {
      opacity: 0,
      [dir]: factor * 24,
    }
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
}

export interface ToastComponentProps
  extends ToastOptions,
    Pick<ToastProviderProps, "motionVariants" | "toastSpacing"> {}

export const ToastComponent: React.FC<ToastComponentProps> = (props) => {
  const {
    id,
    message,
    onCloseComplete,
    onRequestRemove,
    requestClose = false,
    position = "bottom",
    duration = 5000,
    containerStyle = {},
    motionVariants = toastMotionVariants,
    toastSpacing = "0.5rem",
  } = props

  const [delay, setDelay] = React.useState(duration)

  const isPresent = useIsPresent()

  useUpdateEffect(() => {
    if (!isPresent) {
      onCloseComplete?.()
    }
  }, [isPresent])

  useUpdateEffect(() => {
    setDelay(duration)
  }, [duration])

  const onMouseEnter = () => setDelay(null)
  const onMouseLeave = () => setDelay(duration)

  const close = () => {
    if (isPresent) onRequestRemove()
  }

  React.useEffect(() => {
    if (isPresent && requestClose) {
      onRequestRemove()
    }
  }, [isPresent, requestClose, onRequestRemove])

  useTimeout(close, delay)

  const style = React.useMemo(() => getToastStyle(position), [position])

  return (
    <motion.li
      layout
      className="chakra-toast"
      variants={motionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onHoverStart={onMouseEnter}
      onHoverEnd={onMouseLeave}
      custom={{ position }}
      style={style}
    >
      <ReachAlert
        className="chakra-toast__inner"
        style={{
          pointerEvents: "auto",
          maxWidth: 560,
          minWidth: 300,
          margin: toastSpacing,
          ...containerStyle,
        }}
      >
        {isFunction(message) ? message({ id, onClose: close }) : message}
      </ReachAlert>
    </motion.li>
  )
}

if (__DEV__) {
  ToastComponent.displayName = "ToastComponent"
}
