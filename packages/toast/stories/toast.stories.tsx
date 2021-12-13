import * as React from "react"
import { theme as base } from "@chakra-ui/theme"
import { Button, ButtonGroup } from "@chakra-ui/button"
import { chakra, useColorMode } from "@chakra-ui/system"
import { Alert } from "@chakra-ui/alert"
import { Text } from "@chakra-ui/layout"
import { createStandaloneToast, useToast } from "../src"

export default {
  title: "Components / Feedback / Toast",
  decorators: [
    (Story: Function) => (
      <>
        <Story />
      </>
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
            position: "top-start",
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
    <>
      <Button
        onClick={() =>
          toast({
            duration: null,
            position: "top-right",
            render: () => (
              <chakra.div rounded="md" color="white" p={3} bg="blue.500">
                Hello World
              </chakra.div>
            ),
          })
        }
      >
        Show Toast
      </Button>
      <Button
        colorScheme="pink"
        onClick={() =>
          toast({
            position: "bottom-right",
            title: "Testing",
            description: "This toast is working well",
          })
        }
      >
        Show Toastify
      </Button>
    </>
  )
}

export function SuccessToast() {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          position: "bottom",
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            console.log("close")
          },
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

      <Button ml="40px" onClick={() => toast.closeAll()}>
        Close all
      </Button>
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
            toast({ position, title: position })
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

export const UseToastWithDefaults = () => {
  const toast = useToast({
    position: "top-right",
    title: "asdf",
  })

  return <Button onClick={() => toast()}>toast</Button>
}

export const UseToastWithCustomContainerStyle = () => {
  const toast = useToast({
    position: "top",
    title: "Container style is updated",
    containerStyle: {
      width: "800px",
      maxWidth: "100%",
      border: "20px solid red",
    },
  })

  return <Button onClick={() => toast()}>toast</Button>
}

export const useToastCustomRenderUpdate = () => {
  const [id, setId] = React.useState(null)
  const toast = useToast()

  React.useEffect(() => {
    if (id) {
      const timeout = setTimeout(() => {
        toast.update(id, {
          render: () => (
            <ButtonGroup>
              <Button variant="outline">outline button after update</Button>
              <Button variant="ghost">ghost button after update</Button>
              <Button variant="link">link button after update</Button>
            </ButtonGroup>
          ),
        })

        setId(null)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [id])

  return (
    <Button
      onClick={() => {
        const id = toast({
          render: () => <Button variant="solid">solid button initially</Button>,
        })

        setId(id)
      }}
    >
      toast
    </Button>
  )
}

export function StandAloneToast() {
  const toast = createStandaloneToast({
    theme: {
      ...base,
      colors: {
        green: {
          500: "#67BF3C",
        },
      },
    },
  })
  const toast2 = createStandaloneToast()
  return (
    <>
      <Text fontSize="lg" fontWeight="bold">
        This Text matches Theme font
      </Text>
      <ButtonGroup>
        <Button
          onClick={() => {
            toast({
              title: "Standalone Toast",
              description: "Uses provided theme",
              status: "success",
              duration: 3000,
              isClosable: true,
              onCloseComplete: () => {
                console.log("hello")
              },
            })
          }}
        >
          Standalone Toast With Custom Theme
        </Button>
        <Button
          onClick={() => {
            toast2({
              title: "Standalone Toast",
              description: "Uses default theme",
              status: "success",
              duration: 3000,
              isClosable: true,
              onCloseComplete: () => {
                console.log("hello")
              },
            })
          }}
        >
          Standalone Toast With Default Theme
        </Button>
      </ButtonGroup>
    </>
  )
}
