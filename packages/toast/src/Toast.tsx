import { useDimensions, useTimeout } from "@chakra-ui/hooks"
import { Transition } from "@chakra-ui/transition"
import ReachAlert from "@reach/alert"
import React from "react"
import { isFunction } from "@chakra-ui/utils"
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
    position,
    onRequestRemove,
    requestClose = false,
    duration = 5000,
  } = props

  const ref = React.useRef<HTMLDivElement>(null)
  const [timeout, setTimeout] = React.useState(duration)
  const [show, setShow] = React.useState(true)

  const isFromTop = position.includes("top")

  const onMouseEnter = () => {
    setTimeout(null)
  }

  const onMouseLeave = () => {
    setTimeout(duration)
  }

  const onExited = () => {
    if (!show) {
      onRequestRemove()
    }
  }

  const close = () => {
    setShow(false)
  }

  React.useEffect(() => {
    if (requestClose) {
      setShow(false)
    }
  }, [requestClose])

  useTimeout(close, timeout)

  const style = React.useMemo(() => getStyle(position), [position])

  const res = useDimensions(ref)
  const selfHeight = res?.borderBox.height ?? 0

  const styles = {
    init: {
      opacity: 0,
      height: 0,
      transform: `translateY(${isFromTop ? "-100%" : 0}) scale(1)`,
    },
    entered: {
      opacity: 1,
      height: selfHeight,
      transform: `translateY(0) scale(1)`,
    },
    exiting: {
      opacity: 0,
      height: 0,
      transform: `translateY(0) scale(0.4)`,
    },
  }

  return (
    <Transition styles={styles} in={show} onExited={onExited}>
      {styles => (
        <div
          data-toast=""
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ ...style, ...styles }}
        >
          <div ref={ref} data-toast-inner="" style={{ pointerEvents: "auto" }}>
            <ReachAlert>
              {isFunction(message) ? message({ id, onClose: close }) : message}
            </ReachAlert>
          </div>
        </div>
      )}
    </Transition>
  )
}
