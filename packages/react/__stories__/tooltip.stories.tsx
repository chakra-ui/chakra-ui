import * as React from "react"
import { Button } from "../src/components/button"
import { Dialog } from "../src/components/dialog"
import { Tooltip } from "../src/components/tooltip"
import { chakra } from "../src/styled-system"

export default {
  title: "Overlay / Tooltip",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" mx="auto" mt="200px">
        {story()}
      </chakra.div>
    ),
  ],
}

/* -----------------------------------------------------------------------------
 * Setup
 * -----------------------------------------------------------------------------*/

type DemoTooltipProps = Tooltip.RootProps & {
  label?: string
  hasArrow?: boolean
}

const DemoTooltip = (props: DemoTooltipProps) => {
  const { label, children, hasArrow, ...localProps } = props
  const [rootProps, contentProps] = Tooltip.splitProps(localProps)

  return (
    <Tooltip.Root placement="bottom" {...rootProps}>
      <Tooltip.Trigger asChild>
        {React.isValidElement(children) ? children : <span>{children}</span>}
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content {...contentProps}>
          {hasArrow && <Tooltip.Arrow />}
          {label}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

/* -----------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------*/

export const Basic = () => (
  <Tooltip.Root placement="bottom">
    <Tooltip.Trigger asChild>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>
        <Tooltip.Arrow />
        This is a chakra tooltip
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)

export const WithAriaLabel = () => (
  <Tooltip.Root aria-label="3 Notifications">
    <Tooltip.Trigger asChild>
      <Button style={{ fontSize: 25 }}>
        <span role="img" aria-label="notification">
          🔔
        </span>
        <span>3</span>
      </Button>
    </Tooltip.Trigger>

    <Tooltip.Positioner>
      <Tooltip.Content bg="tomato" color="white">
        <Tooltip.Arrow />
        Notifications
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
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
    <DemoTooltip label="Hello">Hi</DemoTooltip>
  </div>
)

export const WithDialog = () => {
  const [showDialog, setShowDialog] = React.useState(false)
  return (
    <div>
      <Button onClick={() => setShowDialog(true)}>Show Dialog</Button>
      <Dialog.Root isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content height="300px">
            <div>
              <Button onClick={() => setShowDialog(false)}>Close Dialog</Button>
              <DemoTooltip label="Notifications">
                <Button>
                  <span aria-hidden>🔔</span>
                </Button>
              </DemoTooltip>
              <DemoTooltip label="Settings">
                <Button>
                  <span aria-hidden>⚙️</span>
                </Button>
              </DemoTooltip>
              <DemoTooltip label="Your files are safe with us">
                <Button>
                  <span aria-hidden>💾</span> Save
                </Button>
              </DemoTooltip>

              <div style={{ float: "right" }}>
                <DemoTooltip label="Notifications" aria-label="3 Notifications">
                  <Button>
                    <span role="img" aria-label="Bell">
                      🔔
                    </span>
                    <span>3</span>
                  </Button>
                </DemoTooltip>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  )
}

export const WithDisabledButton = () => (
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button isDisabled>Can't Touch This</Button>
    </Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Oh oh oh, oh oh</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)

export const WithIsOpenProp = () => (
  <DemoTooltip label="Hello world" isOpen hasArrow>
    <Button disabled>Can't Touch This</Button>
  </DemoTooltip>
)

export const WithDefaultIsOpenProp = () => (
  <DemoTooltip label="Hello world" defaultIsOpen>
    <Button>Can't Touch This</Button>
  </DemoTooltip>
)

export const WithAutoPlacement = () => (
  <DemoTooltip label="Hello world" placement="auto" hasArrow>
    <Button>Can't Touch This</Button>
  </DemoTooltip>
)

export const WithScroll = () => (
  <chakra.div border="solid 1px red" h="200vh" pt="48">
    <DemoTooltip label="Hello world" placement="auto" hasArrow closeOnScroll>
      <Button mt="300px">Can't Touch This</Button>
    </DemoTooltip>
  </chakra.div>
)

export const WithScrollWithin = () => (
  <chakra.div border="solid 1px red" pt="48" height="400px" overflow="auto">
    <DemoTooltip label="Hello world" placement="auto" hasArrow closeOnScroll>
      <Button mt="180px" mb="80px">
        Can't Touch This
      </Button>
    </DemoTooltip>
  </chakra.div>
)

export const WithDynamicDisabled = () => {
  const [isDisabled, setIsDisabled] = React.useState(false)
  const handleDisabled = () => setIsDisabled(true)
  const handleEnabled = () => setIsDisabled(false)
  return (
    <DemoTooltip
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
    </DemoTooltip>
  )
}
