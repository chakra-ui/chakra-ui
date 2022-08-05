import { createContext } from "@chakra-ui/react-utils"
import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"

export const [AvatarStylesProvider, useAvatarStyles] = createContext<
  Dict<SystemStyleObject>
>({
  name: `AvatarStylesContext`,
  errorMessage: `useAvatarStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Avatar />" `,
})
