import { chakra } from "../../styled-system"
import { Alert } from "../alert"
import { CloseButton } from "../close-button"
import type { RenderProps } from "./toast.types"
import type { UseToastOptions } from "./use-toast"

export interface ToastProps
  extends UseToastOptions,
    Omit<Alert.RootProps, keyof UseToastOptions> {
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
    colorScheme,
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
    <Alert.Root
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
      colorScheme={colorScheme}
    >
      <Alert.Icon>{icon}</Alert.Icon>
      <chakra.div flex="1" maxWidth="100%">
        {title && <Alert.Title id={ids?.title}>{title}</Alert.Title>}
        {description && (
          <Alert.Description id={ids?.description} display="block">
            {description}
          </Alert.Description>
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
    </Alert.Root>
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

export type UseToastPromiseOption = Omit<UseToastOptions, "status">

export type MaybeFunction<T, Args extends unknown[] = []> =
  | T
  | ((...args: Args) => T)
