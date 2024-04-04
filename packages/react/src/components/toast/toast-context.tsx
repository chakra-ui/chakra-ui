"use client"

import { SystemStyleObject } from "../.."
import { createContext } from "../../create-context"
import { ToastOptions } from "./toast.types"
import { UseToastReturn, useToast } from "./use-toast"

const [ToastStateContextProvider, useToastContext] =
  createContext<UseToastReturn>({
    name: "ToastContext",
  })

export const [ToastStylesProvider, useToastStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  providerName: "Toast.Root",
})

interface Props {
  value: ToastOptions
  children: React.ReactNode
}

const ToastContextProvider = (props: Props) => {
  const { value, children } = props
  const state = useToast(value)
  return (
    <ToastStateContextProvider value={state}>
      {children}
    </ToastStateContextProvider>
  )
}

export { ToastContextProvider, useToastContext }
