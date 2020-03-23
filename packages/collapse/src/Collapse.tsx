import { useDimensions, useBooleanState } from "@chakra-ui/hooks"
import { chakra, PropsOf } from "@chakra-ui/styled"
import {
  Transition,
  TransitionProps,
  TransitionStyles,
} from "@chakra-ui/transition"
import { mergeRefs } from "@chakra-ui/utils"
import * as React from "react"

export type CollapseProps = PropsOf<typeof chakra.div> & {
  isOpen?: boolean
  startingHeight?: number
  config?: TransitionProps["styles"]
  animateOpacity?: boolean
  transition?: string
}

export function Collapse(props: CollapseProps) {
  const {
    isOpen,
    children,
    config,
    startingHeight = 0,
    animateOpacity = true,
    transition = "height 200ms ease, opacity 200ms ease, transform 200ms ease",
    ...rest
  } = props

  const [ariaHidden, setAriaHidden] = useBooleanState(true)

  type ChildElement = React.ReactElement<{
    ref: React.Ref<any>
  }>

  let child = children

  if (typeof children === "string") {
    console.warn(
      `Warning: You're using a string directly inside <Collapse>. We recommend that you add an <div> tag as child of <Collapse>`,
    )
    child = <div>{children}</div> // fallback
  }

  const finalChild = React.Children.only(child) as ChildElement

  const ref = React.useRef<HTMLDivElement>(null)

  const boxModel = useDimensions(ref, true)
  const height = boxModel?.borderBox.height ?? 0

  const styles: TransitionStyles = {
    init: {
      height: startingHeight,
      opacity: startingHeight ? 1 : 0,
    },
    entered: {
      height,
      opacity: 1,
      transform: "translateY(0)",
    },
    exiting: {
      height: startingHeight,
      opacity: startingHeight ? 1 : 0,
      transform: "translateY(-0.5rem)",
    },
  }

  return (
    <Transition
      in={isOpen}
      styles={config || styles}
      onEntered={setAriaHidden.off}
      onExited={setAriaHidden.on}
      timeout={{ enter: 50, exit: 200 }}
      transition={transition}
      unmountOnExit={false}
    >
      {styles => (
        <chakra.div
          data-chakra-collapse=""
          {...rest}
          aria-hidden={ariaHidden ? true : undefined}
          style={{
            ...styles,
            overflow: "hidden",
            opacity: animateOpacity ? styles.opacity : 1,
            ...rest.style,
          }}
        >
          {React.cloneElement(finalChild, {
            ref: mergeRefs(ref, finalChild.props.ref),
          })}
        </chakra.div>
      )}
    </Transition>
  )
}
