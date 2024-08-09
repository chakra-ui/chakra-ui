import {
  Absolute,
  Toaster as ChakraToaster,
  Portal,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"
import { CloseButton } from "./close-button"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster}>
        {(toast) => (
          <Toast.Root>
            <Stack gap="1" flex="1" maxWidth="100%">
              <Toast.Title>{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
            </Stack>
            <Absolute top="1" insetEnd="1">
              <Toast.CloseTrigger asChild>
                <CloseButton />
              </Toast.CloseTrigger>
            </Absolute>
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
