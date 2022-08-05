import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"
import { CheckIcon, InfoIcon, WarningIcon } from "./icons"
import { Spinner } from "@chakra-ui/spinner"

export const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
  errorMessage:
    "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`",
})

export const [AlertStylesProvider, useAlertStyles] = createContext<
  Dict<SystemStyleObject>
>({
  name: `AlertStylesContext`,
  errorMessage: `useAlertStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Alert />" `,
})

const STATUSES = {
  info: { icon: InfoIcon, colorScheme: "blue" },
  warning: { icon: WarningIcon, colorScheme: "orange" },
  success: { icon: CheckIcon, colorScheme: "green" },
  error: { icon: WarningIcon, colorScheme: "red" },
  loading: { icon: Spinner, colorScheme: "blue" },
}

export function getStatusColorScheme(status: AlertStatus) {
  return STATUSES[status].colorScheme
}

export function getStatusIcon(status: AlertStatus) {
  return STATUSES[status].icon
}

export type AlertStatus = keyof typeof STATUSES

export interface AlertContext {
  status: AlertStatus
}
