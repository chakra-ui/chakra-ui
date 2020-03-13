import * as React from "react"
import useTooltip from "./Tooltip.hook"
import { createChakra } from "@chakra-ui/system"
import { Portal } from "@chakra-ui/portal"

export default {
  title: "Tooltip",
}

const Tooltip = ({ children }: any) => {
  const { trigger, isOpen, tooltip } = useTooltip()
  return (
    <>
      <button {...trigger}>Hover me</button>
      <div
        hidden={!isOpen}
        {...tooltip}
        style={{
          ...tooltip.style,
          background: "hsla(0, 0%, 0%, 0.75)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "0.5em 1em",
        }}
      >
        {children}
      </div>
    </>
  )
}

export const Basic = () => <Tooltip>This is me</Tooltip>

export const MultipleTooltips = () => (
  <>
    <Tooltip>This is tip 1</Tooltip>
    <Tooltip>This is tip 2</Tooltip>
  </>
)

const StyledTooltip = createChakra("div", { themeKey: "Tooltip" })

const ChakraTooltip = ({ children }: any) => {
  const { trigger, isOpen, tooltip } = useTooltip({ placement: "right" })
  return (
    <>
      <button {...trigger}>Hover me</button>
      {isOpen && (
        <Portal>
          <StyledTooltip {...tooltip}>{children}</StyledTooltip>
        </Portal>
      )}
    </>
  )
}

export const WithChakra = () => (
  <ChakraTooltip>Chakra powered tooltip</ChakraTooltip>
)
