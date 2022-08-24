import { Button, ButtonGroup } from "@chakra-ui/button"
import { Radio, RadioGroup } from "@chakra-ui/radio"
import { Input } from "@chakra-ui/input"
import { useBoolean, useInterval } from "@chakra-ui/hooks"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  usePopover,
} from "../src"

export function PopoverExample() {
  const { getTriggerProps, getPopoverProps, onClose } = usePopover()

  return (
    <>
      <button type="button" {...getTriggerProps()}>
        Open
      </button>
      <div
        {...getPopoverProps({
          style: {
            background: "tomato",
            color: "white",
            padding: 30,
          },
        })}
      >
        This is the content <br />
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  )
}

export const simple = () => (
  <Popover placement="right-start">
    <PopoverTrigger>
      <chakra.button mt="180px">Trigger</chakra.button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Confirmation!</PopoverHeader>
      <PopoverBody>
        <p>Are you sure you want to have that milkshake?</p>
        <br />
        <button>Yes</button>
        <button>No</button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
)

export const basic = () => (
  <>
    <Popover placement="top">
      <PopoverTrigger>
        <chakra.button>Welcome home</chakra.button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>

    <Popover placement="bottom">
      <PopoverTrigger>
        <chakra.button>Welcome home</chakra.button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>

    <chakra.input />
  </>
)

export const Arrow = () => (
  <>
    <Popover placement="top" arrowShadowColor="red" arrowSize={40}>
      <PopoverTrigger>
        <chakra.button>Welcome home</chakra.button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </>
)

export function ControlledUsage() {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  return (
    <>
      <Button mr={5} onClick={open}>
        Trigger
      </Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme="pink">Popover Target</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline">Cancel</Button>
              <Button colorScheme="red">Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
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
    <Popover isLazy>
      <PopoverTrigger>
        <Button colorScheme="pink">Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          Are you sure you want to continue with your action?
          <p>
            Timer: <Interval />
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export function WithLazyPopoverMounted() {
  return (
    <Popover isLazy lazyBehavior="keepMounted">
      <PopoverTrigger>
        <Button colorScheme="pink">Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          Are you sure you want to continue with your action?
          <p>
            Timer: <Interval />
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export function WithPopoverAnchor() {
  const [isEditing, setIsEditing] = useBoolean()
  const [color, setColor] = React.useState("red")

  return (
    <Popover
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
      closeOnBlur={false}
      isLazy
      lazyBehavior="keepMounted"
    >
      <PopoverAnchor>
        <Input
          color={color}
          w="auto"
          display="inline-flex"
          isDisabled={!isEditing}
          defaultValue="Popover Anchor"
        />
      </PopoverAnchor>

      <PopoverTrigger>
        <Button colorScheme="pink">{isEditing ? "Save" : "Edit"}</Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverBody>
          Colors:
          <RadioGroup value={color} onChange={(newColor) => setColor(newColor)}>
            <Radio value="red">red</Radio>
            <Radio value="blue">blue</Radio>
            <Radio value="green">green</Radio>
            <Radio value="purple">purple</Radio>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export const WithMatchWidth = () => (
  <Popover matchWidth>
    <PopoverTrigger>
      <Button w="400px">Long Content</Button>
    </PopoverTrigger>
    <PopoverContent w="full">
      <PopoverBody>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </PopoverBody>
    </PopoverContent>
  </Popover>
)
