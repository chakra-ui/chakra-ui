import { createContext } from "@chakra-ui/utils/context"
import { CircularProgressContext } from "./circular-progress-types"

export const [CircularProgressContextProvider, useCircularProgressContext] =
  createContext<CircularProgressContext>({
    name: `CircularProgressContext`,
    errorMessage: `useCircularProgressContext: 'context' is undefined`,
  })
