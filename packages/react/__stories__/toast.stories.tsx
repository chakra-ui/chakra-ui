import { Fragment } from "react"
import { HiX } from "react-icons/hi"
import {
  Box,
  Button,
  HStack,
  IconButton,
  Portal,
  Stack,
  Toast,
  createToaster,
} from "../src"

const [Toaster, toast] = createToaster({
  placement: "bottom",
  render(toast) {
    return (
      <Toast.Transition>
        <Toast.Root data-status={toast.status} status={toast.status}>
          <Stack gap="1" flex="1" maxWidth="100%">
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
          </Stack>
          <Box pos="absolute" top="1" insetEnd="1">
            <Toast.CloseTrigger asChild>
              <IconButton
                aria-label="Close"
                size="sm"
                variant="ghost"
                colorPalette="whiteAlpha"
              >
                <HiX />
              </IconButton>
            </Toast.CloseTrigger>
          </Box>
        </Toast.Root>
      </Toast.Transition>
    )
  },
})

export default {
  title: "Components / Toast",
  decorators: [
    (Story: any) => (
      <Fragment>
        <Story />
        <Portal>
          <Toaster />
        </Portal>
      </Fragment>
    ),
  ],
}

export function ToastExample() {
  const id = "login-error-toast"
  return (
    <HStack>
      <Button
        variant="solid"
        onClick={() => {
          if (toast.isActive(id)) return
          toast({
            id,
            title: "Error Connecting...",
            description: "You do not have permissions to perform this action.",
            status: "error",
            duration: null,
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
    </HStack>
  )
}

export const SuccessToast = () => {
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
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
