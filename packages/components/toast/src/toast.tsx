import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from "@chakra-ui/alert"
import { chakra } from "@chakra-ui/system"
import { CloseButton } from "@chakra-ui/close-button"
import { runIfFn } from "@chakra-ui/shared-utils"
import type { UseToastOptions } from "./use-toast"
import type { RenderProps, ToastId } from "./toast.types"
import { getToastPlacement } from "./toast.placement"
import { toastStore } from "./toast.store"

export interface ToastProps
  extends UseToastOptions,
    Omit<AlertProps, keyof UseToastOptions> {
  onClose?: () => void
}

/**
 * The `Toast` component is used to give feedback to users after an action has taken place.
 *
 * @see Docs https://chakra-ui.com/docs/components/toast
 */
export const Toast: React.FC<ToastProps> = (props) => {
  const {
    status,
    variant = "solid",
    id,
    title,
    isClosable,
    onClose,
    description,
    icon,
  } = props

  const ids = id
    ? {
        root: `toast-${id}`,
        title: `toast-${id}-title`,
        description: `toast-${id}-description`,
      }
    : undefined

  return (
    <Alert
      addRole={false}
      status={status}
      variant={variant}
      id={ids?.root}
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      paddingEnd={8}
      textAlign="start"
      width="auto"
    >
      <AlertIcon>{icon}</AlertIcon>
      <chakra.div flex="1" maxWidth="100%">
        {title && <AlertTitle id={ids?.title}>{title}</AlertTitle>}
        {description && (
          <AlertDescription id={ids?.description} display="block">
            {description}
          </AlertDescription>
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

export function createRenderToast(
  options: UseToastOptions & {
    toastComponent?: React.FC<ToastProps>
  } = {},
) {
  const { render, toastComponent: ToastComponent = Toast } = options
  const renderToast: React.FC<RenderProps> = (props) => {
    if (typeof render === "function") {
      return render({ ...props, ...options }) as JSX.Element
    }
    return <ToastComponent {...props} {...options} />
  }
  return renderToast
}

type UseToastPromiseOption = Omit<UseToastOptions, "status">

export function createToastFn(
  dir: "ltr" | "rtl",
  defaultOptions?: UseToastOptions,
) {
  const normalizeToastOptions = (options?: UseToastOptions) => ({
    ...defaultOptions,
    ...options,
    position: getToastPlacement(
      options?.position ?? defaultOptions?.position,
      dir,
    ),
  })

  const toast = (options?: UseToastOptions) => {
    const normalizedToastOptions = normalizeToastOptions(options)
    const Message = createRenderToast(normalizedToastOptions)
    return toastStore.notify(Message, normalizedToastOptions)
  }

  toast.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
    toastStore.update(id, normalizeToastOptions(options))
  }

  toast.promise = <Result extends any, Err extends Error = Error>(
    promise: Promise<Result>,
    options: {
      success: MaybeFunction<UseToastPromiseOption, [Result]>
      error: MaybeFunction<UseToastPromiseOption, [Err]>
      loading: UseToastPromiseOption
    },
  ) => {
    const id = toast({
      ...options.loading,
      status: "loading",
      duration: null,
    })

    promise
      .then((data) =>
        toast.update(id, {
          status: "success",
          duration: 5_000,
          ...runIfFn(options.success, data),
        }),
      )
      .catch((error) =>
        toast.update(id, {
          status: "error",
          duration: 5_000,
          ...runIfFn(options.error, error),
        }),
      )
  }

  toast.closeAll = toastStore.closeAll
  toast.close = toastStore.close
  toast.isActive = toastStore.isActive

  return toast
}

export type CreateToastFnReturn = ReturnType<typeof createToastFn>

type MaybeFunction<T, Args extends unknown[] = []> = T | ((...args: Args) => T)
