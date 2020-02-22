import { useDimensions } from "@chakra-ui/hooks"
import { mergeRefs } from "@chakra-ui/utils"
import * as React from "react"
import { animated, SpringConfig, useSpring } from "react-spring"

export type CollapseProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean
  startingHeight?: number
  children?: React.ReactNode
  config?: SpringConfig
  animateOpacity?: boolean
}

export function Collapse(props: CollapseProps) {
  const {
    isOpen,
    children,
    config,
    startingHeight = 0,
    animateOpacity = true,
    ...htmlProps
  } = props

  const [ariaHidden, setAriaHidden] = React.useState(true)

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

  const spring = useSpring({
    height: isOpen ? height : 0,
    opacity: isOpen ? 1 : 0,
    onRest: props => {
      setAriaHidden(props.height === startingHeight)
    },
    config: {
      friction: 35,
      tension: 320,
      ...config,
    },
  })

  return (
    <animated.div
      {...htmlProps}
      aria-hidden={ariaHidden ? true : undefined}
      style={{
        height: spring.height,
        overflow: "hidden",
        ...(animateOpacity && { opacity: spring.opacity }),
      }}
    >
      {React.cloneElement(finalChild, {
        ref: mergeRefs(ref, finalChild.props.ref),
      })}
    </animated.div>
  )
}

export default Collapse
