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
} from "."
import { chakra } from "@chakra-ui/system"

export default {
  title: "Popover",
  decorators: [
    (story: Function) => (
      <chakra.div mx="auto" maxW="400px" mt="200px">
        {story()}
      </chakra.div>
    ),
  ],
}

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

const Button = chakra("button", {
  themeKey: "Button",
  baseStyle: {
    outline: 0,
  },
})

export const simple = () => (
  <Popover closeOnBlur={false}>
    <PopoverTrigger>
      <Button mt="180px">Trigger</Button>
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
    <Popover usePortal placement="top">
      <PopoverTrigger>
        <button>Welcome home</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>

    <Popover placement="bottom">
      <PopoverTrigger>
        <button>Welcome home</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Submit now</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PopoverBody>
      </PopoverContent>
    </Popover>

    <input />
  </>
)
