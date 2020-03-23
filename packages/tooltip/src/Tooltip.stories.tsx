import { chakra } from "@chakra-ui/styled"
import * as React from "react"
import { Tooltip, useTooltip } from "."
import { Transition } from "@chakra-ui/transition"
import { Portal } from "@chakra-ui/portal"

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
  <Tooltip label="This is a chakra tooltip">
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
      <span>🔔</span>
      <span>3</span>
    </button>
  </Tooltip>
)
