import { SystemStyleObject } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/react-context"
import { CheckIcon, InfoIcon, WarningIcon } from "./icons"
import { Spinner } from "@chakra-ui/spinner"

export const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
  hookName: "useAlertContext",
  providerName: "<Alert />",
})

export const [AlertStylesProvider, useAlertStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `AlertStylesContext`,
  hookName: `useAlertStyles`,
  providerName: "<Alert />",
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
