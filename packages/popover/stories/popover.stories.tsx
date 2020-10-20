import { Button, ButtonGroup } from "@chakra-ui/button"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  Popover,
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
      <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
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
          <PopoverFooter d="flex" justifyContent="flex-end">
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
