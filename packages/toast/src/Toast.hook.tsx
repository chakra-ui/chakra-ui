import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ALERT_STATUSES,
} from "@chakra-ui/alert"
import { CloseButton } from "@chakra-ui/close-button"
import { chakra, ThemeProvider, useTheme } from "@chakra-ui/system"
import { isFunction, merge } from "@chakra-ui/utils"
import * as React from "react"
import { toast } from "./Toast.class"
import { RenderProps, ToastOptions, ToastId } from "./Toast.types"

export interface UseToastOptions {
  /**
   * The placement of the toast
   *
   * @default "bottom"
   */
  position?: ToastOptions["position"]
  /**
   * The delay before the toast hides (in milliseconds)
   * If set to `null`, toast will never dismiss.
   *
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
  isClosable?: boolean
  /**
   * The alert component `variant` to use
   */
  variant?: string
  /**
   * The status of the toast.
   */
  status?: keyof typeof ALERT_STATUSES
  id?: ToastId
}

export type IToast = UseToastOptions

const Toast = (props: any) => {
  const { status, variant, id, title, isClosable, onClose, description } = props

  return (
    <Alert
      width="100%"
      status={status}
      variant={variant}
      id={id}
      textAlign="left"
      boxShadow="lg"
      borderRadius="md"
      alignItems="start"
      margin={2}
      paddingRight={8}
    >
      <AlertIcon />
      <chakra.div flex="1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && (
          <AlertDescription marginTop="px" lineHeight="short">
            {description}
          </AlertDescription>
        )}
      </chakra.div>
      {isClosable && (
        <CloseButton
          size="sm"
          onClick={onClose}
          position="absolute"
          right="4px"
          top="4px"
        />
      )}
    </Alert>
  )
}

const defaults = {
  description: 5000,
  position: "bottom",
  variant: "solid",
}

export function useToast() {
  const theme = useTheme()

  function toastImpl(options: UseToastOptions) {
    const { render } = options

    const Message = (props: RenderProps) => (
      <ThemeProvider theme={theme}>
        {isFunction(render) ? (
          render(props)
        ) : (
          <Toast {...{ ...props, ...opts }} />
        )}
      </ThemeProvider>
    )

    const opts = merge(defaults, options)

    return toast.notify(Message, opts)
  }

  toastImpl.close = toast.close
  toastImpl.closeAll = toast.closeAll

  // toasts can only be updated if they have a valid id
  toastImpl.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
    const { render, ...rest } = options

    if (!id) return

    const opts = merge(defaults, rest)

    toast.update(id, {
      ...opts,
      message: props => (
        <ThemeProvider theme={theme}>
          {isFunction(render) ? (
            render(props)
          ) : (
            <Toast {...{ ...props, ...opts }} />
          )}
        </ThemeProvider>
      ),
    })
  }
  toastImpl.isActive = toast.isActive

  return toastImpl
}
