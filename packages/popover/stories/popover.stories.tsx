import * as React from "react"
import {
  usePopover,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverTransition,
} from "../src"
import { chakra } from "@chakra-ui/system"

export function PopoverExample() {
  const { getTriggerProps, getPopoverProps, onClose } = usePopover()

  return (
    <>
      <button {...getTriggerProps()}>Open</button>
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
        <button onClick={onClose}>Close</button>
      </div>
    </>
  )
}

export const simple = () => (
  <Popover placement="right-start">
    <PopoverTrigger>
      <chakra.button mt="180px">Trigger</chakra.button>
    </PopoverTrigger>
    <PopoverTransition>
      {(sx) => (
        <PopoverContent sx={sx}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      )}
    </PopoverTransition>
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
