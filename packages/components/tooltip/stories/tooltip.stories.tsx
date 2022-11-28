import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal"
import { Portal } from "@chakra-ui/portal"
import { Button } from "@chakra-ui/button"
import { chakra } from "@chakra-ui/system"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { Tooltip, useTooltip } from "../src"

export default {
  title: "Components / Overlay / Tooltip",
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
    getTooltipPositionerProps,
    getTooltipProps,
    isOpen,
  } = useTooltip({
    openDelay: 100,
    arrowSize: 8,
    placement: "bottom",
  })

  return (
    <>
      <Button {...getTriggerProps()}>Hover me</Button>
      <div {...getTooltipPositionerProps()}>
        <div
          {...getTooltipProps({
            style: {
              background: "tomato",
              color: "white",
              borderRadius: "4px",
              padding: "0.5em 1em",
              visibility: isOpen ? "visible" : "hidden",
              ["--popper-arrow-bg" as string]: "tomato",
            },
          })}
        >
          {children}
          <div data-popper-arrow>
            <div data-popper-arrow-inner />
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
    getTooltipPositionerProps,
    getTooltipProps,
    isOpen,
  } = useTooltip({
    openDelay: 100,
  })

  return (
    <>
      <Button {...getTriggerProps()}>Hover me</Button>
      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div {...getTooltipPositionerProps()}>
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
                    transformOrigin: "var(--popper-transform-origin)",
                    background: "tomato",
                    ["--popper-arrow-bg" as string]: "tomato",
                    color: "white",
                    borderRadius: "4px",
                    padding: "0.5em 1em",
                  }}
                >
                  Fade! This is tooltip
                  <div data-popper-arrow>
                    <div data-popper-arrow-inner />
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

export const WithButton = () => (
  <Tooltip label="This is a chakra tooltip" placement="bottom" hasArrow>
    <Button>Hover me</Button>
  </Tooltip>
)

export const WithString = () => (
  <Tooltip label="This is a chakra tooltip">Hover me</Tooltip>
)

export const WithAriaLabel = () => (
  <Tooltip
    hasArrow
    bg="tomato"
    color="white"
    label="Notifications"
    aria-label="3 Notifications"
  >
    <Button style={{ fontSize: 25 }}>
      <span role="img" aria-label="notification">
        🔔
      </span>
      <span>3</span>
    </Button>
  </Tooltip>
)

export const WithinFixedContainer = () => (
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
      <Button onClick={() => setShowDialog(true)}>Show Dialog</Button>
      <Modal isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <ModalOverlay />
        <ModalContent height="300px">
          <div>
            <Button onClick={() => setShowDialog(false)}>Close Dialog</Button>
            <Tooltip label="Notifications">
              <Button>
                <span aria-hidden>🔔</span>
              </Button>
            </Tooltip>
            <Tooltip label="Settings">
              <Button>
                <span aria-hidden>⚙️</span>
              </Button>
            </Tooltip>
            <Tooltip label="Your files are safe with us">
              <Button>
                <span aria-hidden>💾</span> Save
              </Button>
            </Tooltip>

            <div style={{ float: "right" }}>
              <Tooltip label="Notifications" aria-label="3 Notifications">
                <Button>
                  <span role="img" aria-label="Bell">
                    🔔
                  </span>
                  <span>3</span>
                </Button>
              </Tooltip>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}

export const WithDisabledButton = () => (
  <Tooltip label="Oh oh oh, oh oh">
    <Button isDisabled>Can't Touch This</Button>
  </Tooltip>
)

export const WithWrappedDisabledButton = () => (
  <Tooltip label="Hello world" shouldWrapChildren>
    <Button isDisabled>Hover me</Button>
  </Tooltip>
)

export const WithIsOpenProp = () => (
  <Tooltip label="Hello world" isOpen hasArrow>
    <Button disabled>Can't Touch This</Button>
  </Tooltip>
)

export const WithDefaultIsOpenProp = () => (
  <Tooltip label="Hello world" defaultIsOpen>
    <Button>Can't Touch This</Button>
  </Tooltip>
)

export const WithAutoPlacement = () => (
  <Tooltip label="Hello world" placement="auto" hasArrow>
    <Button>Can't Touch This</Button>
  </Tooltip>
)

export const WithScroll = () => (
  <chakra.div border="solid 1px red" h="200vh" pt="48">
    <Tooltip label="Hello world" placement="auto" hasArrow closeOnScroll>
      <Button>Can't Touch This</Button>
    </Tooltip>
  </chakra.div>
)

export const WithDynamicDisabled = () => {
  const [isDisabled, setIsDisabled] = React.useState(false)
  const handleDisabled = () => setIsDisabled(true)
  const handleEnabled = () => setIsDisabled(false)
  return (
    <Tooltip
      label="Disabled after being triggered"
      placement="bottom"
      openDelay={500}
      isDisabled={isDisabled}
      hasArrow
    >
      <chakra.span
        draggable
        onDragStart={handleDisabled}
        onDragEnd={handleEnabled}
        cursor="grab"
      >
        Drag me, and you won't see
      </chakra.span>
    </Tooltip>
  )
}
