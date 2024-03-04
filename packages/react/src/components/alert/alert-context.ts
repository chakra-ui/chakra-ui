import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { CheckIcon, InfoIcon, WarningIcon } from "./alert-icons"

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

const statusIconMap = {
  info: InfoIcon,
  warning: WarningIcon,
  success: CheckIcon,
  error: WarningIcon,
}

export function getStatusIcon(status: AlertStatus) {
  return statusIconMap[status]
}

export type AlertStatus = keyof typeof statusIconMap

export interface AlertContext {
  status: AlertStatus
}
