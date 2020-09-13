import * as React from "react"
import type { AlertStatus } from "@chakra-ui/alert"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert"
import { CloseButton } from "@chakra-ui/close-button"
import {
  chakra,
  ColorModeContext,
  ThemeProvider,
  useChakra,
  ColorMode,
} from "@chakra-ui/system"
import { isFunction, noop } from "@chakra-ui/utils"
import defaultTheme from "@chakra-ui/theme"
import { toast } from "./toast.class"
import { RenderProps, ToastId, ToastOptions } from "./toast.types"
import { PropsWithChildren } from "react"

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
   * Any component passed will receive 2 props: `id` and `onClose`.
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
  status?: AlertStatus
  /**
   * The `id` of the toast.
   *
   * Mostly used when you need to prevent duplicate.
   * By default, we generate a unique `id` for each toast
   */
  id?: ToastId
  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?: () => void
}

export type IToast = UseToastOptions

const Toast: React.FC<any> = (props) => {
  const { status, variant, id, title, isClosable, onClose, description } = props

  return (
    <Alert
      status={status}
      variant={variant}
      id={id}
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      margin={2}
      paddingRight={8}
      textAlign="left"
      width="auto"
    >
      <AlertIcon />
      <chakra.div flex="1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && (
          <AlertDescription display="block">{description}</AlertDescription>
        )}
      </chakra.div>
      {isClosable && (
        <CloseButton
          size="sm"
          onClick={onClose}
          position="absolute"
          right={1}
          top={1}
        />
      )}
    </Alert>
  )
}

const defaults = {
  duration: 5000,
  position: "bottom",
  variant: "solid",
} as const

export type CreateStandAloneToastParam = Partial<
  {
    setColorMode: (value: ColorMode) => void
  } & ReturnType<typeof useChakra>
>

export const defaultStandaloneParam: Required<CreateStandAloneToastParam> = {
  theme: defaultTheme,
  colorMode: "light",
  toggleColorMode: noop,
  setColorMode: noop,
}
/**
 * Create a toast from outside of React Components
 */
export function createStandaloneToast({
  theme = defaultStandaloneParam.theme,
  colorMode = defaultStandaloneParam.colorMode,
  toggleColorMode = defaultStandaloneParam.toggleColorMode,
  setColorMode = defaultStandaloneParam.setColorMode,
}: CreateStandAloneToastParam = defaultStandaloneParam) {
  const renderWithProviders = (
    props: PropsWithChildren<RenderProps>,
    options: UseToastOptions,
  ) => (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider
        value={{ colorMode, setColorMode, toggleColorMode }}
      >
        {isFunction(options.render) ? (
          options.render(props)
        ) : (
          <Toast {...props} {...options} />
        )}
      </ColorModeContext.Provider>
    </ThemeProvider>
  )

  const toastImpl = function (options: UseToastOptions) {
    const opts = { ...defaults, ...options }

    const Message: React.FC<RenderProps> = (props) =>
      renderWithProviders(props, opts)

    return toast.notify(Message, opts)
  }

  toastImpl.close = toast.close
  toastImpl.closeAll = toast.closeAll

  // toasts can only be updated if they have a valid id
  toastImpl.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
    const { render, ...rest } = options

    if (!id) return

    const opts = { ...defaults, ...rest }

    toast.update(id, {
      ...opts,
      message: (props) => renderWithProviders(props, opts),
    })
  }

  toastImpl.isActive = toast.isActive

  return toastImpl
}

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export function useToast() {
  const { theme, colorMode, toggleColorMode } = useChakra()
  return React.useMemo(
    () => createStandaloneToast({ theme, colorMode, toggleColorMode }),
    [theme, colorMode, toggleColorMode],
  )
}

export default useToast
