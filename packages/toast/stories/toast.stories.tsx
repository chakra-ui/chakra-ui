import * as React from "react"
import useToast from "../src/use-toast"
import { Button, ButtonGroup } from "@chakra-ui/button"
import { chakra, useColorMode } from "@chakra-ui/system"
import { Alert } from "@chakra-ui/alert"

export default {
  title: "Toast",
  decorators: [
    (Story: Function) => (
      <React.Fragment>
        <Story />
      </React.Fragment>
    ),
  ],
}

export function ToastExample() {
  const toast = useToast()
  const id = "login-error-toast"
  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          if (toast.isActive(id)) return
          toast({
            id,
            title: "Error Connecting...",
            description: "You do not have permissions to perform this action.",
            status: "error",
            duration: null,
            isClosable: true,
            onCloseComplete: () => {
              console.log("hello")
            },
          })
        }}
      >
        Show Toast
      </Button>
      <Button onClick={() => toast.closeAll()}>Close all</Button>
      <Button
        onClick={() =>
          toast.update(id, {
            title: "Hooray 🥳🥳🥳!!!",
            description: "You now have permissions to perform this action.",
            status: "success",
            duration: 3000,
          })
        }
      >
        Update
      </Button>
      <Button onClick={() => toast.close(id)}>Close One</Button>
    </ButtonGroup>
  )
}

export function CustomRender() {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          position: "top-right",
          render: () => (
            <chakra.div m={2} color="white" p={3} bg="blue.500">
              Hello World
            </chakra.div>
          ),
        })
      }
    >
      Show Toast
    </Button>
  )
}

export function SuccessToast() {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Success Toast
    </Button>
  )
}

export function WarningToast() {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: "Warning.",
          description: "This is a warning.",
          status: "warning",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Warning Toast
    </Button>
  )
}

export function ErrorToast() {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: "An error occurred.",
          description: "Unable to create user account.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Error Toast
    </Button>
  )
}

export const AllSides = () => {
  const toast = useToast()

  const positions = [
    "top-left",
    "top",
    "top-right",
    "bottom-left",
    "bottom",
    "bottom-right",
  ] as const

  return (
    <>
      <Button
        onClick={() => {
          positions.forEach((p) => {
            toast({ position: p, title: p })
          })
        }}
      >
        Trigger
      </Button>

      <hr />
      <Button onClick={() => toast.closeAll()}>close all</Button>
    </>
  )
}

export const ColorModeBug = () => {
  const toast = useToast()
  const { toggleColorMode } = useColorMode()
  return (
    <>
      <Button
        onClick={() =>
          toast({
            render() {
              return <Alert>test</Alert>
            },
          })
        }
      >
        Click me!
      </Button>
      <Button onClick={() => toggleColorMode()}>Toggle Mode</Button>
    </>
  )
}

export const CloseAllTopLeftToasts = () => {
  const toast = useToast()

  const positions = [
    "top-left",
    "top",
    "top-right",
    "bottom-left",
    "bottom",
    "bottom-right",
  ] as const

  return (
    <>
      <Button
        onClick={() => {
          positions.forEach((position) => {
            toast({ position, title: p })
          })
        }}
      >
        Trigger
      </Button>

      <hr />
      <Button onClick={() => toast.closeAll({ positions: ["top-left"] })}>
        close all top-left
      </Button>
    </>
  )
}
