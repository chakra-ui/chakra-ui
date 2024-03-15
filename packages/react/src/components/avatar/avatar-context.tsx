import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"
import { UseAvatarReturn } from "./use-avatar"

export const [AvatarStylesProvider, useAvatarStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `AvatarStylesContext`,
  hookName: `useAvatarStyles`,
  providerName: "<Avatar/>",
})

export const [AvatarContextProvider, useAvatarContext] =
  createContext<UseAvatarReturn>({
    name: `AvatarStylesContext`,
    hookName: `useAvatarStyles`,
    providerName: "<Avatar/>",
  })
