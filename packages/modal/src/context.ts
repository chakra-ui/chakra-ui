import { createContext } from "@chakra-ui/utils"
import { UseModalReturn } from "./use-modal"

const [ModalContextProvider, useModalContext] = createContext<UseModalReturn>({
  strict: true,
  name: "ModalContext",
  errorMessage:
    "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`",
})

export { ModalContextProvider, useModalContext }
