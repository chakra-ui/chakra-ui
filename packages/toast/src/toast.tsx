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
import { isFunction } from "@chakra-ui/utils"
import type { UseToastOptions } from "./use-toast"
import type { RenderProps } from "./toast.types"

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
