import { createContext } from "@chakra-ui/utils"
import { ImageLoadStatus } from "../image/use-image"
import { SystemStyleObject } from "../styled-system"

export const [AvatarStylesProvider, useAvatarStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `AvatarStylesContext`,
  hookName: `useAvatarStyles`,
  providerName: "<Avatar/>",
})

export interface AvatarContext {
  src: string | undefined
  srcSet: string | undefined
  name: string | undefined
  borderRadius: any
  loading: "eager" | "lazy" | undefined
  referrerPolicy: any | undefined
  crossOrigin: any | undefined
  status: ImageLoadStatus
  isLoaded: boolean
  showFallback: boolean
  getInitials(name: string): string
  icon: React.ReactElement
  iconLabel?: string
}

export const [AvatarProvider, useAvatarContext] = createContext<AvatarContext>({
  name: `AvatarStylesContext`,
  hookName: `useAvatarStyles`,
  providerName: "<Avatar/>",
})
