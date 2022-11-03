import { useTimeout } from "@chakra-ui/react-use-timeout"
import { useUpdateEffect } from "@chakra-ui/react-use-update-effect"
import { runIfFn } from "@chakra-ui/shared-utils"
import { motion, useIsPresent, Variants } from "framer-motion"
import {
  chakra,
  ReducedMotionProps,
  useReducedMotionValue,
} from "@chakra-ui/system"
import type { ToastOptions } from "./toast.types"
import { getToastStyle } from "./toast.utils"
import { ToastProviderProps } from "./toast.provider"
import { memo, useEffect, useMemo, useState } from "react"

const toastMotionVariants: Variants = {
  initial: (props) => {
    const { position, reduceMotion } = props

    const dir = ["top", "bottom"].includes(position) ? "y" : "x"

    let factor = ["top-right", "bottom-right"].includes(position) ? 1 : -1
    if (position === "bottom") factor = 1

    return {
      opacity: reduceMotion ? 1 : 0,
      [dir]: factor * 24,
    }
  },
  animate: (props) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: props.reduceMotion ? 0 : 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  exit: (props) => ({
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: props.reduceMotion ? 0 : 0.2,
      ease: [0.4, 0, 1, 1],
    },
  }),
}

export interface ToastComponentProps
  extends ToastOptions,
    ReducedMotionProps,
    Pick<ToastProviderProps, "motionVariants" | "toastSpacing"> {}

export const ToastComponent = memo((props: ToastComponentProps) => {
  const reduceMotion = useReducedMotionValue(props.reduceMotion)
  const {
    id,
    message,
    onCloseComplete,
    onRequestRemove,
    requestClose = false,
    position = "bottom",
    duration = 5000,
    containerStyle,
    motionVariants = toastMotionVariants,
    toastSpacing = "0.5rem",
  } = props

  const [delay, setDelay] = useState(duration)
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

  useEffect(() => {
    if (isPresent && requestClose) {
      onRequestRemove()
    }
  }, [isPresent, requestClose, onRequestRemove])

  useTimeout(close, delay)

  const containerStyles = useMemo(
    () => ({
      pointerEvents: "auto",
      maxWidth: 560,
      minWidth: 300,
      margin: toastSpacing,
      ...containerStyle,
    }),
    [containerStyle, toastSpacing],
  )

  const toastStyle = useMemo(() => getToastStyle(position), [position])

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
      custom={{ position, reduceMotion }}
      style={toastStyle}
    >
      <chakra.div
        role="status"
        aria-atomic="true"
        className="chakra-toast__inner"
        __css={containerStyles}
      >
        {runIfFn(message, { id, onClose: close })}
      </chakra.div>
    </motion.li>
  )
})

ToastComponent.displayName = "ToastComponent"
