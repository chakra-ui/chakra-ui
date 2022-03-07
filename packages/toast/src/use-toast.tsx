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
  ColorMode,
  ColorModeContext,
  ThemeProvider,
  useChakra,
} from "@chakra-ui/system"
import defaultTheme from "@chakra-ui/theme"
import { isFunction, noop } from "@chakra-ui/utils"
import { useLatestRef } from "@chakra-ui/hooks"
import * as React from "react"
import { toast } from "./toast.class"
import {
  getToastPlacement,
  ToastPositionWithLogical,
  WithoutLogicalPosition,
} from "./toast.placement"
import type { RenderProps, ToastId, ToastOptions } from "./toast.types"

export interface UseToastOptions {
  /**
   * The placement of the toast
   *
   * @default "bottom"
   */
  position?: ToastPositionWithLogical
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
  title?: React.ReactNode
  /**
   * The description of the toast
   */
  description?: React.ReactNode
  /**
   * If `true`, toast will show a close button
   */
  isClosable?: boolean
  /**
   * The alert component `variant` to use
   */
  variant?: "subtle" | "solid" | "left-accent" | "top-accent" | (string & {})
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
  /**
   * Optional style overrides for the container wrapping the toast component.
   */
  containerStyle?: React.CSSProperties
}

type UseToastOptionsNormalized = WithoutLogicalPosition<UseToastOptions>

export type IToast = UseToastOptions

const Toast: React.FC<any> = (props) => {
  const { status, variant, id, title, isClosable, onClose, description } = props

  const alertTitleId =
    typeof id !== "undefined" ? `toast-${id}-title` : undefined

  return (
    <Alert
      status={status}
      variant={variant}
      id={id}
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      paddingEnd={8}
      textAlign="start"
      width="auto"
      aria-labelledby={alertTitleId}
    >
      <AlertIcon />
      <chakra.div flex="1" maxWidth="100%">
        {title && <AlertTitle id={alertTitleId}>{title}</AlertTitle>}
        {description && (
          <AlertDescription display="block">{description}</AlertDescription>
        )}
      </chakra.div>
      {isClosable && (
        <CloseButton
          size="sm"
          onClick={onClose}
          position="absolute"
          insetEnd={1}
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
  ReturnType<typeof useChakra> & {
    setColorMode: (value: ColorMode) => void
    defaultOptions: UseToastOptions
  }
>

export const defaultStandaloneParam: Required<CreateStandAloneToastParam> = {
  theme: defaultTheme,
  colorMode: "light",
  toggleColorMode: noop,
  setColorMode: noop,
  defaultOptions: defaults,
}
/**
 * Create a toast from outside of React Components
 */
export function createStandaloneToast({
  theme = defaultStandaloneParam.theme,
  colorMode = defaultStandaloneParam.colorMode,
  toggleColorMode = defaultStandaloneParam.toggleColorMode,
  setColorMode = defaultStandaloneParam.setColorMode,
  defaultOptions = defaultStandaloneParam.defaultOptions,
}: CreateStandAloneToastParam = defaultStandaloneParam) {
  const renderWithProviders = (
    props: React.PropsWithChildren<RenderProps>,
    options: UseToastOptionsNormalized,
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

  const toastImpl = (options?: UseToastOptions) => {
    const opts = { ...defaultOptions, ...options } as UseToastOptionsNormalized
    opts.position = getToastPlacement(opts.position, theme.direction)

    const Message: React.FC<RenderProps> = (props) =>
      renderWithProviders(props, opts)

    return toast.notify(Message, opts)
  }

  toastImpl.close = toast.close
  toastImpl.closeAll = toast.closeAll

  // toasts can only be updated if they have a valid id
  toastImpl.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
    if (!id) return

    const opts = { ...defaultOptions, ...options } as UseToastOptionsNormalized
    opts.position = getToastPlacement(opts.position, theme.direction)

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
export function useToast(options?: UseToastOptions) {
  const { theme, setColorMode, toggleColorMode, colorMode } = useChakra()

  const toastOptions = useLatestRef(options)

  return React.useMemo(() => {
    return createStandaloneToast({
      theme,
      colorMode,
      setColorMode,
      toggleColorMode,
      defaultOptions: { ...defaults, ...toastOptions.current },
    })
  }, [theme, setColorMode, toggleColorMode, colorMode, toastOptions])
}

export default useToast
