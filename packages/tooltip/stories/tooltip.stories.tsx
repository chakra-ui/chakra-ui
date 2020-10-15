import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal"
import { Portal } from "@chakra-ui/portal"
import { chakra } from "@chakra-ui/system"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { Tooltip, useTooltip } from "../src"

export default {
  title: "Tooltip",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" mx="auto" mt="200px">
        {story()}
      </chakra.div>
    ),
  ],
}

const HookTooltip = ({ children }: any) => {
  const {
    getTriggerProps,
    getTooltipWrapperProps,
    getTooltipProps,
    getArrowProps,
    getArrowWrapperProps,
    isOpen,
  } = useTooltip({
    openDelay: 100,
    arrowSize: 8,
    placement: "bottom",
  })

  return (
    <>
      <button {...getTriggerProps()}>Hover me</button>
      <div {...getTooltipWrapperProps()}>
        <div
          {...getTooltipProps({
            style: {
              background: "tomato",
              color: "white",
              borderRadius: "4px",
              padding: "0.5em 1em",
              visibility: isOpen ? "visible" : "hidden",
            },
          })}
        >
          {children}
          <div {...getArrowWrapperProps()}>
            <div {...getArrowProps({ style: { background: "tomato" } })} />
          </div>
        </div>
      </div>
    </>
  )
}

export const Basic = () => <HookTooltip>This is me</HookTooltip>

export const MultipleTooltips = () => (
  <>
    <HookTooltip>This is tip 1</HookTooltip>
    <HookTooltip>This is tip 2</HookTooltip>
  </>
)

export const WithTransition = () => {
  const {
    getTriggerProps,
    getTooltipWrapperProps,
    getTooltipProps,
    getArrowProps,
    getArrowWrapperProps,
    isOpen,
    transformOrigin,
  } = useTooltip({
    openDelay: 100,
  })

  return (
    <>
      <button {...getTriggerProps()}>Hover me</button>
      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div {...getTooltipWrapperProps()}>
              <motion.div
                initial="exit"
                animate="enter"
                exit="exit"
                {...(getTooltipProps() as any)}
              >
                <motion.div
                  transition={{
                    duration: 0.12,
                    ease: [0.4, 0, 0.2, 1],
                    bounce: 0.5,
                  }}
                  variants={{
                    exit: { scale: 0.9, opacity: 0 },
                    enter: { scale: 1, opacity: 1 },
                  }}
                  style={{
                    transformOrigin,
                    background: "tomato",
                    color: "white",
                    borderRadius: "4px",
                    padding: "0.5em 1em",
                  }}
                >
                  Fade! This is tooltip
                  <div {...getArrowWrapperProps()}>
                    <div
                      {...getArrowProps({ style: { background: "tomato" } })}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}

export const withButton = () => (
  <Tooltip label="This is a chakra tooltip" placement="bottom" hasArrow>
    <button>Hover me</button>
  </Tooltip>
)

export const withString = () => (
  <Tooltip label="This is a chakra tooltip">Hover me</Tooltip>
)

export const withAriaLabel = () => (
  <Tooltip
    hasArrow
    bg="tomato"
    color="white"
    label="Notifications"
    aria-label="3 Notifications"
  >
    <button style={{ fontSize: 25 }}>
      <span role="img" aria-label="notification">
        🔔
      </span>
      <span>3</span>
    </button>
  </Tooltip>
)

export const issue607 = () => (
  <div
    style={{
      position: "fixed",
      background: "red",
      height: "100px",
      width: "200px",
    }}
  >
    <Tooltip label="Hello" aria-label="hello">
      Hi
    </Tooltip>
  </div>
)

export const WithModal = () => {
  const [showDialog, setShowDialog] = React.useState(false)
  return (
    <div>
      <button onClick={() => setShowDialog(true)}>Show Dialog</button>
      <Modal isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <ModalOverlay />
        <ModalContent height="300px">
          <div>
            <button onClick={() => setShowDialog(false)}>Close Dialog</button>
            <Tooltip label="Notifications">
              <button style={{ fontSize: 25 }}>
                <span aria-hidden>🔔</span>
              </button>
            </Tooltip>
            <Tooltip label="Settings">
              <button style={{ fontSize: 25 }}>
                <span aria-hidden>⚙️</span>
              </button>
            </Tooltip>
            <Tooltip label="Your files are safe with us">
              <button style={{ fontSize: 25 }}>
                <span aria-hidden>💾</span> Save
              </button>
            </Tooltip>

            <div style={{ float: "right" }}>
              <Tooltip label="Notifications" aria-label="3 Notifications">
                <button style={{ fontSize: 25 }}>
                  <span>🔔</span>
                  <span>3</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}

export const withDisabledButton = () => (
  <Tooltip label="Oh oh oh, oh oh">
    <button style={{ fontSize: 25, pointerEvents: "all" }} disabled>
      Can't Touch This
    </button>
  </Tooltip>
)

export const withIsOpenProp = () => (
  <Tooltip label="Hello world" isOpen={true} hasArrow>
    <button style={{ fontSize: 25, pointerEvents: "all" }} disabled>
      Can't Touch This
    </button>
  </Tooltip>
)

export const withDefaultIsOpenProp = () => (
  <Tooltip label="Hello world" defaultIsOpen={true}>
    <button style={{ fontSize: 25, pointerEvents: "all" }}>
      Can't Touch This
    </button>
  </Tooltip>
)
