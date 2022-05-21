import * as React from "react"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from "@chakra-ui/alert"
import { chakra } from "@chakra-ui/system"
import { CloseButton } from "@chakra-ui/close-button"
import { isFunction, MaybeFunction, runIfFn } from "@chakra-ui/utils"
import type { UseToastOptions } from "./use-toast"
import type { RenderProps, ToastId } from "./toast.types"
import { getToastPlacement } from "./toast.placement"
import { toastStore } from "./toast.store"

export interface ToastProps
  extends UseToastOptions,
    Omit<AlertProps, keyof UseToastOptions> {
  onClose?: () => void
}

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

  const alertTitleId =
    typeof id !== "undefined" ? `toast-${id}-title` : undefined

  return (
    <Alert
      status={status}
      variant={variant}
      id={String(id)}
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      paddingEnd={8}
      textAlign="start"
      width="auto"
      aria-labelledby={alertTitleId}
    >
      <AlertIcon>{icon}</AlertIcon>
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

export function createRenderToast(
  options: UseToastOptions & {
    toastComponent?: React.FC<ToastProps>
  } = {},
) {
  const { render, toastComponent: ToastComponent = Toast } = options
  const renderToast: React.FC<RenderProps> = (props) => {
    if (isFunction(render)) {
      return render(props) as JSX.Element
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
