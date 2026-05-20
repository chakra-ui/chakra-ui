"use client"

import {
  Button,
  Field,
  FloatingPanel,
  IconButton,
  Input,
  Portal,
  Stack,
  createOverlay,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu"

interface FloatingPanelOverlayProps extends Omit<
  FloatingPanel.RootProps,
  "children"
> {
  title: string
  content?: React.ReactNode
}

const floatingPanel = createOverlay<FloatingPanelOverlayProps>((props) => {
  const { title, content, ...rest } = props
  return (
    <FloatingPanel.Root {...rest}>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>{title}</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized" asChild>
                  <IconButton variant="ghost" size="2xs" aria-label="Minimize">
                    <LuMinus />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="maximized" asChild>
                  <IconButton variant="ghost" size="2xs" aria-label="Maximize">
                    <LuSquare />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="default" asChild>
                  <IconButton variant="ghost" size="2xs" aria-label="Restore">
                    <LuMaximize2 />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.CloseTrigger asChild>
                  <IconButton variant="ghost" size="2xs" aria-label="Close">
                    <LuX />
                  </IconButton>
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>{content}</FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
})

const PanelForm = (props: { onClose: () => void }) => {
  const [name, setName] = useState("")

  return (
    <Stack
      gap="4"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        alert(`Hello ${name || "there"}!`)
        props.onClose()
        setName("")
      }}
    >
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </Field.Root>
      <Button type="submit" size="sm" alignSelf="flex-start">
        Submit
      </Button>
    </Stack>
  )
}

export const FloatingPanelWithOverlay = () => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          floatingPanel.open("panel", {
            title: "Contact",
            content: <PanelForm onClose={() => floatingPanel.close("panel")} />,
          })
        }}
      >
        Open Panel
      </Button>
      <floatingPanel.Viewport />
    </>
  )
}
