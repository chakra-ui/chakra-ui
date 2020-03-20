import { ThemeProvider, useTheme, chakra } from "@chakra-ui/system"
import { isString, isFunction } from "@chakra-ui/utils"
import * as React from "react"
import { toast } from "./Toast.class"
import { RenderProps, ToastOptions } from "./Toast.types"

export interface NotifyOptions {
  /**
   * The placement of the toast
   */
  position?: ToastOptions["position"]
  /**
   * The delay before a toast hides (in milliseconds)
   * @default 5000 ( = 5000ms )
   */
  duration?: ToastOptions["duration"]
  /**
   * Render a component toast component.
   * Any component passed will receive 2 props:
   * `id` and `onClose`.
   *
   * @param props props passed to custom component
   */
  render?(props: RenderProps): React.ReactNode
  /**
   * The title of the toast
   */
  title?: string
  /**
   * The description of the toast
   */
  description?: string
  /**
   * If `true`, toast will show a close button
   */
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

const Toast = ({ id, title, onClose, children }: any) => {
  return (
    <chakra.div
      bg="white"
      color="gray.800"
      padding="1rem"
      margin="8px"
      id={id}
      data-toast-alert=""
      boxShadow="rgba(52, 58, 64, 0.15) 0px 1px 10px 0px,
    rgba(52, 58, 64, 0.1) 0px 6px 12px 0px,
    rgba(52, 58, 64, 0.12) 0px 6px 15px -2px"
    >
      {isString(title) ? <div data-toaster-alert-text="">{title}</div> : title}
      {children}
      {onClose && <Close onClick={onClose} />}
    </chakra.div>
  )
}

export function useToast() {
  const theme = useTheme()

  function notify(options: NotifyOptions) {
    const { render, title, description } = options

    toast.notify(
      props => (
        <ThemeProvider theme={theme}>
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
