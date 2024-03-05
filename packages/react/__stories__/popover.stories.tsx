import { useBoolean, useInterval } from "@chakra-ui/hooks"
import * as React from "react"
import {
  Button,
  HStack,
  Input,
  Popover,
  RadioGroup,
  chakra,
  usePopover,
} from "../src"

export default {
  title: "Overlay / Popover - Click",
  decorators: [
    (story: Function) => (
      <chakra.div mx="auto" maxW="400px" mt="200px">
        {story()}
      </chakra.div>
    ),
  ],
}

export function WithHook() {
  const api = usePopover()

  return (
    <>
      <button type="button" {...api.getTriggerProps()}>
        Open
      </button>
      <div {...api.getPositionerProps()}>
        <div
          {...api.getContentProps({
            style: {
              background: "tomato",
              color: "white",
              padding: 30,
            },
          })}
        >
          This is the content <br />
          <button type="button" onClick={api.onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export const simple = () => (
  <Popover.Root placement="right-start">
    <Popover.Trigger asChild>
      <chakra.button mt="180px">Trigger</chakra.button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.CloseTrigger />
        <Popover.Header>Confirmation!</Popover.Header>
        <Popover.Body>
          <p>Are you sure you want to have that milkshake?</p>
          <br />
          <button>Yes</button>
          <button>No</button>
        </Popover.Body>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

export const basic = () => (
  <>
    <Popover.Root placement="top">
      <Popover.Trigger asChild>
        <chakra.button>Welcome home</chakra.button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Header>Submit now</Popover.Header>
        <Popover.Body>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root placement="bottom">
      <Popover.Trigger asChild>
        <chakra.button>Welcome home</chakra.button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.CloseTrigger />
        <Popover.Header>Submit now</Popover.Header>
        <Popover.Body>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>

    <chakra.input />
  </>
)

export const Arrow = () => (
  <>
    <Popover.Root placement="top" arrowShadowColor="red" arrowSize={40}>
      <Popover.Trigger asChild>
        <chakra.button>Welcome home</chakra.button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Header>Submit now</Popover.Header>
        <Popover.Body>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  </>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return (
    <>
      <Button mr={5} onClick={open}>
        Trigger
      </Button>

      <Popover.Root
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="right"
        closeOnBlur={false}
      >
        <Popover.Trigger asChild>
          <Button colorScheme="pink">Popover Target</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header fontWeight="semibold">Confirmation</Popover.Header>
            <Popover.Arrow />
            <Popover.CloseTrigger />
            <Popover.Body>
              Are you sure you want to continue with your action?
            </Popover.Body>
            <Popover.Footer display="flex" justifyContent="flex-end">
              <HStack>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
                <Button size="sm" colorScheme="red">
                  Apply
                </Button>
              </HStack>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </>
  )
}

const Interval = () => {
  const [value, setValue] = React.useState(0)
  useInterval(() => setValue((v) => v + 1), 1000)
  return (
    <span style={{ fontWeight: "bold", color: "tomato", padding: 4 }}>
      {value}
    </span>
  )
}

export function WithLazyPopover() {
  return (
    <Popover.Root isLazy>
      <Popover.Trigger asChild>
        <Button colorScheme="pink">Popover Target</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body>
            Are you sure you want to continue with your action?
            <p>
              Timer: <Interval />
            </p>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export function WithLazyPopoverMounted() {
  return (
    <Popover.Root isLazy lazyBehavior="keepMounted">
      <Popover.Trigger asChild>
        <Button colorScheme="pink">Popover Target</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body>
            Are you sure you want to continue with your action?
            <p>
              Timer: <Interval />
            </p>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export function WithPopoverAnchor() {
  const [isEditing, setIsEditing] = useBoolean()
  const [color, setColor] = React.useState("red")

  return (
    <Popover.Root
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
      closeOnBlur={false}
      isLazy
      lazyBehavior="keepMounted"
    >
      <Popover.Anchor asChild>
        <Input
          color={color}
          w="auto"
          display="inline-flex"
          isDisabled={!isEditing}
          defaultValue="Popover Anchor"
        />
      </Popover.Anchor>

      <Popover.Trigger asChild>
        <Button colorScheme="pink">{isEditing ? "Save" : "Edit"}</Button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body>
            Colors:
            <RadioGroup.Root
              value={color}
              onChange={(newColor) => setColor(newColor)}
            >
              <RadioGroup.Item value="red">red</RadioGroup.Item>
              <RadioGroup.Item value="blue">blue</RadioGroup.Item>
              <RadioGroup.Item value="green">green</RadioGroup.Item>
              <RadioGroup.Item value="purple">purple</RadioGroup.Item>
            </RadioGroup.Root>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export const WithMatchWidth = () => (
  <Popover.Root matchWidth>
    <Popover.Trigger asChild>
      <Button w="400px">Long Content</Button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content w="full">
        <Popover.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Popover.Body>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
