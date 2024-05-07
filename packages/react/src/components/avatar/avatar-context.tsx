import { createContext } from "../../create-context"
import type { SystemStyleObject } from "../../styled-system"
import type { UseAvatarReturn } from "./use-avatar"

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
