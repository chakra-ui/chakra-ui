import { useTimeout } from "@chakra-ui/hooks"
import { Transition } from "@chakra-ui/transition"
import { isFunction } from "@chakra-ui/utils"
import ReachAlert from "@reach/alert"
import { useRect } from "@reach/rect"
import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { ToastOptions, ToastPosition } from "./Toast.types"

const getStyle = (position: ToastPosition) => {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  if (position.includes("right")) {
    style.alignItems = "flex-end"
  } else if (position.includes("left")) {
    style.alignItems = "flex-start"
  }

  return style
}

export type ToastProps = ToastOptions & {
  requestClose?: boolean
}

export function Toast(props: ToastProps) {
  const {
    id,
    message,
    onRequestRemove,
    requestClose = false,
    position = "bottom",
    duration = 5000,
  } = props

  const ref = useRef<HTMLDivElement>(null)
  const [delay, setDelay] = useState(duration)
  const [show, setShow] = useState(true)

  useEffect(() => {
    setDelay(duration)
  }, [duration])

  const onMouseEnter = () => {
    setDelay(null)
  }

  const onMouseLeave = () => {
    setDelay(duration)
  }

  const onExited = () => {
    if (!show) {
      onRequestRemove()
    }
  }

  const close = () => {
    setShow(false)
  }

  useEffect(() => {
    if (requestClose) {
      setShow(false)
    }
  }, [requestClose])

  useTimeout(close, delay)

  const style = useMemo(() => getStyle(position), [position])

  const rect = useRect(ref)
  const height = rect?.height ?? 0

  const isTop = position.includes("top")

  /**
   * @todo
   *
   * Make it possible to configure this toast transition
   * from `theme.transitions.toast`
   */
  const y = isTop ? `-${height}px` : 0

  const styles = {
    init: {
      opacity: 0,
      height: 0,
      transform: `translateY(${y}) scale(1)`,
    },
    entered: {
      opacity: 1,
      height,
      transform: `translateY(0) scale(1)`,
    },
    exiting: {
      opacity: 0,
      height: 0,
      transform: `translateY(0) scale(0.9)`,
    },
  }

  return (
    <Transition
      styles={styles}
      /**
       * We use the `easeInOutQuint` from https://easings.net/en#
       */
      transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
      in={show}
      onExited={onExited}
    >
      {styles => (
        <div
          data-toast=""
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            willChange: "transform, height, opacity",
            ...style,
            ...styles,
          }}
        >
          <div
            ref={ref}
            data-toast-inner=""
            style={{ pointerEvents: "auto", maxWidth: 560, minWidth: 300 }}
          >
            <ReachAlert>
              {isFunction(message) ? message({ id, onClose: close }) : message}
            </ReachAlert>
          </div>
        </div>
      )}
    </Transition>
  )
}
