import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"

export const [AvatarStylesProvider, useAvatarStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `AvatarStylesContext`,
  hookName: `useAvatarStyles`,
  providerName: "<Avatar/>",
})
