import React from "react"
import { Transition } from "react-transition-group"
import { TransitionContext, TransitionProps } from "./Transition.utils"

type Placement = "left" | "right" | "bottom" | "top"

interface CreateBaseStyleProps {
  placement: Placement
  finalHeight?: string | number
  finalWidth?: string | number
}

function createBaseStyle(
  props: CreateBaseStyleProps,
): React.CSSProperties | undefined {
  const { placement, finalHeight, finalWidth } = props
  switch (placement) {
    case "bottom": {
      return {
        maxWidth: "100vw",
        height: finalHeight,
        bottom: 0,
        left: 0,
        right: 0,
      }
    }
    case "top": {
      return {
        maxWidth: "100vw",
        height: finalHeight,
        top: 0,
        left: 0,
        right: 0,
      }
    }
    case "left": {
      return {
        width: "100%",
        ...(finalWidth && { maxWidth: finalWidth }),
        height: "100vh",
        left: 0,
        top: 0,
      }
    }
    case "right": {
      return {
        width: "100%",
        ...(finalWidth && { maxWidth: finalWidth }),
        right: 0,
        top: 0,
        height: "100vh",
      }
    }
    default:
      break
  }
}

const getTransformStyle = (placement: Placement, value: string) => {
  let axis = ""
  if (placement === "left" || placement === "right") axis = "X"
  if (placement === "top" || placement === "bottom") axis = "Y"
  return `translate${axis}(${value})`
}

function createTransitionStyles(placement: Placement) {
  const offset = {
    bottom: "100%",
    top: "-100%",
    left: "-100%",
    right: "100%",
  }

  return {
    init: {
      opacity: 0,
      transform: getTransformStyle(placement, offset[placement]),
    },
    entered: { opacity: 1, transform: getTransformStyle(placement, "0%") },
    exiting: {
      opacity: 0,
      transform: getTransformStyle(placement, offset[placement]),
    },
  }
}

interface SlideProps extends TransitionProps {
  placement?: Placement
}

export function Slide(props: SlideProps) {
  const {
    children,
    in: inProp,
    placement = "left",
    timeout = 250,
    ...rest
  } = props

  const transitionStyles = createTransitionStyles(placement)

  type TransitionState = keyof typeof transitionStyles

  const baseStyle = createBaseStyle({
    placement,
    finalWidth: "400px",
    finalHeight: "400px",
  })

  const rootStyle: React.CSSProperties = {
    position: "fixed",
    willChange: "transform",
    transition: `all ${timeout}ms cubic-bezier(0, 0, 0.2, 1)`,
  }

  const computeStyle = (state: TransitionState) => ({
    ...rootStyle,
    ...baseStyle,
    ...transitionStyles.init,
    ...transitionStyles[state],
  })

  return (
    <Transition
      appear
      in={inProp}
      timeout={{ enter: 50, exit: timeout }}
      unmountOnExit
      {...rest}
    >
      {(state: TransitionState) => (
        <TransitionContext.Provider value={computeStyle(state)}>
          {typeof children === "function"
            ? children(computeStyle(state))
            : children}
        </TransitionContext.Provider>
      )}
    </Transition>
  )
}

export default Slide
