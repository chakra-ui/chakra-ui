import { Fragment } from "react"
import { HiX } from "react-icons/hi"
import {
  Absolute,
  Button,
  HStack,
  IconButton,
  Portal,
  Stack,
  Toast,
  Toaster,
  createToaster,
} from "../src"

const toaster = createToaster({
  placement: "bottom",
})

export default {
  title: "Components / Toast",
  decorators: [
    (Story: any) => (
      <Fragment>
        <Story />
        <Portal>
          <Toaster toaster={toaster}>
            {(toast) => (
              <Toast.Root>
                <Stack gap="1" flex="1" maxWidth="100%">
                  <Toast.Title>{toast.title}</Toast.Title>
                  <Toast.Description>{toast.description}</Toast.Description>
                </Stack>
                <Absolute top="1" insetEnd="1">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    colorPalette="whiteAlpha"
                    asChild
                  >
                    <Toast.CloseTrigger>
                      <HiX />
                    </Toast.CloseTrigger>
                  </IconButton>
                </Absolute>
              </Toast.Root>
            )}
          </Toaster>
        </Portal>
      </Fragment>
    ),
  ],
}

export const Basic = () => {
  const id = "login-error-toast"
  return (
    <HStack>
      <Button
        variant="solid"
        onClick={() => {
          if (toaster.isVisible(id)) return
          toaster.create({
            id,
            title: "Error Connecting...",
            description: "You do not have permissions to perform this action.",
            type: "loading",
          })
        }}
      >
        Show Toast
      </Button>
      <Button onClick={() => toaster.remove()}>Close all</Button>
      <Button
        onClick={() =>
          toaster.update(id, {
            title: "Hooray 🥳🥳🥳!!!",
            description: "You now have permissions to perform this action.",
            type: "success",
            duration: 3000,
          })
        }
      >
        Update
      </Button>
      <Button onClick={() => toaster.remove(id)}>Close One</Button>
    </HStack>
  )
}

export const SuccessToast = () => {
  return (
    <Button
      onClick={() =>
        toaster.create({
          title: "Account created.",
          description: "We've created your account for you.",
          type: "success",
          duration: 3000,
        })
      }
    >
      Show Success Toast
    </Button>
  )
}
