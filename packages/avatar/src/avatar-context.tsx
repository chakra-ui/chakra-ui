import { createContext } from "@chakra-ui/react-context"
import { SystemStyleObject } from "@chakra-ui/system"

export const [AvatarStylesProvider, useAvatarStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `AvatarStylesContext`,
  hookName: `useAvatarStyles`,
  providerName: "<Avatar/>",
})
