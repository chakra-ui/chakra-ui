import { createThemeContext, useTheme, chakra } from "@chakra-ui/system"
import { isString, isFunction } from "@chakra-ui/utils"
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

const Toast = ({ id, title, onClose, children }: any) => (
  <chakra.div
    bg="tomato"
    color="white"
    padding="20px"
    margin="10px"
    id={id}
    data-toast-alert=""
  >
    {isString(title) ? <div data-toaster-alert-text="">{title}</div> : title}
    {children}
    {onClose && <Close onClick={onClose} />}
  </chakra.div>
)

export function useToast() {
  const theme = useTheme()
  const [ThemeProvider] = createThemeContext(theme)

  function notify(options: NotifyOptions) {
    const { render, title, description } = options

    toast.notify(
      props => (
        <ThemeProvider>
          {isFunction(render) ? (
            render(props)
          ) : (
            <Toast title={title} {...props}>
              {description}
            </Toast>
          )}
        </ThemeProvider>
      ),
      options,
    )
  }

  return notify
}
