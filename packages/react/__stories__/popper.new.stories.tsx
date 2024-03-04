import { motion } from "framer-motion"
import * as React from "react"
import { usePopper } from "../src/popper"

export default {
  title: "System / Popper v2",
}

export const ExamplePopper = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const { referenceRef, popperRef } = usePopper({
    gutter: 16,
    placement: "right-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [100, 100],
        },
      },
    ],
  })
  return (
    <div style={{ minHeight: "200vh", paddingTop: "100vh" }}>
      <button onClick={() => setIsOpen(!isOpen)} ref={referenceRef}>
        Testing
      </button>
      {isOpen && (
        <div ref={popperRef} style={{ padding: 20, background: "red" }}>
          <div
            data-popper-arrow=""
            style={{
              background: "yellow",
              ["--popper-arrow-size" as string]: "10px",
            }}
          />
          Popper
        </div>
      )}
    </div>
  )
}

function debounce(func: any, wait: number, immediate?: any) {
  let timeout: any
  return function run(this: any, ...args: any[]) {
    const context = this
    const later = function later() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export const VirtualElement = () => {
  function generateGetBoundingClientRect(x = 200, y = 400) {
    return () =>
      ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
      }) as DOMRect
  }

  const [node, setNode] = React.useState({
    getBoundingClientRect: generateGetBoundingClientRect(),
  })

  const { popperRef, referenceRef, update } = usePopper({
    eventListeners: false,
  })

  React.useEffect(() => {
    referenceRef(node)
    const el = document.getElementById("root")
    //@ts-ignore
    const handler = debounce(({ clientX: x, clientY: y }) => {
      setNode({ getBoundingClientRect: generateGetBoundingClientRect(x, y) })
      update?.()
    }, 10)
    el?.addEventListener("mousemove", handler)
    return () => {
      el?.removeEventListener("mousemove", handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node])

  return (
    <div id="rooty" style={{ height: 400, background: "red" }}>
      <div ref={popperRef}>Some popper</div>
    </div>
  )
}

export const WithAnimation = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const {
    getPopperProps,
    referenceRef,
    getArrowProps,
    getArrowInnerProps,
    transformOrigin,
  } = usePopper({
    placement: "bottom",
  })
  return (
    <div style={{ minHeight: "200vh", paddingTop: "100vh" }}>
      <button ref={referenceRef} onClick={() => setIsOpen(!isOpen)}>
        Trigger
      </button>
      <div {...getPopperProps()}>
        <motion.div
          style={{
            transformOrigin,
            background: "red",
            padding: 8,
          }}
          transition={{ duration: 0.15 }}
          initial={false}
          animate={
            isOpen ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.01 }
          }
        >
          <div
            {...getArrowProps({
              shadowColor: "rgba(0,0,0,0.3)",
              size: "8px",
              bg: "red",
            })}
          >
            <div {...getArrowInnerProps()} />
          </div>
          Popper
        </motion.div>
      </div>
    </div>
  )
}
