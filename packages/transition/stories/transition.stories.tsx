import * as React from "react"
import { ScaleFade, SlideFade, Fade, Slide } from "../src"

export default {
  title: "Transition",
}

const modalStyles: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "50%",
  maxWidth: "630px",
  minWidth: "320px",
  background: "red",
  minHeight: 300,
  height: "auto",
  backfaceVisibility: "hidden",
  transform: `translateX(-50%) translateY(-50%)`,
}

type DivProps = React.HTMLAttributes<HTMLDivElement>

function Modal(props: DivProps) {
  return (
    <div {...props} style={{ ...modalStyles, ...props.style }}>
      Animate me
    </div>
  )
}

export function ScaleFadeExample() {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <ScaleFade in={isOpen}>
        {(transitionProps) => (
          <Modal
            style={{
              ...transitionProps.style,
              transform: styles.transform
                ? `${modalStyles.transform} ${styles.transform}`
                : `${modalStyles.transform}`,
            }}
            ref={transitionProps.ref}
          />
        )}
      </ScaleFade>
    </>
  )
}

export function SlideFadeExample() {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <SlideFade in={isOpen}>
        {(transitionProps) => (
          <Modal
            style={{
              ...transitionProps.style,
              transform: styles.transform
                ? `${modalStyles.transform} ${styles.transform}`
                : `${modalStyles.transform}`,
            }}
            ref={transitionProps.ref}
          />
        )}
      </SlideFade>
    </>
  )
}

export function FadeExample() {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <Fade in={isOpen}>
        {(transitionProps) => <Modal {...transitionProps} />}
      </Fade>
    </>
  )
}

function Drawer(props: DivProps) {
  return (
    <div {...props} style={{ background: "red", ...props.style }}>
      Animate Me
    </div>
  )
}

export function SlideExample() {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <button onClick={() => setIsOpen((p) => !p)}>Click Me</button>
      <Slide placement="bottom" in={isOpen}>
        {(transitionProps) => <Drawer {...transitionProps} />}
      </Slide>
    </>
  )
}
