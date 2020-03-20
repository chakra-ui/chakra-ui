import { createThemeContext, useTheme } from "@chakra-ui/system"
import { isString } from "@chakra-ui/utils"
import * as React from "react"
import { toast } from "./Toast.class"
import { RenderProps, ToastOptions } from "./Toast.types"

export interface NotifyOptions {
  position?: ToastOptions["position"]
  duration?: ToastOptions["duration"]
  render?(props: RenderProps): React.ReactNode
  title?: string
  description?: string
  isClosable?: string
}

/**
 * The fallback toast component
 * @param props
 */
const Close = (props: any) => (
  <button data-toast-close-btn="" type="button" aria-label="Close" {...props}>
    <span aria-hidden="true">×</span>
  </button>
)

const Alert = ({ id, title, onClose, children }: any) => (
  <div id={id} data-toast-alert="">
    {isString(title) ? <div data-toaster-alert-text="">{title}</div> : title}
    {children}
    {onClose && <Close onClick={onClose} />}
  </div>
)

export function useToast() {
  const theme = useTheme()
  const [ThemeProvider] = createThemeContext(theme)

  function notify(options: NotifyOptions) {
    const {
      position = "bottom",
      duration = 5000,
      render,
      title,
      description,
    } = options

    const optionsWithDefault = { ...options, duration, position }

    if (render) {
      return toast.notify(
        props => <ThemeProvider>{render(props)}</ThemeProvider>,
        optionsWithDefault,
      )
    }

    toast.notify(
      ({ onClose, id }) => (
        <ThemeProvider>
          <Alert id={id} title={title} onClose={onClose}>
            {description}
          </Alert>
        </ThemeProvider>
      ),
      optionsWithDefault,
    )
  }

  return notify
}
