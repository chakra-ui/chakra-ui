import React from "react"
import { CSSTransition } from "react-transition-group"
import { chakra } from "@chakra-ui/system"

const context = React.createContext<{ isOpen: boolean; onClose: () => void }>(
  {} as any,
)

function Modal({ children, isOpen, onClose }) {
  return (
    <context.Provider value={{ isOpen, onClose }}>
      <CSSTransition
        timeout={{ enter: 300, exit: 200 }}
        in={isOpen}
        unmountOnExit
        classNames="overlay"
      >
        {children}
      </CSSTransition>
    </context.Provider>
  )
}

function ModalOverlay(props) {
  const { onClose } = React.useContext(context)
  return (
    <chakra.div
      __css={{
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        left: 0,
        top: 0,
        "&.overlay": {
          "&-enter": { opacity: 0 },
          "&-enter-active": {
            opacity: 1,
            transition: "opacity 300ms cubic-bezier(0,0,.2,1)",
          },
          "&-exit": {
            opacity: 1,
          },
          "&-exit-active": {
            opacity: 0,
            transition: "opacity 200ms cubic-bezier(.4,0,1,1)",
          },
        },
      }}
      onClick={onClose}
      {...props}
    />
  )
}

function ModalContent(props) {
  const { isOpen } = React.useContext(context)
  return (
    <CSSTransition
      timeout={{ enter: 300, exit: 200 }}
      in={isOpen}
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false)
      }}
      appear
      classNames="content"
    >
      <chakra.div
        __css={{
          background: "white",
          padding: "40px",
          minHeight: "150px",
          "&.content": {
            "&-enter, &-appear": { opacity: 0.01, transform: "scale(0.9)" },
            "&-enter-active, &-appear-active": {
              opacity: 1,
              transform: "scale(1)",
              transitionProperty: "opacity, transform",
              transitionDuration: "300ms",
              transitionTimingFunction: "cubic-bezier(0,0,.2,1)",
            },
            "&-exit": {
              opacity: 1,
              transform: "scale(1)",
            },
            "&-exit-active": {
              opacity: 0.01,
              transform: "scale(0.9)",
              transitionProperty: "opacity, transform",
              transitionDuration: "200ms",
              transitionTimingFunction: "cubic-bezier(.4,0,1,1)",
            },
          },
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
        {...props}
      />
    </CSSTransition>
  )
}

export function PlainTest() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay>
          <ModalContent>Welcome home</ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
