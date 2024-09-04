"use client"

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

interface ToastMeta {
  closable?: boolean
  action?: VoidFunction
  actionLabel?: string
}

const defaultMeta: ToastMeta = {
  closable: true,
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        insetInline={{ mdDown: "1rem" }}
        width={{ md: "356px" }}
      >
        {(toast) => {
          const meta = Object.assign(defaultMeta, toast.meta ?? {})
          return (
            <Toast.Root>
              {toast.type === "loading" ? (
                <Spinner size="sm" color="blue.solid" />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
              {meta?.action && (
                <Toast.ActionTrigger onClick={meta.action}>
                  {meta.actionLabel}
                </Toast.ActionTrigger>
              )}
              {meta?.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}
