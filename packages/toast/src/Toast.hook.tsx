import * as React from "react"
import { createThemeContext, useTheme } from "@chakra-ui/system"
import { toast } from "./Toast.class"
import { ToastOptions, Callback } from "./Toast.types"

export interface NotifyOptions {
  position: ToastOptions["position"]
  duration: ToastOptions["duration"]
  render?(props: Callback): React.ReactNode
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
        props => <ThemeProvider>{render(props)}</ThemeProvider>,
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
