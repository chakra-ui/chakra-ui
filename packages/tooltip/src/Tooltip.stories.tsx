import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Tooltip, useTooltip } from "."
import { Transition } from "@chakra-ui/transition"
import { Portal } from "@chakra-ui/portal"
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal"

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
    getTooltipProps,
    getArrowProps,
    isOpen,
  } = useTooltip()

  const trigger = getTriggerProps()
  const tooltip = getTooltipProps()
  const arrow = getArrowProps({ style: { background: "inherit" } })

  return (
    <>
      <button {...trigger}>Hover me</button>
      <div
        hidden={!isOpen}
        {...tooltip}
        style={{
          ...tooltip.style,
          background: "tomato",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "0.5em 1em",
        }}
      >
        {children}
        <div {...arrow} />
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

const TransitionTooltip = ({ children }: any) => {
  const {
    getTriggerProps,
    getTooltipProps,
    getArrowProps,
    isOpen,
  } = useTooltip()

  const trigger = getTriggerProps()
  const tooltip = getTooltipProps()
  const arrow = getArrowProps({ style: { background: "inherit" } })

  return (
    <>
      <button {...trigger}>Hover me</button>
      <Transition
        in={isOpen}
        timeout={100}
        styles={{
          init: {
            opacity: 0,
            transform: `scale(0.9)`,
          },
          entered: {
            opacity: 1,
            transform: `scale(1)`,
          },
          exiting: {
            opacity: 0,
            transform: `scale(0.9)`,
          },
        }}
      >
        {styles => (
          <Portal>
            <div
              {...tooltip}
              style={{
                ...tooltip.style,
                background: "tomato",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.5em 1em",
                ...styles,
              }}
            >
              {children}
              <div {...arrow} />
            </div>
          </Portal>
        )}
      </Transition>
    </>
  )
}

export const WithTransition = () => (
  <>
    <TransitionTooltip>Fade! This is tooltip </TransitionTooltip>
    <span style={{ margin: 0 }} />
    <TransitionTooltip>Fade! This is tooltip </TransitionTooltip>
  </>
)

export const withButton = () => (
  <Tooltip label="This is a chakra tooltip" placement="top">
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
        <ModalOverlay>
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
        </ModalOverlay>
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
  <Tooltip label="Hello world" isOpen={true}>
    <button style={{ fontSize: 25, pointerEvents: "all" }} disabled>
      Can't Touch This
    </button>
  </Tooltip>
)

export const withDefaultIsOpenProp = () => (
  <Tooltip label="Hello world" defaultIsOpen={true}>
    <button style={{ fontSize: 25, pointerEvents: "all" }} disabled>
      Can't Touch This
    </button>
  </Tooltip>
)
