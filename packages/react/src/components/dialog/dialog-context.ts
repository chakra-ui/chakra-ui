import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { DialogMotionPreset, DialogOptions } from "./dialog-types"
import { UseDialogReturn } from "./use-dialog"

export const [DialogStylesProvider, useDialogStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `DialogStylesContext`,
  errorMessage: `useDialogStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Dialog.Root />" `,
})

interface DialogContext extends DialogOptions, UseDialogReturn {
  motionPreset?: DialogMotionPreset
}

export const [DialogContextProvider, useDialogContext] =
  createContext<DialogContext>({
    strict: true,
    name: "DialogContext",
    errorMessage:
      "useDialogContext: `context` is undefined. Seems you forgot to wrap dialog components in `<Dialog.Root />`",
  })
