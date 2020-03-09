import * as React from "react"
import { createThemeContext, useTheme } from "@chakra-ui/system"
import toast from "toasted-notes"
import { MessageOptionalOptions } from "toasted-notes/lib/ToastManager"

export interface NotifyOptions {
  position: MessageOptionalOptions["position"]
  duration: MessageOptionalOptions["duration"]
  render?(props: { onClose(): void; id: string }): JSX.Element
  title?: string
  description?: string
  isClosable?: string
}

export function useToast() {
  const theme = useTheme()
  const [ThemeProvider] = createThemeContext(theme)

  function notify({
    position = "bottom",
    duration = 5000,
    render,
    title,
    description,
    isClosable,
  }: NotifyOptions) {
    const options = {
      position,
      duration,
    }

    if (render) {
      return toast.notify(
        ({ onClose, id }) => (
          <ThemeProvider>{render({ onClose, id })}</ThemeProvider>
        ),
        options,
      )
    }

    toast.notify(
      ({ onClose, id }) => (
        <ThemeProvider>
          <div>Welcome to div</div>
        </ThemeProvider>
      ),
      options,
    )
  }

  return notify
}

export default useToast
